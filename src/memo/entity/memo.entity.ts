import { UserEntity } from "src/users/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MemoEntity {
    @PrimaryGeneratedColumn()
    memoPK: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @ManyToOne(() => UserEntity, user => user.memos)
    @JoinColumn({ name: 'userid' })
    user: UserEntity;   //id
}