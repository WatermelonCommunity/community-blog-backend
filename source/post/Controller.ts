import { Request, Response } from "express";
import { post } from "./post.interface";
import model from './post.model'
export class PostController{
    public async getAll(req:Request, res: Response){
        const posts = await model.find({})

        return res.status(200).send({
            posts
        })
    }
}