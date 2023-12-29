import { Request, Response } from "express"
import { UserService } from "../service/user.service"
import { NextFunction } from "express"
import { IUserController } from "./Iuser.controller"

export class UserController implements IUserController{
    private userService:UserService
    constructor(userService:UserService){
        this.userService = userService
    }
    public async createUser(req:Request, res:Response, next:NextFunction){
        try {
            const {email, password} = req.body
            if(!email || !password){
                throw new Error("Password or Email not provided")
            }
            const user = await this.userService.createUser(email, password);
            if(user){
                return res.sendStatus(201)
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                error:error.message
            });
        }
    }

    public async updateUser(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }

    public async deleteUser(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }

    public async getUserById(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }

    public async getUserByEmail(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }

    public async uploadLogo(req, res, next){
        try {
            const url = await this.userService.getLogoUploadPreSignedURL(req.locals.user)
            return res.status(200).json({
                signedUrl: url
            })
        } catch (error) {
            return res.sendStatus(400)
        }
    }

    public async treatImage(req, res, next){
        try {
            const user = req.locals.user
            const response = await this.userService.treatImage(user.id)
            return res.status(200).json({
                message: "Sua imagem está em processamento",
                data: response
            })
        } catch (error) {
            console.log(error)
            return res.sendStatus(400)
        }
    }
}