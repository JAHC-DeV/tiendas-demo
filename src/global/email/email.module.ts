import { Module } from '@nestjs/common';
import { EmailService } from './email.service'; // Importa EmailService

@Module({
  providers: [EmailService], // Agrega EmailService a la lista de providers
  exports: [EmailService], // Si también necesitas exportarlo para otros módulos
})
export class EmailModule {}
