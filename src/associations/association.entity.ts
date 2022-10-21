import { Column, Entity, PrimaryColumn } from "typeorm";
import { User } from 'src/users/user.entity';

@Entity()
export class Association {
    @PrimaryColumn()
    id : number;

    @Column()
    idUsers : User[];

    @Column()
    name : string;

    constructor(id : number, idUsers : User[], name : string){
        this.idUsers = idUsers;
        this.name = name;
    }
}