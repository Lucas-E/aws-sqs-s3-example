import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import "dotenv/config";

export class AuthService {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }
  public async authenticate(email, password) {
    try {
      const foundUser = await this.userRepository.findOne({
        where: {
          email: email,
        },
      });

      if (!foundUser) {
        throw new Error("User not found");
      }

      const comparation = await bcrypt.compare(
        password,
        foundUser.password as string
      );
      if (comparation) {
        const token = await jwt.sign(
          { userId: foundUser.id, userEmail: foundUser.email },
          process.env.JWT_SECRET,
          { expiresIn: 60 * 60 * 24 }
        );
        return token
      }
      throw new Error("Password don't match");
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const authService = new AuthService;
