import { IsNumber, IsString } from "@nestjs/class-validator";

export class CreateMemoDto {
    @IsString()
    title: string;

    @IsString()
    content: string;
}

export class UpdateMemoDto {
    @IsNumber()
    num: number;

    @IsString()
    title: string;

    @IsString()
    content: string;
}