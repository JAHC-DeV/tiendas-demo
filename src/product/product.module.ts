import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Business } from 'src/business/entities/business.entity';
import { User } from 'src/users/Entities/user.entity';
import { BusinessModule } from 'src/business/business.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([Product,Business,User]),UsersModule,BusinessModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
