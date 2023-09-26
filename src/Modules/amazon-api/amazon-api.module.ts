import { Module } from '@nestjs/common';
import { AmazonApiService } from './amazon-api.service';
import { AmazonApiController } from './amazon-api.controller';

@Module({
  controllers: [AmazonApiController],
  providers: [AmazonApiService],
})
export class AmazonApiModule {}
