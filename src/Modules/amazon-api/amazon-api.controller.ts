import { Body, Controller, Post, Res } from '@nestjs/common';
import { AmazonApiService } from './amazon-api.service';
import { SearchRequestDto } from 'src/Models/Dto/SearchRequestDto';
import { Response } from 'express';

@Controller('amazon-api')
export class AmazonApiController {
  constructor(private readonly service: AmazonApiService) { }

  @Post("searchProduct")
  async searchProducts(@Body() req: SearchRequestDto, @Res() res: Response) {
    try {
      console.log("LLego esto")
      const products = await this.service.searchProducts(req);
      return res.status(200).json(products.products);
    } catch (error) {
      return res.status(500).json({ msg: 'Ocurrió un error interno del servidor.' })
    }
  }
}
