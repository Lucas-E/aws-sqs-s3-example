import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import bcrypt from "bcrypt";
import {
  getSignedUrl
} from "@aws-sdk/s3-request-presigner";
import 'dotenv/config'
import { sqsInstance } from "../services/aws-sqs-service";
import { s3Instance } from "../services/aws-s3-service";
import { SQSClient } from "@aws-sdk/client-sqs";
import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { IUserService } from "./Iuser.service";

export class UserService implements IUserService {
  private userRepository: Repository<User>;
  private s3Instance;
  private sqsInstance:SQSClient;

  constructor(userRepository:Repository<User>, s3Instance:any, sqsInstance:any) {
    this.userRepository = userRepository;
    this.s3Instance = s3Instance;
    this.sqsInstance = sqsInstance;
  }
  public async createUser(userEmail: any, password: string) {
    try {
      const foundUser = await this.userRepository.findOne({
        where: {
          email: userEmail,
        },
      });
      if (foundUser) {
        throw new Error("User already exists");
      }
      const newUser = new User();
      newUser.email = userEmail;
      const hashedPassword = await bcrypt.hash(password, 10);
      newUser.password = hashedPassword;
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getLogoUploadPreSignedURL(user) {
    try {
      const key = `${user.email}newfile.jpeg`
      const command = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: key,
        ContentType: "image/jpeg"
      });
      const url = await getSignedUrl(this.s3Instance, command, { expiresIn: 60 });
      const encodedKey = encodeURIComponent(key)
      user.logo = `${process.env.AWS_BUCKET_URL}/${encodedKey}`;
      this.userRepository.save(user);
      return url;
    } catch (error) {
      throw new Error(error);
    }
  }
  public async getUserById(userId) {
    try {
      const foundUser = await this.userRepository.findOne({
        where:{
          id: userId
        }
      })
      if(!foundUser){
        throw new Error("user not found")
      }
      return foundUser;
    } catch (error) {
      throw new Error(error.message)
    }
  }
  public async treatImage(userId){
    try {
      const foundUser = await this.userRepository.findOne({
        where:{
          id:userId
        }
      })
      if(!foundUser || !foundUser.logo){
        throw new Error("User not found by Id");
      }
      const input = {
        QueueUrl: process.env.IMAGE_TREATMENT_QUEUE,
        MessageBody:foundUser.logo as string,
        MessageGroupId: "image-treatment"
      }
      const messageCommand = new SendMessageCommand(input)
      const response = await this.sqsInstance.send(messageCommand);
      return response;
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
