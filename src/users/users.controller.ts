import { Controller, Get, Body, Post, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(
        private service: UsersService
    ) { }

    @Get()
    getAll(): User[] {
        return this.service.getAll();
    }

    @Get(':id')
    getByID(@Param() parameter): User {
        return this.service.getByID(parameter.id);
    }

    @Post()
    create(@Body() input: any): User {
        return this.service.create(input.lastname, input.firstname, input.age);
    }

    @Put(':id')
    edit(@Param() parameter, @Body() input: any): User {
        return this.service.edit(parameter.id, input.lastname, input.firstname, input.age);
    }

    @Delete(':id')
    popFromUsers(@Param() parameter) {
        this.service.popFromUsers(parameter.id);
    }
}