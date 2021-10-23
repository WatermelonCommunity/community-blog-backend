import { NextFunction, Response, Router } from "express";
import { cUser } from "./users/user.controller";
import { PostController } from "./post/Controller";
import { Logged } from "./Utils/isLogged";

let router = Router();
const User = new cUser();
const PostRouter = new PostController();
const token = new Logged();

router.post("/api/login", token.verify, User.login);
router.post("/api/register", token.verify, User.register);
router.get("/api/users/me", token.verify, token.return404, User.whoiam);

router.get("/api/post", PostRouter.getAll);
router.post("/api/post", token.verify, token.return404, PostRouter.createPost);

export default router;
