import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthLogInDto, AuthRefreshDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async checkUser(dto: AuthLogInDto): Promise<any> {
        const user = await this.usersService.findUserById(dto.id);
        if (user && (await bcrypt.compare(dto.password, user.password))) {
            return user;
        }
        throw new UnauthorizedException('아이디 혹은 비밀번호가 틀렸습니다.');
    }

    async login(user: any) {
        const payload = { userPk: user.userPk, id: user.id };
        return {
            access_token: this.jwtService.sign(payload, { expiresIn: '10m' }),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '30m', secret: "REFRESH" }),
        }
    }

    async refreshAccessToken(dto: AuthRefreshDto) {
        try {
            const payload = this.jwtService.verify(dto.Rtoken, { secret: 'REFRESH' });

            const newAccessToken = this.jwtService.sign(
                { userPk: payload.userPk, id: payload.id },
                {
                    secret: 'sinhyeok', expiresIn: '10m'
                },
            );

            return { access_token: newAccessToken };
        } catch (error) {
            throw new UnauthorizedException('리프레시 토큰이 유효하지 않습니다.');
        }
    }
}
