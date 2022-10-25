import { Controller, Get, Body, Post, Param, Put, Delete } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { Association } from './association.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { ApiTags } from '@nestjs/swagger';
import { AssociationInput } from './association.input';

@ApiTags('associations')
@Controller('associations')
export class AssociationsController {
    constructor(
        private serviceUser: UsersService,
        private service :  AssociationsService
    ){}

    @Get()
    async getAll(): Promise<Association[]> {
        return await this.service.getAll();
    }

    @Get(':id') 
    async getByID(@Param() parameter): Promise<Association>{
        return await this.service.getByID(parameter.id);
    }

    @Get(':id/members')
    async getMembers(@Param() parameter): Promise<User[]> {
        return await this.service.getMembers(parameter.id);
    }

    @Post()
    async create(@Body() input: AssociationInput): Promise<Association> {
        let idUsers : User[] = await this.serviceUser.getUsersByIDs(input.idUsers);
        return await this.service.create(idUsers, input.name);
    }

    @Put(':id')
    async edit(@Param() parameter, @Body() input: AssociationInput) : Promise<Association> {
        let idUsers : User[] = await this.serviceUser.getUsersByIDs(input.idUsers);
        return await this.service.edit(parameter.id, idUsers, input.name);
    }

    @Delete(':id')
    async popFromUsers(@Param() parameter) {
        await this.service.popFromUsers(parameter.id);
    }
}
