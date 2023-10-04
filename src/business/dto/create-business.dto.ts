import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateBusinessDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
    @ApiProperty()
    logo: string;
    @ApiProperty()
    cover: string;
    @ApiProperty()
    tag: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    @IsNotEmpty()
    category: string;
    @ApiProperty()
    @IsNotEmpty()
    province: string;
    @ApiProperty()
    @IsNotEmpty()
    town: string;
    @ApiProperty()
    @IsNotEmpty()
    street: string;
    @ApiProperty()
    @IsNotEmpty()
    delivery: boolean;
    @ApiProperty()
    @IsNotEmpty()
    deliveryLocation: string;
}
