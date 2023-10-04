import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpCode } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { NeedLoginGuard } from 'src/Guard/needLogin.guard';
import { Request } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(NeedLoginGuard)
  @HttpCode(201)
  create(@Body() createProductDto: CreateProductDto,@Req() request:Request) {
    const user = request["user"];        
    return this.productService.create(createProductDto,user);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('/id/:id')
  findOneById(@Param('id') id: string) {
    return this.productService.findOneById(+id);
  }
  @Get('/:slugB/product/:slug')
  findOneBySlug(@Param('slugB') slugB: string,@Param('slug') slug: string) {
    return this.productService.findOneBySlug(slugB,slug);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
