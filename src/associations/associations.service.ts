import { Injectable, Get, Body, Post, Param, Put, Delete} from '@nestjs/common';
import { Association } from './association.entity';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class AssociationsService {

    constructor(
        @InjectRepository(Association)
        private repository : Repository<Association>
    ) {}

    @Get()
    async getAll(): Promise<Association[]> {
        return this.repository.find();
    }

    @Get(':id') 
    async getByID(@Param() givenID : number): Promise<Association>{
        return await this.repository.findOne({where:{id : Equal(givenID)}});
    }

    @Post()
    async create(@Body() idUsers : User[], name : string): Promise<Association> {
        const newAssociation = await this.repository.create({
            idUsers: idUsers,
            name: name
        })
        await this.repository.save(newAssociation);
        return newAssociation;
    }
s
    @Put(':id')
    async edit(@Param() id : number, @Body() idUsers : User[], name : string) : Promise<Association> {
        let a: Association = await this.getByID(id);
        if (idUsers !== undefined) {
            a.idUsers = idUsers;
        }
        if (name !== undefined) {
            a.name = name;
        }
        await this.repository.save(a);
        return a;
    }

    @Delete(':id')
    async popFromUsers(@Param() id : number) {
        let a: Association = await this.getByID(id);
        if (a !== undefined) {
            this.repository.delete(a);
        }
    }

    @Get(':id/members')
    async getMembers(@Param() id : number): Promise<User[]> {
        let a: Association = await this.getByID(id);
        return a.idUsers;
    }
}
