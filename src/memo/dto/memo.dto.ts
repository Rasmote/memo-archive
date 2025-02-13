import { IsNumber, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMemoDto {
    @ApiProperty({ description: '메모 제목' })
    @IsString()
    title: string;

    @ApiProperty({ description: '메모 내용' })
    @IsString()
    content: string;
}

export class UpdateMemoDto {
    @ApiProperty({ description: '업데이트할 메모의 번호' })
    @IsNumber()
    num: number;

    @ApiProperty({ description: '메모 제목목' })
    @IsString()
    title: string;

    @ApiProperty({ description: '메모 내용' })
    @IsString()
    content: string;
}

export class ReadDeleteMemoDto {
    @ApiProperty({ description: '읽어올/지울 메모의 번호' })
    @IsNumber()
    number: number;
}