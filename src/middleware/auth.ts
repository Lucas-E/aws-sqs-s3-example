import { NextFunction, Request, Response } from "express";
import { userService } from "../service/user.service";
import jwt from "jsonwebtoken";
import "dotenv/config";

interface RequestWithLocals extends Request {
  locals: any;
}

export function authMiddleware(
  req: RequestWithLocals,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
      throw new Error("No token provided");
    }
    
    const token = req.headers.authorization.split("Bearer ")[1];

    jwt.verify(token, process.env.JWT_SECRET as string, async (err, decoded) => {
      try {
        if (err) {
          throw new Error(err.message);
        }
        const decodedUser = decoded as any
        const user = await userService.getUserById(decodedUser.userId);
        if (!user) {
          throw new Error("No user found for this token");
        }
        req["locals"] = {
            user: user
        };
        next();
      } catch (error) {
        console.log(error)
        return res.status(403).json({
          error: "Something went wrong",
        });
      }
    });
  } catch (error) {
    console.log(error)
    return res.status(403).json({
      error: "Something went wrong",
    });
  }
}
