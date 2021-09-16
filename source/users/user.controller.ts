import model from './user.model';
import {user} from './user.interface';
import { Request, Response } from 'express';
import {Encrypt} from "../Utils/password.encrypt"
import jwt from '../Utils/jwt'

const JWT = new jwt("24h")

export class cUser {

    async login(req:Request,res:Response){
        let info:loginData = req.body;
        let hasUser = await model.findOne({email : info.email}).exec();
        if(!hasUser){
            return res.status(403).json({error:"El correo no es correcto"});
        }
        let isPasswordGood = await Encrypt.compare(info.password,hasUser.password);
        if(!isPasswordGood){
            return res.status(403).json({
                error:"Contraseña incorrecta"
            })
        }
        console.log("Login Success");
        
        let token = await JWT.encode(hasUser._id)
        return res.status(200).json({
            token
        })
    }

    async register(req:Request,res:Response){
        let user:user = req.body;
        if(!user.email || !user.password || !user.name){
            return res.status(400).json({
                error: "Todos los campos son obligatorios."
            })
        }
        user.password = await Encrypt.encrypt(user.password);

        const hasUser = await model.findOne({email: user.email}).exec();
        console.log(hasUser)
        if(hasUser){
            return res.status(400).json({
                error: "Ya hay un usuario con este email"
            })
        }

        const newUser = new model(user);
        await newUser.save();
        const token = await JWT.encode(newUser._id.toString());
        return res.status(200).json({
            token
        })

    }
}

interface loginData{
    email:String,
    password:String
}