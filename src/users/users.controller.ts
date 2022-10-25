import { Controller, Get, Body, Post, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { ApiTags } from '@nestjs/swagger';
import { UserInput } from './user.input';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(
        private service: UsersService
    ) { }

    @Get()
    async getAll(): Promise<User[]> {
        return this.service.getAll();
    }

    @Get(':id')
    async getByID(@Param() parameter): Promise<User> {
        return this.service.getByID(parameter.id);
    }

    @Post()
    async create(@Body() input: UserInput): Promise<User> {
        return this.service.create(input.lastname, input.firstname, input.age);
    }

    @Put(':id')
    async edit(@Param() parameter, @Body() input: UserInput): Promise<User> {
        return this.service.edit(parameter.id, input.lastname, input.firstname, input.age);
    }

    @Delete(':id')
    async popFromUsers(@Param() parameter) {
        await this.service.popFromUsers(parameter.id);
    }
}