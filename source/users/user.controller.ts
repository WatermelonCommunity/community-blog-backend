import model from './user.model';
import {user} from './user.interface';
import { Request, Response } from 'express';
import {Encrypt} from "../Utils/password.encrypt"
import jwt from '../Utils/jwt'

const JWT = new jwt("24h")

export class cUser {

    async login(req:Request,res:Response){
        let info:loginData = req.body;
        console.log(info);
        
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
    async whoiam(req:Request, res:Response){
        //@ts-ignore
        const me = await model.findById(req.isLogged.user.id).exec();

        return res.status(200).json({
            name: me?.name,
            id: me?.id,
            photo: me?.photo,
            email: me?.email,
            
        })
    }

    async follow(req:Request, res:Response){
        // @ts-ignore
        const meID = req.isLogged;
        const me = await model.findById(meID.user.id).exec();

        const {toFollowID} = req.body;
        if(!toFollowID) return res.status(400).json({
            error: "Follow User Id does not specified!"
        });
        // @ts-ignore
        const user = await model.findById(me).exec().follows.push({
            id: toFollowID,
            // @ts-ignore
            name: await model.findById(toFollowID).exec().name
        });
        model.findByIdAndUpdate(me, user);

    }
}

interface loginData{
    email:String,
    password:String
}