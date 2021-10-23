import { NextFunction, Request, Response } from "express";
import model from "../users/user.model";
import { user } from "../users/user.interface";
import jwt from "./jwt";

const jsonwebtokens = new jwt();

export class Logged {
  async verify(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    const token: string = req.headers["x-token"];

    if (!token) {
      console.log("Client is not Logged!");
      // @ts-ignore
      req.isLogged = {
        logged: false,
        userId: "",
      };
      next();
    } else {
      const decoded = await jsonwebtokens.compare(token);
      console.log(decoded);

      // @ts-ignore
      const User = await model.findById(decoded.id).exec();
      console.log(User);
      // @ts-ignore
      req.isLogged = {
        logged: true,
        // @ts-ignore
        user: {
          name: User?.name,
          // @ts-ignore
          id: decoded.id,
        },
      };
      // @ts-ignore
      console.log(req.isLogged);

      next();
    }
  }

  return404(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    if (!req.isLogged.logged) {
      res
        .status(400)
        .send(
          "Este contenido es solo para personas que tengan una sesión abierta"
        );
    } else {
      next();
    }
  }
}
