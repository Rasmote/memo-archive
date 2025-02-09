import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('로그인이 필요합니다.');
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = this.jwtService.verify(token);
            const user = await this.usersService.findUserById(decoded.id);

            if (!user) {
                throw new UnauthorizedException('유효하지 않은 사용자입니다.');
            }

            request.user = user;
            return true;
        } catch (error) {
            throw new UnauthorizedException('토큰이 유효하지 않습니다.');
        }
    }
}
