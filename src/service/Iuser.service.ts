import { User } from "../entity/User";

export interface IUserService{
    createUser(userEmail:any, userPassword:any):Promise<void|User>
    getLogoUploadPreSignedURL(user:any):Promise<void|string>
    getUserById(userId:any):Promise<void|User>
    treatImage(userId):Promise<void|any>
}