import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateBusinessDto } from './create-business.dto';
import { Exclude } from 'class-transformer';

export class UpdateBusinessDto extends PartialType(CreateBusinessDto) {
}
