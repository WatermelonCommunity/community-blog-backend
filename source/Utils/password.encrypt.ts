import {compareSync, genSaltSync, hashSync} from 'bcrypt'

class PWD_ENCRYPT{
    private salt:number;
    constructor(){
        this.salt = 10;
    }
    async encrypt(password:String){
        let salts = await genSaltSync(this.salt)
        return await hashSync(password,salts)
    }
    async compare(password:String,hash: string){
        return await compareSync(password,hash)
    }
}
export const Encrypt = new PWD_ENCRYPT();