import {Router} from 'express'
import {cUser} from "./users/user.controller";
import {PostController} from "./post/Controller";


let router = Router();
const User = new cUser();
const PostRouter = new PostController();

router.post("/api/login", User.login);
router.post("/api/register", User.register);

router.get("/api/post",PostRouter.getAll)

export  default  router;