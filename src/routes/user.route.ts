import { Router } from "express";
import { userController } from "../controller/user.controller";
import { authMiddleware } from "../middleware/auth";

export function userRoutes(){
    const router = Router();

    router.post('/', (req, res, next) => userController.createUser(req, res, next))
    router.get('/signedUrl', authMiddleware, (req, res, next) => userController.uploadLogo(req, res, next))
    router.post('/treatImage', authMiddleware, (req, res, next) => userController.treatImage(req, res, next))

    return router
}