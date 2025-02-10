import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'sinhyeok',
      signOptions: { expiresIn: '30m' }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, AuthGuard],
  exports: [AuthGuard, AuthService, JwtModule, UsersModule]
})
export class AuthModule { }