import { Controller, Get, Body, Post, Param, Put, Delete } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { Association } from './association.entity';
import { User } from 'src/users/user.entity';

@Controller('associations')
export class AssociationsController {
    constructor(
        private service :  AssociationsService
    ){}

    @Get()
    getAll(): Association[] {
        return this.service.getAll();
    }

    @Get(':id') 
    getByID(@Param() parameter): Association{
        return this.service.getByID(parameter.id);
    }

    @Get(':id/members')
    getMembers(@Param() parameter): User[] {
        return this.service.getMembers(parameter.id);
    }

    @Post()
    create(@Body() input:any): Association {
        return this.service.create(input.idUsers, input.name);
    }

    @Put(':id')
    edit(@Param() parameter, @Body() input:any) : Association {
        return this.service.edit(parameter.id, input.idUsers, input.name);
    }

    @Delete(':id')
    popFromUsers(@Param() parameter) {
        this.service.popFromUsers(parameter.id);
    }
}
