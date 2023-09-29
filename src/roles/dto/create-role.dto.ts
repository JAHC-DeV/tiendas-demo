import { ApiConsumes, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateRoleDto {
    @ApiProperty()
    @IsNotEmpty({ message: "El role tiene que poseer un tipo" })
    type: string;
    @ApiProperty()
    isAdmin: boolean
    @ApiProperty()
    publish: boolean;
    @ApiProperty()
    createUser: boolean;
    @ApiProperty()
    assignUser: boolean
}
