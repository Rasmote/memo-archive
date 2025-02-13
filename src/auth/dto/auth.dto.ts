import { IsNotEmpty, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthSignUpDto {
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    password: string;
}

export class AuthLogInDto {
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    password: string;
}

export class AuthRefreshDto {
    @ApiProperty({ description: 'Access토큰을 발급받기 위한 Refresh 토큰값값' })
    @IsNotEmpty()
    Rtoken: string;
}