import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NeweggApiService } from './newegg-api.service';
import { SearchRequestDto } from 'src/Models/Dto/SearchRequestDto';
import { SearchResponseDto } from 'src/Models/Dto/SearchResponseDto';

@Controller('newegg-api')
export class NeweggApiController {
  constructor(private readonly service: NeweggApiService) { }

  @Get("recomProds")
  async GetRecomdProds() {
    const products = await this.service.getRecomProducts();
    return products;
  }
  @Get("recomProdsWithConfig/:keywords")
  async GetRecomdProdsWithConfig(@Param("keywords") keywords: string) {
    const products = await this.service.getRecomProductsWithConfig(keywords);
    return products;
  }

  @Get("getProduct/:sku")
  async getProdInfoController(@Param("sku") sku: string) {
    const resData = await this.service.getProductInfo(sku);
    if (resData == undefined || resData == null) {
      return { msg: "Producto no encontrado" }
    } else {
      return resData;
    }
  }

  @Post("search")
  async searchProductsController(@Body() req: SearchRequestDto): Promise<SearchResponseDto> {
    const result = await this.service.searchProductsController(req);
    return result;
  }

}
