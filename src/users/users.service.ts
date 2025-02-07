import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dto/user.response.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    async createUser(dto: CreateUserDto): Promise<UserResponseDto> {
        const Hpassword = await bcrypt.hash(dto.password, 10);
        const user = this.userRepository.create({ id: dto.id, password: Hpassword })
        this.userRepository.save(user);
        return new UserResponseDto("회원가입 성공");
    }

    async findUserById(id: string): Promise<UserEntity | null> {
        const user = this.userRepository.findOne({ where: { id } });
        if (!user) {
            return null;
        }
        else {
            return user;
        }
    }
}
