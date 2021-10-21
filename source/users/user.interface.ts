import { Document } from "mongoose";
import { post } from "../post/post.interface";

export interface user extends Document{
    _id:string
    name:String,
    email:String,
    password: string,
    post: Array<post>,
    follows: Array<{
        name: String, 
        id: String
    }>,
    photo: String
}