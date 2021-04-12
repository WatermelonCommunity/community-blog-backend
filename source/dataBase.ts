import {connect} from 'mongoose';
import { Logger } from './Utils/logger';

class connection {
    private url:any = process.env.MONGO

    connect(){
        try{
            connect(this.url,{
                useNewUrlParser:true,
                useUnifiedTopology:true
            })
        }catch(err){
            Logger.error("Un error ha ocurrido al conectarse a la DB")
            Logger.error(err)
            process.exit(1)
        }
        Logger.sucess("BD Conectada correctamente")
    }
}
export let Connect = new connection()