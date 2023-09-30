import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js'
import { config } from './supabase.config';
import { FileType } from './FileType.enum';

@Injectable()
export class FileUploadService {
    async upload(fileData: string): Promise<string> {
        await this.validatorFile(fileData,[FileType.Imagen],5)
        try {          
            const supabase = await createClient(config.url, config.token)
            const buffer = Buffer.from(fileData, 'base64');
            const nameFile = `${config.folder}/${Date.now()}.png`;
            const uploadData = await supabase
                .storage
                .from(config.bucketName)
                .upload(nameFile, buffer, {
                    cacheControl: '3600',
                    upsert: true
                })
         
            const linkData = supabase
                .storage
                .from(config.bucketName)
                .getPublicUrl(nameFile)                
            return linkData.data.publicUrl;
        } catch (error) {
            throw new HttpException("Error inesperado.", 500);
        }
    }

    async validatorFile(base: string, types: Array<FileType>,fileSize:number): Promise<boolean | HttpException> {
        const infoData = base.substring(0, 25);
        const sizeMB = (base.length/ 1024)/1024;
        if(sizeMB > fileSize) throw new HttpException('Tamaño de archivo no permitido', HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        let isType:boolean = false;
        types.forEach((type, idx) => {
            switch (type) {
                case FileType.Imagen:
                    if (infoData.includes("image/")) {isType = true; return true}
                    break;                
                default:
                    break;
            }
        })
        if (isType) return true;
        throw new HttpException('Formato de archivo no permitido', HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }
}
