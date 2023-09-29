import { User } from "src/users/Entities/user.entity";

export class LoginResponseDto{
    userInfo: User;
    hasBusiness:boolean;
    //Info Negocio
    token:string;
    /**
     *
     */
    constructor(data?:{userInfo:User,hasBusiness:boolean,token:string}) {
        if (data) {
            this.userInfo = data.userInfo;
            this.hasBusiness = data.hasBusiness;
            this.token =data.token
        }        
    }
}