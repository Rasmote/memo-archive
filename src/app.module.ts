import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { MemoModule } from './memo/memo.module';
import { MemoEntity } from './memo/entity/memo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '113.198.230.24',
      port: 1032,
      username: 'sinhyeok',
      password: 'sinhyeok',
      database: 'memoADB',
      entities: [UserEntity, MemoEntity],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    MemoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
