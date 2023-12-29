import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { userController } from "../factories/user.factory";

export function userRoutes(){
    const router = Router();

    router.post('/', (req, res, next) => userController.createUser(req, res, next))
    router.get('/signedUrl', authMiddleware, (req, res, next) => userController.uploadLogo(req, res, next))
    router.post('/treatImage', authMiddleware, (req, res, next) => userController.treatImage(req, res, next))

    return router
}