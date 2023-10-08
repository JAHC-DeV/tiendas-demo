import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpCode } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NeedLoginGuard } from 'src/Guard/needLogin.guard';
import { Request } from 'express';
import { UpdateImgDto } from 'src/business/dto/updateImg-business.dto';
import { HasBusiness } from 'src/Guard/hasBisness.guard';

@Controller('product')
@ApiTags('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(HasBusiness)
  @HttpCode(201)
  create(@Body() createProductDto: CreateProductDto,@Req() request:Request) {
    const user = request["user"];        
    return this.productService.create(createProductDto,user);
  }

  @Get(":amount")
  findAll(@Param('amount') amount: string) {
    return this.productService.findAll(+amount);
  }

  @Get('/id/:id')
  findOneById(@Param('id') id: string) {
    return this.productService.findOneById(+id);
  }
  
  @Get('/search/:keywords?amount=:amount')
  async findByKeywords(@Param('keywords') key: string,@Param('amount') amount: string){    
    return await this.productService.findByKeyword(key,+amount);
  }

  @Get('/:slugB/product/:slug')
  findOneBySlug(@Param('slugB') slugB: string,@Param('slug') slug: string) {
    return this.productService.findOneBySlug(slugB,slug);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto,@Req() request:Request) {
    const user = request["user"];  
    return await this.productService.update(+id, updateProductDto,user);
  }
  @Patch('/img/:id')
  async updateImg(@Param('id') id: string, @Body() updateProductDto: UpdateImgDto,@Req() request:Request) {
    const user = request["user"];  
    return await this.productService.updateImagen(+id, updateProductDto,user);
  }
  @UseGuards(HasBusiness)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string,@Req() request:Request) {
    const user = request["user"];  
    return this.productService.remove(+id,user);
  }
}
