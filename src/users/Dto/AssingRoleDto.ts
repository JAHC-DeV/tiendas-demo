import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AssingRoleDto{
    @ApiProperty()
    @IsNotEmpty({message:"El id del Usuario no puede estar vacio."})
    public userId: number;
    @ApiProperty()
    @IsNotEmpty({message:"El id del Role no puede estar vacio."})
    public roleId: number
    constructor(data?:{userId:number,roleId:number}){
        if(data){
            this.userId = data.userId;
            this.roleId = this.roleId;
        }
    }
}