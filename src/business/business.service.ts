import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { Repository } from 'typeorm';
import { Business } from './entities/business.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { FileUploadService } from 'src/global/supabase/fileUpload.service';
import { UpdateImgDto} from './dto/updateImg-business.dto';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class BusinessService {

  constructor(
    @InjectRepository(Business)
    private businessRepository: Repository<Business>,
    private usersService: UsersService,
    private fileUpload: FileUploadService) { }
  
  async create(createBusinessDto: CreateBusinessDto, userData: any) {
    const user = await this.usersService.findOneById(userData._id);
    const tempBusiness = this.businessRepository.create(createBusinessDto);
    if (createBusinessDto.logo)
      tempBusiness.logo_URL = await this.fileUpload.upload(createBusinessDto.logo);
    if (createBusinessDto.cover)
      tempBusiness.cover_URL = await this.fileUpload.upload(createBusinessDto.cover);
    tempBusiness.slug = createBusinessDto.name.replace(" ", "-").toLowerCase();
    tempBusiness.owner = user;
    await this.businessRepository.insert(tempBusiness);    
    return HttpStatus.CREATED;
  }
  async findAll() {
    return await this.businessRepository.find();
  }
  async findAllActives() {
    return await this.businessRepository.find({where:{isActive:true}})
  }
  async findAllInactive() {
    return await this.businessRepository.find({where:{isActive:false}})
  }
  async findOneById(id: number, relation?: boolean) {
    if (relation == true)
      return await this.businessRepository.findOne({ where: { id }, relations: ['owner'] });
    else
      return await this.businessRepository.findOne({ where: { id } });
  }
  async findOneBySlug(slug: string) {
    const tempBusiness = await this.businessRepository.findOne({ where: { slug, isActive:true},relations:["products"] });
    if(!tempBusiness) throw new HttpException("Negocio no Encontrado.",HttpStatus.NOT_FOUND);
    return tempBusiness;
  }
  
  async findByOwner(idOwn:number){
        const business = await this.businessRepository.createQueryBuilder("business")
                                   .where("business.ownerId = :id",{id:idOwn})
                                   .getOne();                                   
        if(!business) throw new HttpException("Negocio no encontrado.",HttpStatus.NOT_FOUND);                             
        return business;                                   
  }

  async update(id: number, updateBusinessDto: UpdateBusinessDto, userData: any) {   
    const tempBusiness = await this.findOneById(id,true);    
    if (tempBusiness.owner?.id != userData._id) throw new HttpException("Acción no Permitida.", HttpStatus.UNAUTHORIZED);
    this.businessRepository.merge(tempBusiness as Business, updateBusinessDto)
    await this.businessRepository.save(tempBusiness);
    return HttpStatus.OK;
  }  
  async updateCover(id:number,updateImgDto:UpdateImgDto,userData:any){
    const tempBusiness = await this.findOneById(id,true);    
    if (tempBusiness.owner?.id != userData._id) throw new HttpException("Acción no Permitida.", HttpStatus.UNAUTHORIZED);
    tempBusiness.cover_URL = await this.fileUpload.upload(updateImgDto.image);
    await this.businessRepository.save(tempBusiness);
    return HttpStatus.OK;
  }
  async updateLogo(id:number,updateImgDto:UpdateImgDto,userData:any){
    const tempBusiness = await this.findOneById(id,true);    
    if (tempBusiness.owner?.id != userData._id) throw new HttpException("Acción no Permitida.", HttpStatus.UNAUTHORIZED);
    tempBusiness.logo_URL = await this.fileUpload.upload(updateImgDto.image);   
    await this.businessRepository.save(tempBusiness);
    return HttpStatus.OK;
  }
  async remove(id: number) {
    const business = await this.findOneById(id);
    await this.businessRepository.remove(business as Business);
  }
}
