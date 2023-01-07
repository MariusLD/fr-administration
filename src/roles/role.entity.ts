import { Column, Entity, JoinColumn, ManyToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Association } from '../associations/association.entity';

@Entity()
export class Role {
    @Column()
    public name : string;

    @ManyToMany(type => User)
    @JoinColumn()
    public idUser : number;

    @ManyToMany(type => Association)
    @JoinColumn()
    public idAssociation : number;
}