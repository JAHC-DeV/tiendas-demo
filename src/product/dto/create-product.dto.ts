import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProductDto
{ 
    @ApiProperty()
    @IsNotEmpty()
    public name:string;
    @ApiProperty()
    public description: string;
    @ApiProperty()
    public internal_description: string;    
    @ApiProperty()
    @IsNotEmpty()
    public category: string;    
    @ApiProperty()
    public photo:string;
    @ApiProperty()
    public amount: number;
    @ApiProperty()
    @IsNotEmpty()
    public final_price: number;
    @ApiProperty()
    public price_cost: number;
    @ApiProperty()
    public pricePeerQuantity: number;
    @ApiProperty()
    public isBox: boolean;
    @ApiProperty()
    public lote_Box: number;
    @ApiProperty()
    public amount_store: number;
}
