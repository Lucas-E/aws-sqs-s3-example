import { Response } from "express";

export interface IAuthController{
    authenticate(req, res): Promise<void|Response>;
}