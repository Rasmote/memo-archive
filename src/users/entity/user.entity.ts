import { MemoEntity } from "src/memo/entity/memo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    userPk: number;

    @Column({ unique: true })
    id: string;

    @Column()
    password: string;

    @OneToMany(() => MemoEntity, memo => memo.user)
    memos: MemoEntity[];
}