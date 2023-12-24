import { AuthService, authService } from "../service/auth.service";

export class AuthController{
    private authService:AuthService;
    constructor(){
        this.authService = authService
    }
    public async authenticate(req, res, next){
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

export const authController = new AuthController;