import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    userPk: number;

    @Column()
    id: string;

    @Column()
    password: string;
}