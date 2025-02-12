import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthLogInDto, AuthRefreshDto, AuthSignUpDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
    constructor(
        private usersService: UsersService,
        private authservice: AuthService
    ) { }

    @Post('signup')
    async signup(@Body() body: AuthSignUpDto) {
        return this.usersService.createUser(body);
    }

    @Post()
    async login(@Body() body: AuthLogInDto) {
        const user = await this.authservice.checkUser(body);
        return this.authservice.login(user);
    }

    @Post('refresh')
    async refresh(@Body() body: AuthRefreshDto) {
        return this.authservice.refreshAccessToken(body);
    }
}