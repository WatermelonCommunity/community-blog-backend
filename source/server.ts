import {Env} from './Utils/env'
import express, { Application } from 'express'
import morgan from 'morgan'
import { Logger } from './Utils/logger';
import { Connect } from './dataBase';
export class servidor {
    private app:Application;
    constructor(){
        Env.load()
        this.app = express();
        this.settings()
        this.__init__()
        Connect.connect()
    }
    private settings(){
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(morgan("dev"))
        this.app.use(express.json())
    }
    __init__(){
        this.app.listen(this.app.get("port"),()=>Logger.info(`Servidor en puerto ${this.app.get("port")}`))
    }

}