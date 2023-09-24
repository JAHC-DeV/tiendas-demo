import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NeweggApiModule } from './newegg-api/newegg-api.module';

@Module({
  imports: [NeweggApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
