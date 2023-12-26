import { Response } from "express";

export interface IUserController{
    createUser(req, res, next):Promise<void|Response>;

    updateUser(req, res, next):Promise<void|Response>;

    deleteUser(req, res, next):Promise<void|Response>;

    getUserById(req, res, next):Promise<void|Response>;

    getUserByEmail(req, res, next):Promise<void|Response>;

    uploadLogo(req, res, next):Promise<void|Response>;

    treatImage(req, res, next):Promise<void|Response>;
}