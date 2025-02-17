import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthLogInDto, AuthRefreshDto, AuthSignUpDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('login')
export class AuthController {
    constructor(
        private usersService: UsersService,
        private authservice: AuthService
    ) { }

    @Post('signup')
    @ApiOperation({ summary: '회원가입', description: '유저를 회원가입시킴' })
    @ApiResponse({
        status: 200,
        description: `회원가입 성공.`
    })
    @ApiResponse({
        status: 400,
        description: `"id must be a string","password must be a string"`
    })
    @ApiResponse({
        status: 409,
        description: `이미 존재하는 ID입니다.`
    })
    async signup(@Body() body: AuthSignUpDto) {
        return this.usersService.createUser(body);
    }

    @Post()
    @ApiOperation({ summary: '로그인', description: '아이디 패스워드를 받아 로그인 및 토큰발급' })
    @ApiResponse({
        status: 200,
        description: `"access_token": "(tokenValue)","refresh_token": "(tokenValue)"`
    })
    @ApiResponse({
        status: 400,
        description: `"id must be a string","password must be a string"`
    })
    @ApiResponse({
        status: 401,
        description: `아이디 혹은 비밀번호가 틀렸습니다.`
    })
    async login(@Body() body: AuthLogInDto) {
        const user = await this.authservice.checkUser(body);
        return this.authservice.login(user);
    }

    @Post('refresh')
    @ApiOperation({ summary: '엑세스 토큰 재발급', description: '리프레시 토큰을 받아 엑세스 토큰을 재발급' })
    @ApiResponse({
        status: 200,
        description: `"access_token": "(tokenValue)"`
    })
    @ApiResponse({
        status: 400,
        description: `Rtoken should not be empty`
    })
    @ApiResponse({
        status: 401,
        description: `리프레시 토큰이 유효하지 않습니다.`
    })
    async refresh(@Body() body: AuthRefreshDto) {
        return this.authservice.refreshAccessToken(body);
    }
}