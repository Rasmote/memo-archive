import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule,
    JwtModule.register({
      secret: 'sinhyeok',
      signOptions: { expiresIn: '30m' }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService]
})
export class AuthModule { }
