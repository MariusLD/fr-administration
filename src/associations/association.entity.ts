import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { User } from 'src/users/user.entity';
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Association {
    @PrimaryColumn()
    id : number;

    @ManyToMany(type=>User, {eager: true})
    @JoinTable()
    idUsers : User[];

    @Column()
    name : string;

    constructor(idUsers : User[], name : string){
        this.idUsers = idUsers;
        this.name = name;
    }
}