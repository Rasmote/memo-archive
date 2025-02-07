import { IsString } from "@nestjs/class-validator";

export class AuthSignUpDto {
    @IsString()
    id: string;

    @IsString()
    password: string;
}

export class AuthLogInDto {
    @IsString()
    id: string;

    @IsString()
    password: string;
}