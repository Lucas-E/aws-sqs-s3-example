import { Router } from "express";
import { authController } from "../factories/auth.factory";

export function auth(){
    const router = Router();

    router.post('/authenticate', (req, res, next) => authController.authenticate(req, res))

    return router;
}