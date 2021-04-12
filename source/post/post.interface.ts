import { Document } from "mongoose";

export interface post extends Document{
    _id:String,
    likes: Array<String>,
    author:{
        id:String,
        name:String
    },
    title: String,
    description:String,
    createdAt: String
}