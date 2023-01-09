import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { UserInput } from './user.input';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Association } from 'src/associations/association.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(
        private service: UsersService
    ) { }

    @Post()
    @ApiCreatedResponse({
        description: 'The user has been successfully created.'
    })
    public async create(@Body() input: UserInput): Promise<User> {
        return this.service.create(input.lastname, input.firstname, input.age, input.password);
    }

    @Get()
    public async getAll(): Promise<User[]> {
        return this.service.getAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiParam({
        name: 'id',
        description: 'The id of the user to retrieve'
    })
    public async getById(@Param('id') parameter: number): Promise<User> {
        const usr: User = await this.service.get(parameter);
        if (usr === null) {
            throw new HttpException(`Could not find a user with the id ${parameter}`, HttpStatus.NOT_FOUND)
        }
        return usr
    }

    @Get(':id/associations')
    @ApiParam({
        name: 'id',
        description: 'The id of the user to get the associations they are a member of'
    })
    public async getAssos(@Param('id') parameter: number): Promise<Association[]> {
        return this.service.getAssos(+parameter);
    }

    @Put(':id')
    @ApiParam({
        name: 'id',
        description: 'The id of the user to update'
    })
    public async updateById(@Param('id') parameter: number, @Body() input: UserInput): Promise<User> {
        return this.service.update(
            parameter,
            input.lastname,
            input.firstname,
            input.age,
            input.password
        );
    }

    @Delete(':id')
    @ApiParam({
        name: 'id',
        description: 'The id of the user to delete'
    })
    public async deleteById(@Param('id') parameter: number): Promise<boolean> {
        return this.service.delete(parameter);
    }
}
