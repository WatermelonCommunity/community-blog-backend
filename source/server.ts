import {Env} from './Utils/env'
import express, { Application } from 'express'
import morgan from 'morgan'
import { Logger } from './Utils/logger';
import Router from "./router"
import { Connect } from './dataBase';
import cors from 'cors'

export class servidor {
    private app:Application;
    constructor(){
        Env.load()
        this.app = express();
        this.settings()
        this.router();
        Connect.connect()
        this.__init__()
    }
    private settings(){
        this.app.use(cors({
            origin: process.env.CORS_DOMAIN,
            credentials: false
        }))
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(morgan("dev"))
        this.app.use(express.json())
    }

    private router(){
        this.app.use("/", Router)
    }
    __init__(){
        this.app.listen(this.app.get("port"),()=>Logger.info(`Servidor en puerto ${this.app.get("port")}`))
    }

}
