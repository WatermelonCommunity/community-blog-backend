import model from './user.model';
import {user} from './user.interface';
import { Request, Response } from 'express';
import {Encrypt} from "../Utils/password.encrypt"
import {jwt} from '../Utils/jwt'

class cUser {
    private JWT:jwt;
    constructor(){
        this.JWT = new jwt("24h");
    }
    async login(req:Request,res:Response){
        let info:loginData = req.body;
        let hasUser = await model.findOne({email : info.email});
        if(!hasUser){
            return res.status(403).json({error:"El correo no es correcto"});
        }
        let isPasswordGood = await Encrypt.compare(info.password,hasUser.password);
        if(!isPasswordGood){
            return res.status(403).json({
                error:"Contraseña incorrecta"
            })
        }
        let token = await this.JWT.encode(hasUser._id)
        return res.status(200).json({
            token
        })
    }

    async register(req:Request,res:Response){
        
    }
}

interface loginData{
    email:String,
    password:String
}