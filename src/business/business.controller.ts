import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { NeedLoginGuard } from 'src/Guard/needLogin.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OnlyAdmin } from 'src/Guard/onlyAdmin.guard';
import { Request } from 'express'
import { UpdateImgDto } from './dto/updateImg-business.dto';

@Controller('business')
@ApiTags('Business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) { }

  @UseGuards(NeedLoginGuard)
  @Post()
  @ApiBearerAuth()
  async create(@Body() createBusinessDto: CreateBusinessDto, @Req() request: Request) {
    const user = request["user"];
    return await this.businessService.create(createBusinessDto, user);
  }

  @Get()
  async findAll() {
    return await this.businessService.findAll();
  }

  @Get('/id/:id')
  async findOneById(@Param('id') id: string) {
    return await this.businessService.findOneById(+id);
  }

  @Get("slug/:slug")
  async findOneBySlug(@Param("slug") slug: string) {
    return await this.businessService.findOneBySlug(slug);
  }
  @UseGuards(OnlyAdmin)
  @ApiBearerAuth()
  @Get("/allInactive")
  async AllInactive() {
    return await this.businessService.findAllInactive();
  }
  @UseGuards(OnlyAdmin)
  @ApiBearerAuth()
  @Get("/allActive")
  async AllActive() {
    return await this.businessService.findAllActives();
  }


  @UseGuards(NeedLoginGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusinessDto: UpdateBusinessDto, @Req() request: Request) {
    const user = request["user"];
    return this.businessService.update(+id, updateBusinessDto, user);
  }

  @UseGuards(NeedLoginGuard)
  @ApiBearerAuth()
  @Patch('updateCover/:id')
  updateCover(@Param('id') id: string, @Body() updateBusinessDto: UpdateImgDto, @Req() request: Request) {
    const user = request["user"];
    return this.businessService.updateCover(+id, updateBusinessDto, user);
  }

  @UseGuards(NeedLoginGuard)
  @ApiBearerAuth()
  @Patch('updateLogo/:id')
  updateLogo(@Param('id') id: string, @Body() updateBusinessDto: UpdateImgDto, @Req() request: Request) {
    const user = request["user"];
    return this.businessService.updateLogo(+id, updateBusinessDto, user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(OnlyAdmin)
  async remove(@Param('id') id: string) {
    return await this.businessService.remove(+id);
  }
}
