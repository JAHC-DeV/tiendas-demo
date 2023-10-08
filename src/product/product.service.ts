import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { BusinessService } from 'src/business/business.service';
import { InjectRepository } from '@nestjs/typeorm';
import { generateSlug } from 'src/global/utils';
import { UpdateImgDto } from 'src/business/dto/updateImg-business.dto';
import { FileUploadService } from 'src/global/supabase/fileUpload.service';
import { Business } from 'src/business/entities/business.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private userService: UsersService,
    private businessService: BusinessService,
    private fileUpload: FileUploadService) { }

  async create(createProductDto: CreateProductDto, userData: any) {
    const business = await this.businessService.validateIsActive(userData._business);
    const newProd = await this.productRepository.create(createProductDto);
    newProd.owner = business;
    newProd.slug = generateSlug(createProductDto.name);
    await this.productRepository.save(newProd);
    return;
  }

  async findAll(amount: number) {
    return await this.productRepository.find({ take: amount });
  }

  async findOneById(id: number) {
    const prod = await this.productRepository.findOne({ where: { id }, relations:['owner'] });
    if (!prod) throw new HttpException("Producto no Encontrado.", HttpStatus.NOT_FOUND);
    return prod;
  }

  async findOneBySlug(slugB: string, slug: string) {
    const business = await this.businessService.findOneBySlug(slugB);
    if (business.products.length! < 1) throw new HttpException("Producto no Encontrado.", HttpStatus.NOT_FOUND);
    const prod = business.products.find(p => p.slug = slug);
    if (!prod) throw new HttpException("Producto no Encontrado.", HttpStatus.NOT_FOUND);
    return prod;
  }

  async findByKeyword(keyword: string, amount: number) {
    console.log(keyword)
    const query = this.productRepository
      .createQueryBuilder('products')
      .where('products.name LIKE :keyword OR products.description LIKE :keyword OR products.category LIKE :keyword', {
        keyword: `%${keyword}%`,
      })
      .limit(amount)
      .getMany();

    return query;
  }

  async update(id: number, updateProductDto: UpdateProductDto, userData: any) {
    const tempProduct = await this.validateCanEdit(userData._business,id);
    this.productRepository.merge(tempProduct as Product, updateProductDto);
    if (updateProductDto.name) tempProduct.slug = generateSlug(updateProductDto.name);
    await this.productRepository.save(tempProduct);
    return tempProduct;
  }
  async updateImagen(id: number, updateProductDto: UpdateImgDto, userData: any) {
    const tempProduct = await this.validateCanEdit(userData._business,id);
    tempProduct.photo_URL = await this.fileUpload.upload(updateProductDto.image);
    await this.productRepository.save(tempProduct);
    return tempProduct;
  }
  async remove(id: number, userData: any) {
    const tempProduct = await this.validateCanEdit(userData._business,id);
    console.log(tempProduct)
    await this.productRepository.remove(tempProduct);
    return HttpStatus.ACCEPTED;
  }

  async validateCanEdit(business: number, idProd: number): Promise<Product> {
    const tempProduct = await this.findOneById(idProd);
    if (tempProduct.owner.id! != business) throw new HttpException("No Autorizado", HttpStatus.UNAUTHORIZED);
    if(!tempProduct.owner.isActive) throw new HttpException("Negocio no Activo.", HttpStatus.BAD_REQUEST);
    return tempProduct;
  }

}
