import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateImgDto {
    @ApiProperty()
    @IsNotEmpty()
    image:string
}