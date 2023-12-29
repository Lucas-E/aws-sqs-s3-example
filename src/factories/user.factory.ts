import { UserController } from "../controller/user.controller";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { UserService } from "../service/user.service";
import { s3Instance } from "../services/aws-s3-service";
import { sqsInstance } from "../services/aws-sqs-service";

export function userFactory(){
    const userService = new UserService(AppDataSource.getRepository(User), s3Instance, sqsInstance);
    const userController = new UserController(userService);
    return userController;
}

export const userController = userFactory();