import { Column, Entity, JoinColumn, ManyToMany } from "typeorm";
import { User } from 'src/users/user.entity';
import { Association } from "src/associations/association.entity";

@Entity()
export class Role {
    @Column()
    name : string;

    @ManyToMany(type => User)
    @JoinColumn()
    idUser : number;

    @ManyToMany(type => Association)
    @JoinColumn()
    idAssociation : number;
}