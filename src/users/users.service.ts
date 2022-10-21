import { Injectable, Get, Body, Post, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
//https://bobbyhadz.com/blog/typescript-file-is-not-a-module
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private repository : Repository<User>
    ) {}

    @Get()
    async getAll(): Promise<User[]> {
        return this.repository.find();
    }
    @Get(':id')
    async getByID(@Param() givenID : number): Promise<User> {
        return this.repository.findOne({where:{id : Equal(givenID)}});
    }

    @Post()
    async create(@Body() lastname: string, firstname: string, age: number): Promise<User> {
        let length : number = (await this.getAll()).length;
        const newUser = await this.repository.create({
            id: length,
            lastname: lastname,
            firstname: firstname,
            age: age
        })
        await this.repository.save(newUser);
        return newUser;
    }

    @Put(':id')
    async edit(@Param() id: number, @Body() lastname: string, firstname: string, age: number): Promise<User> {
        let u: User = await this.getByID(id);
        if (lastname !== undefined) {
            u.lastname = lastname;
        }
        if (firstname !== undefined) {
            u.firstname = firstname;
        }
        if (age !== undefined) {
            u.age = age;
        }
        await this.repository.save(u);
        return u;
    }

    @Delete(':id')
    async popFromUsers(@Param() id: number) {
        let u: User = await this.getByID(id);
        if (u !== undefined) {
            this.repository.delete(u);
        }
    }

    async getUsersByIDs(ids : number[]): Promise<User[]>{
        let list : User[];
        for (var id of ids) {
            let u : User = await this.getByID(id);
            list.push(u);
        }
        return list;
    }
}
