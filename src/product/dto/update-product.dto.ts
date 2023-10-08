import { ApiHideProperty, ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto
{
    @ApiProperty()
    public name:string;
    @ApiProperty()
    public description: string;
    @ApiProperty()
    public internal_description: string;    
    @ApiProperty()
    public category: string;    
    @ApiProperty()
    public amount: number;
    @ApiProperty()
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
