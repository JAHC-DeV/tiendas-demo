import { Module } from '@nestjs/common';
import { FileUploadService } from './fileUpload.service';

@Module({
  providers: [FileUploadService], // Agrega EmailService a la lista de providers
  exports: [FileUploadService], // Si también necesitas exportarlo para otros módulos
})
export class FileUploadModule {}
