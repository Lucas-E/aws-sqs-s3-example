import { AuthService } from "../service/auth.service";
import { IAuthController } from "./Iauth.controller";

export class AuthController implements IAuthController{
    private authService:AuthService;
    constructor(authService:AuthService){
        this.authService = authService
    }
    public async authenticate(req, res){
        try {
            const {email, password} = req.body;
            if(!email || !password){
                throw new Error("Should provide email and password")
            }
            const token = await this.authService.authenticate(email, password);
            return res.status(200).json({
                token: token
            })
        } catch (error) {
            return res.sendStatus(400)
        }
    }
}