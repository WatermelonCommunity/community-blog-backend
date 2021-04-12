import {sign,verify} from 'jsonwebtoken'
import { Logger } from './logger';

export class jwt{
    private secret:any;
    private expiration:string;
    constructor(expiration?:string){
        this.secret = process.env.JWT_SECRET;
        this.expiration = expiration ? expiration : "24h"
    }
    async encode(str:string){
        return await sign(str,this.secret,{expiresIn:this.expiration})
    }
    async compare(token:string){
        try{
            return await verify(token,this.secret)
        }catch(err){
            Logger.error("Un error en el controlador de JWT ha ocurrido")
            Logger.error(err)
            process.exit(1)
        }
    }
}