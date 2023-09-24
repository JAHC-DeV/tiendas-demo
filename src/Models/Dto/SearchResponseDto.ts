import { ApiProperty } from "@nestjs/swagger";
import { ProductModel } from "../ProductModel"

export class SearchResponseDto {
    @ApiProperty()
    public products: Array<ProductModel>;
    @ApiProperty()
    public maxPages: number;
    @ApiProperty()
    public currentPage: number;
    @ApiProperty()
    public category: string;
    
    constructor(data?: {
        products: Array<ProductModel>,
        maxPages: number,
        currentPage: number,
        category: string,
    }) {
        if (data) {
            this.products = data.products;
            this.maxPages = data.maxPages;
            this.currentPage = data.currentPage;
            this.category = data.category;
        }
    }
}