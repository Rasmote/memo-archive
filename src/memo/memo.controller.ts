import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { MemoService } from './memo.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Request } from 'express';
import { CreateMemoDto, ReadDeleteMemoDto, UpdateMemoDto } from './dto/memo.dto';
import { UserEntity } from 'src/users/entity/user.entity';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('memo')
@UseGuards(AuthGuard)
export class MemoController {
    constructor(private memoService: MemoService) { }

    @ApiOperation({ summary: '모든 메모 조회', description: '해당 유저가 등록한 모든 메모 반환' })
    @ApiResponse({
        status: 200,
        description: `[{"num": number,"title": string,}, ...]`
    })
    @Get()
    async getAllMemos(@Req() req: Request) {
        const user = req.user as UserEntity;
        return this.memoService.getAllMemos(user);
    }

    @ApiOperation({ summary: '메모 작성', description: '메모를 추가함' })
    @ApiResponse({
        status: 200,
        description: `메모가 생성되었습니다.`
    })
    @Post('create')
    async createMemo(@Body() dto: CreateMemoDto, @Req() req: Request) {
        const user = req.user as UserEntity;
        return this.memoService.createMemo(dto, user);
    }

    @ApiOperation({ summary: '특정 메모 조회', description: '메모를 읽어옴' })
    @ApiResponse({
        status: 200,
        description: `{""memoPK": number,"title": string,"content": string"}`
    })
    @ApiResponse({
        status: 404,
        description: `해당 메모를 찾을 수 없습니다.`
    })
    @Get('read/:num')
    async readMemo(@Param('num') num: number, @Req() req: Request) {
        const user = req.user as UserEntity;
        return this.memoService.readMemo(num, user);
    }

    @ApiOperation({ summary: '메모 수정', description: '메모를 수정함' })
    @ApiResponse({
        status: 200,
        description: `메모가 수정되었습니다.`
    })
    @Post('update')
    async updateMemo(@Body() dto: UpdateMemoDto, @Req() req: Request) {
        const user = req.user as UserEntity;
        return this.memoService.updateMemo(dto, user);
    }

    @ApiOperation({ summary: '메모 삭제', description: '특정 메모를 삭제함' })
    @ApiResponse({
        status: 200,
        description: `메모가 삭제되었습니다.`
    })
    @Get('delete/:num')
    async deleteMemo(@Param('num') num: number, @Req() req: Request) {
        const user = req.user as UserEntity;
        return this.memoService.deleteMemo(num, user);
    }
}
