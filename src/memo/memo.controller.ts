import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { MemoService } from './memo.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Request } from 'express';
import { CreateMemoDto, ReadDeleteMemoDto, UpdateMemoDto } from './dto/memo.dto';
import { UserEntity } from 'src/users/entity/user.entity';

@Controller('memo')
@UseGuards(AuthGuard)
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

    @Post('update')
    async updateMemo(@Body() dto: UpdateMemoDto, @Req() req: Request) {
        const user = req.user as UserEntity;
        return this.memoService.updateMemo(dto, user);
    }

    @Get('delete/:num')
    async deleteMemo(@Param('num') num: number, @Req() req: Request) {
        const user = req.user as UserEntity;
        return this.memoService.deleteMemo(num, user);
    }
}
