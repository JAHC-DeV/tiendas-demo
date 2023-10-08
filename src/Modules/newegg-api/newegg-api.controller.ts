import { Body, Controller, Get,  Param, Post, Res } from '@nestjs/common';
import { NeweggApiService } from './newegg-api.service';
import { SearchRequestDto } from 'src/Models/Dto/SearchRequestDto';
import { SearchResponseDto } from 'src/Models/Dto/SearchResponseDto';
import { ProductModel } from 'src/Models/ProductModel';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('newegg-api')
@ApiTags("External")
export class NeweggApiController {
  constructor(private readonly service: NeweggApiService) { }

  @Get("recomProds")
  async GetRecomdProds(@Res() res: Response) {
    const result = await this.service.getRecomProducts<Array<ProductModel>>();
    if (result.Error) {
      return res.status(500).json({ msg: await result.GetMsgError() });
    }
    return res.status(200).json(result.Content);
  }
  @Get("recomProdsWithConfig/:keywords")
  async GetRecomdProdsWithConfig(@Param("keywords") keywords: string,@Res() res: Response) {
    const result = await this.service.getRecomProductsWithConfig<Array<ProductModel>>(keywords);
    if (result.Error) {
      return res.status(500).json({ msg: await result.GetMsgError() });
    }
    return res.status(200).json(result.Content);    
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
