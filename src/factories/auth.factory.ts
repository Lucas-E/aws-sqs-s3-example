import { AuthController } from "../controller/auth.controller";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { AuthService } from "../service/auth.service";

export function authFactory(){
    const authService = new AuthService(AppDataSource.getRepository(User));
    const authController = new AuthController(authService);
    return authController
}

export const authController = authFactory();