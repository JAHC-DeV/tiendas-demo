import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Express } from 'express';
export class RegisterDto {
    @ApiProperty()
    @IsNotEmpty({message:"El nombre no puede estar vacío"})
    name:string;
    @ApiProperty()
    @IsNotEmpty({message:"El apodo no puede estar vacío"})
    nickname:string;
    @ApiProperty()
    @IsEmail({},{message: "El email no es válido corríjalo"})
    email:string;
    @ApiProperty()
    @IsNotEmpty({message:"La contraseña no puede estar vacía"})
    password: string;    
    @ApiProperty({ type: 'string', format: 'binary' })
    @IsNotEmpty()
    profile_photo: string;
    constructor(data?:{name,nickname,email,password}) {
        if (data) {
            this.name = data.name;
            this.email =data.email;
            this.nickname = data.nickname;
            this.password = data.password;
        }
    }
}