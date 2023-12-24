import { Router } from "express";
import { authController } from "../controller/auth.controller";

export function auth(){
    const router = Router();

    router.post('/authenticate', (req, res, next) => authController.authenticate(req, res, next))

    return router;
}