import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './Entities/user.entity';
import { FindOperator, Repository } from 'typeorm';
import { RegisterDto } from './Dto/RegisterDto';
import { Role } from '../roles/entities/role.entity';
import { LoginRequestDto } from 'src/auth/Dto/LoginRequestDto';
import * as bcrypt from 'bcrypt';
import { AssingRoleDto } from './Dto/AssingRoleDto';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/global/email/email.service';
import { FileUploadService } from 'src/global/supabase/fileUpload.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        private jwtService: JwtService,
        private emailService: EmailService,
        private fileUpload: FileUploadService
    ) { }
    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async createUser(registerData: RegisterDto) {
        const count = await this.countUsers()
        const verifyEmail = await this.userRepository.findOne({ where: { email: registerData.email } })
        if (verifyEmail) throw new HttpException("EMAIL_EXIST", 409);
        const verifyNick = await this.userRepository.findOne({ where: { nickname: registerData.nickname } })
        if (verifyNick) throw new HttpException("NICKNAME_EXIST", 409);
        const newUser = await this.userRepository.create(registerData);
        const roles = await this.roleRepository.createQueryBuilder('role')
            .where('role.id IN (:...ids)', { ids: [1, 2] }) // Filtrar por IDs 1 o 2
            .getMany();
        if (count < 1) { newUser.isEnable = true; newUser.role = roles[0]; }
        else newUser.role = roles[1];
        const passEncript = await bcrypt.hash(newUser.password, 10);
        console.log("Nuevo Usuario Creado");
        newUser.password = passEncript;
        const link_photo = await this.fileUpload.upload(registerData.profile_photo);
        newUser.photo_profile = link_photo;
        await this.userRepository.insert(newUser);
        //Metodo para enviar y validar Email
        const payload = { id: newUser.id, name: newUser.nickname }
        const token = this.jwtService.sign(payload);
        this.emailService.sendEmail(newUser.email, "Bienvenido", token);
        ////////////////////////////////////////////////////////////////      
        return HttpStatus.CREATED;
    }

    async countUsers(): Promise<number> {
        try {
            const countUser = await this.userRepository.count();
            return countUser;

        } catch (error) {
            return 0;
        }
    }
    async findOneByEmail(userInfo: LoginRequestDto): Promise<User> {
        try {
            const user = await this.userRepository.findOne({ relations: ['role'], where: { email: userInfo.email } });
            return user;
        } catch (error) {
            throw new HttpException("Usuario no encontrado.", HttpStatus.BAD_REQUEST);
        }
    }
    async findOneById(id: number): Promise<User> {
        try {
            const user = await this.userRepository.findOne({ where: { id }, relations: ['role'] });
            return user;
        } catch (error) {
            throw new HttpException("Usuario no encontrado.", HttpStatus.BAD_REQUEST);
        }

    }

    async assingRole(assingRole: AssingRoleDto) {
        const user = await this.findOneById(assingRole.userId);
        //console.log(user);
        const role = await this.roleRepository.findOne({ where: { id: assingRole.roleId } });
        if (user == undefined) throw new HttpException("Usuario no encontrado.", HttpStatus.BAD_REQUEST);
        if (role == undefined) throw new HttpException("Rol no encontrado.", HttpStatus.BAD_REQUEST);
        user.role = role;
        await this.userRepository.save(user);
        return HttpStatus.OK;
    }

    async removeUser(id: number) {
        const user = await this.findOneById(id);
        this.userRepository.remove(user);
        return HttpStatus.NO_CONTENT;
    }

    async activateAccount(token: string) {

    }


}
