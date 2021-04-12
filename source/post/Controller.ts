import { Request, Response } from "express";
import { post } from "./post.interface";
import model from './post.model'
class Controller{
    create(req:Request,res:Response){
        let info:post = req.body;
        
    }
}