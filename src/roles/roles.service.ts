import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { STATUS_CODES } from 'http';

@Injectable()
export class RolesService {
  constructor(private jwtService: JwtService,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>) { }

  async create(createRoleDto: CreateRoleDto) {
    const exist = await this.findOneByName(createRoleDto.type);
    if (exist) throw new HttpException("El tipo de role esta definido", HttpStatus.BAD_REQUEST);
    try {
      const roleEntity = await this.roleRepository.create(createRoleDto);
      await this.roleRepository.insert(roleEntity);
    } catch (error) {
      throw new HttpException("A ocurrido un error al crear el rol", HttpStatus.CONFLICT);
    }
  }

  async findAll() {
    try {
      const roles = await this.roleRepository.find();
      return roles;
    } catch (error) {
      return new HttpException("Error inesperado", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {

      const role = await this.roleRepository.findOne({ where: { id } });
      if (!role) throw new HttpException("El rol no existe.", HttpStatus.BAD_REQUEST);
      return role
  }

  private async findOneByName(type: string) {
    try {
      return this.roleRepository.findOne({ where: { type } });
    } catch (error) {
      return null;
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {

    const existingRole = await this.findOne(id);
    if (existingRole as undefined) throw new HttpException("El role no esta definido", HttpStatus.BAD_REQUEST);
    try {
      this.roleRepository.merge(existingRole as Role, updateRoleDto);
      await this.roleRepository.save(existingRole as Role);
      return HttpStatus.OK
    } catch (error) {
      throw new HttpException("Error inesperado", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    const role = await this.findOne(id);
    await this.roleRepository.remove(role as Role);
    return HttpStatus.NO_CONTENT;
  }
}
