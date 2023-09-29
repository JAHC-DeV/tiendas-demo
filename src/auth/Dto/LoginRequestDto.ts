import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginRequestDto {
    @ApiProperty()
    @IsEmail({}, { message: "El email debe ser valido" })
    email: string;
    @ApiProperty()
    @IsNotEmpty({ message: "La contraseña no puede estar vacia" })
    password: string;
}