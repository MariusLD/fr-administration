import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { AssociationsService } from '../associations/associations.service';
import { User } from '../users/user.entity';
import { Association } from './association.entity';
import { AssociationInput } from './association.input';

@ApiTags('associations')
@Controller('associations')
export class AssociationsController {

    constructor(
        private service: AssociationsService
    ) { }

    @Post()
    @ApiCreatedResponse({
        description: 'The association has been successfully created.'
    })
    public async create(@Body() input: AssociationInput): Promise<Association> {
        return this.service.create(input.idUsers, input.name);
    }

    @Get()
    public async getAll(): Promise<Association[]> {
        return this.service.getAll();
    }

    @Get(':id')
    @ApiParam({
        name: 'id',
        description: 'The id of the association to retrieve'
    })
    public async getById(@Param('id') parameter: number): Promise<Association> {
        const asso: Association = await this.service.get(parameter);
        if (asso === null) {
            throw new HttpException(`Could not find a user with the id ${parameter}`, HttpStatus.NOT_FOUND)
        }
        return asso
    }

    @Get(':id/members')
    @ApiParam({
        name: 'id',
        description: 'The id of the association whose members to retrieve'
    })
    public async getMembers(@Param('id') parameter: number): Promise<User[]> {
        return this.service.getMembers(parameter);
    }

    @Put(':id')
    @ApiParam({
        name: 'id',
        description: 'The id of the association to update'
    })
    public async updateById(@Param('id') parameter: number, @Body() input: AssociationInput): Promise<Association> {
        return this.service.update(
            parameter,
            input.idUsers,
            input.name
        );
    }

    @Delete(':id')
    @ApiParam({
        name: 'id',
        description: 'The id of the association to delete'
    })
    public async deleteById(@Param('id') parameter: number): Promise<boolean> {
        return this.service.delete(parameter);
    }
}
