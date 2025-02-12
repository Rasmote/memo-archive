import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemoEntity } from './entity/memo.entity';
import { Repository } from 'typeorm';
import { CreateMemoDto, ReadDeleteMemoDto, UpdateMemoDto } from './dto/memo.dto';
import { UserEntity } from 'src/users/entity/user.entity';

@Injectable()
export class MemoService {
    constructor(
        @InjectRepository(MemoEntity)
        private memoRepository: Repository<MemoEntity>,
    ) { }

    async getAllMemos(user: UserEntity) {
        return this.memoRepository.find({
            where: { user: { userPk: user.userPk } },
            select: {
                memoPK: true,
                title: true,
                content: true,
            }
        });
    }

    async createMemo(dto: CreateMemoDto, user: UserEntity) {
        const memo = this.memoRepository.create({
            title: dto.title,
            content: dto.content,
            user: user, // 로그인한 사용자의 ID를 설정
        });
        await this.memoRepository.save(memo);
        return { message: '메모가 생성되었습니다.' };
    }

    async readMemo(num: number, user: UserEntity) {
        const memo = await this.memoRepository.findOne({
            where: { memoPK: num, user: { userPk: user.userPk } },
        });
        if (!memo) {
            throw new NotFoundException('해당 메모를 찾을 수 없습니다.');
        }
        return memo;
    }

    async updateMemo(dto: UpdateMemoDto, user: UserEntity) {
        const memo = await this.memoRepository.findOne({
            where: { memoPK: dto.num, user: { userPk: user.userPk } },
        });
        if (!memo) {
            throw new NotFoundException('해당 메모를 찾을 수 없습니다.');
        }

        memo.title = dto.title;
        memo.content = dto.content;
        await this.memoRepository.save(memo);
        return { message: '메모가 수정되었습니다.' };
    }

    async deleteMemo(id: number, user: UserEntity) {
        const memo = await this.memoRepository.findOne({
            where: { memoPK: id, user: { userPk: user.userPk } },
        });
        if (!memo) {
            throw new NotFoundException('해당 메모를 찾을 수 없습니다.');
        }

        await this.memoRepository.remove(memo);
        return { message: '메모가 삭제되었습니다.' };
    }
}
