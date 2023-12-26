export interface IAuthService{
    authenticate(email:any, password:any):Promise<void|string>
}