import { IsNotEmpty, IsString } from "@nestjs/class-validator";

export class CreateUserDto {
    @IsString()
    id: string;

    @IsString()
    password: string;
}