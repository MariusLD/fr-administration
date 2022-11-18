import { Body, Delete, Get, Injectable, Param, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private repository : Repository<Role>
    ) {}

    @Post()
    async create(@Body() name : string, idUser : number, idAssociation : number): Promise<Role> {
        const newRole = this.repository.create({
            name: name,
            idUser: idUser,
            idAssociation: idAssociation
        })
        await this.repository.save(newRole);
        return newRole;
    }

    @Get(':idU/:idA') 
    async getByID(@Param('idU') idUser : number, @Param('idA') idAssociation : number): Promise<Role>{
        return await this.repository.findOne({where:{idUser : Equal(idUser), idAssociation : Equal(idAssociation)}});
    }

    @Delete(':idU/idA')
    async deleteByID(@Param('idU') idUser : number, @Param('idA') idAssociation : number) {
        let role = await this.repository.findOne({where:{idUser : Equal(idUser), idAssociation : Equal(idAssociation)}});
        if (role !== undefined) {
            this.repository.delete(role);
        }
    }

    @Put(':idU/idA')
    async edit(@Param('idU') idUser : number, @Param('idA') idAssociation, @Body() name: string) : Promise<Role>{
        let role = await this.repository.findOne({where:{idUser : Equal(idUser), idAssociation : Equal(idAssociation)}});
        if (name !== undefined) {
            role.name = name;
        }
        await this.repository.save(role);
        return role;
    }
}
