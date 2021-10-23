import { Request, Response } from "express";
import { post } from "./post.interface";
import model from "./post.model";
export class PostController {
  public async getAll(req: Request, res: Response) {
    const posts = await model.find({});

    return res.status(200).send({
      posts,
    });
  }

  public async createPost(req: Request, res: Response) {
    // @ts-ignore
    let post: post = req.body;

    // @ts-ignore
    post.author = req.isLogged.user;

    if (!post.title || !post.description) {
      return res.status(400).json({
        error: "Todos los campos son requeridos",
      });
    }

    const postOnDb = new model(post);
    await postOnDb.save();
    res.status(200).json(post);
  }
}
