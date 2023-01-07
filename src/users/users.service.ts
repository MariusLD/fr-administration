import { Injectable } from '@nestjs/common';
//https://bobbyhadz.com/blog/typescript-file-is-not-a-module
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private repository: Repository<User>
    ) { }

    async getAll(): Promise<User[]> {
        return this.repository.find();
    }

    async get(givenID: number): Promise<User> {
        return this.repository.findOne({ where: { id: Equal(givenID) } });
    }

    async create(lastname: string, firstname: string, age: number, password: string): Promise<User> {
        const hash = await bcrypt.hash(password, saltOrRounds);
        const usr = this.repository.create({
            lastname: lastname,
            firstname: firstname,
            age: age,
            password: hash
        })
        return this.repository.save(usr);
    }

    async update(id: number, lastname: string, firstname: string, age: number, password: string): Promise<User> {
        let usr: User = await this.get(id);
        if (lastname !== undefined) {
            usr.lastname = lastname;
        }
        if (firstname !== undefined) {
            usr.firstname = firstname;
        }
        if (age !== undefined) {
            usr.age = age;
        }
        if (password !== undefined) {
            const hash = await bcrypt.hash(password, saltOrRounds);
            usr.password = hash;
        }
        return this.repository.save(usr);
    }

    async delete(id: number): Promise<boolean> {
        let res = await this.repository.delete(id);
        return res.affected > 0;
    }

}
