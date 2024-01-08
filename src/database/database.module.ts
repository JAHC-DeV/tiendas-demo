import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // Cambia a tu tipo de base de datos
      host: 'localhost', // Cambia a la dirección de tu base de datos
      port: 3306, // Cambia al puerto de tu base de datos
      username: 'root',
      password: '**',
      database: 'tiendas',
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule { }
