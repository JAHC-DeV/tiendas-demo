import { ApiProperty } from "@nestjs/swagger";

export class SearchRequestDto {
    @ApiProperty()
    public keywords: string;
    @ApiProperty()
    public page: number;
}