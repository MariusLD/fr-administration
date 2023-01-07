import { User } from '../users/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Association {

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToMany(type => User, { eager: true }) // mode chargement de toutes les données
    @JoinTable()
    public users: User[];

    @Column()
    public name: string;
}
