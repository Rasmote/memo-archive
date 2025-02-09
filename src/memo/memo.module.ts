import { Module } from '@nestjs/common';
import { MemoController } from './memo.controller';
import { MemoService } from './memo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entity/user.entity';
import { MemoEntity } from './entity/memo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, MemoEntity])],
  controllers: [MemoController],
  providers: [MemoService]
})
export class MemoModule { }
