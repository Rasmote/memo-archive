import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { MemoService } from './memo.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Request } from 'express';
import { CreateMemoDto, UpdateMemoDto } from './dto/memo.dto';
import { UserEntity } from 'src/users/entity/user.entity';

@Controller('memo')
@UseGuards(AuthGuard) // 인증 가드 적용
export class MemoController {
    constructor(private memoService: MemoService) { }

    @Get()
    async getAllMemos(@Req() req: Request) {
        const user = req.user as UserEntity;
        return this.memoService.getAllMemos(user);
    }

    @Post('create')
    async createMemo(@Body() dto: CreateMemoDto, @Req() req: Request) {
        const user = req.user as UserEntity;
        return this.memoService.createMemo(dto, user);
    }

    @Get('read/:num')
    async readMemo(@Param('num') num: number, @Req() req: Request) {
        const user = req.user as UserEntity;
        return this.memoService.readMemo(num, user);
    }

    @Post('update/:num')
    async updateMemo(@Body() dto: UpdateMemoDto, @Req() req: Request) {
        const user = req.user as UserEntity;
        return this.memoService.updateMemo(dto, user);
    }

    @Delete('delete/:num')
    async deleteMemo(@Param('num') num: number, @Req() req: Request) {
        const user = req.user as UserEntity;
        return this.memoService.deleteMemo(num, user);
    }
}
