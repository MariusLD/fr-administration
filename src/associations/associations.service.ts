import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { Equal, Repository } from 'typeorm';
import { Association } from './association.entity';


@Injectable()
export class AssociationsService {

    constructor(
        @InjectRepository(Association)
        private repository: Repository<Association>,
        @Inject(forwardRef(() => UsersService))
        private service: UsersService
    ) { }

    public async create(idUsers: number[], name: string): Promise<Association> {
        let users: User[] = [];
        for (let id of idUsers) {
            users.push(await this.service.get(id));
        }
        const asso: Association = this.repository.create({
            users: users,
            name: name
        });
        return this.repository.save(asso);
    }

    public async getAll(): Promise<Association[]> {
        return this.repository.find();
    }

    public async get(id: number): Promise<Association> {
        return this.repository.findOne({ where: { id: Equal(id) } });
    }

    public async getMembers(id: number): Promise<User[]> {
        const asso: Association = await this.get(id);
        return asso.users;
    }

    public async update(id: number, idUsers: number[], name: string): Promise<Association> {
        let asso: Association = await this.get(id);
        if (idUsers !== undefined) {
            let users: User[] = [];
            for (let id of idUsers) {
                users.push(await this.service.get(id));
            }
            asso.users = users;
        }
        if (name !== undefined) {
            asso.name = name;
        }
        return this.repository.save(asso);
    }

    public async delete(id: number): Promise<boolean> {
        let res = await this.repository.delete(id);
        return res.affected > 0;
    }

}
