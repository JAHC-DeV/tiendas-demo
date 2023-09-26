import { Module } from '@nestjs/common';
import { NeweggApiService } from './newegg-api.service';
import { NeweggApiController } from './newegg-api.controller';

@Module({
  controllers: [NeweggApiController],
  providers: [NeweggApiService],
})
export class NeweggApiModule {}
