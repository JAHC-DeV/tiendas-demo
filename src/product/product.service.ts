import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { BusinessService } from 'src/business/business.service';
import { InjectRepository } from '@nestjs/typeorm';
import { generateSlug } from 'src/global/utils';

@Injectable()
export class ProductService {
  /**
   *
   */
  constructor(
              @InjectRepository(Product)
              private productRepository:Repository<Product>,
              private userService:UsersService,
              private businessService:BusinessService) {}

  async create(createProductDto: CreateProductDto,userData:any) {
    const business = await this.businessService.findByOwner(userData._id);
    if(!business.isActive) throw new HttpException("Negocio no Activo.",HttpStatus.BAD_REQUEST);
    const newProd = await this.productRepository.create(createProductDto);
    newProd.owner = business;
    newProd.slug = generateSlug(createProductDto.name);
    await this.productRepository.save(newProd);
    return;    
  }

  findAll() {
    return this.productRepository.find();
  }

 async findOneById(id: number) {
    const prod = await this.productRepository.findOne({where:{id}});
    if(!prod) throw new HttpException("Producto no Encontrado.",HttpStatus.NOT_FOUND);
    return prod;    
  }

  async findOneBySlug(slugB:string,slug: string) {
    const business = await this.businessService.findOneBySlug(slugB);    
    if(business.products.length! < 1) throw new HttpException("Producto no Encontrado.",HttpStatus.NOT_FOUND);
    const prod = business.products.find(p=>p.slug = slug);    
    if(!prod) throw new HttpException("Producto no Encontrado.",HttpStatus.NOT_FOUND);
    return prod;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
