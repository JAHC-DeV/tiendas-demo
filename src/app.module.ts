import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NeweggApiModule } from './Modules/newegg-api/newegg-api.module';
import { AmazonApiModule } from './Modules/amazon-api/amazon-api.module';

@Module({
  imports: [NeweggApiModule, AmazonApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
