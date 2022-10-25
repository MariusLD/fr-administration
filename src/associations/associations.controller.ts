import { Controller, Get, Body, Post, Param, Put, Delete } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { Association } from './association.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssociationInput } from './association.input';
import { UserInput } from 'src/users/user.input';

@ApiTags('associations')
@Controller('associations')
export class AssociationsController {
    constructor(
        private serviceUser: UsersService,
        private service :  AssociationsService
    ){}

    @ApiResponse({
        description: "Returns the list of all associations",
        type: [AssociationInput],

    })
    @Get()
    async getAll(): Promise<Association[]> {
        return await this.service.getAll();
    }

    @ApiResponse({
        description: "Returns the association with the specified ID",
        type: AssociationInput,

    })
    @Get(':id') 
    async getByID(@Param('id') parameter : number): Promise<Association>{
        return await this.service.getByID(parameter);
    }

    @ApiResponse({
        description: "Returns the list of all users in a specified association",
        type: [UserInput],
    })    
    @Get(':id/members')
    async getMembers(@Param('id') parameter : number): Promise<User[]> {
        return await this.service.getMembers(parameter);
    }

    @ApiResponse({
        description: "Creates a new association",
        type: AssociationInput,
    })   
    @Post()
    async create(@Body() input: AssociationInput): Promise<Association> {
        let idUsers : User[] = await this.serviceUser.getUsersByIDs(input.idUsers);
        return await this.service.create(idUsers, input.name);
    }

    @ApiResponse({
        description: "Update a specified association",
        type: AssociationInput,
    })  

    @Put(':id')
    async edit(@Param('id') parameter : number, @Body() input: AssociationInput) : Promise<Association> {
        let idUsers : User[] = await this.serviceUser.getUsersByIDs(input.idUsers);
        return await this.service.edit(+parameter, idUsers, input.name);
    }

    @ApiResponse({
        description: "Delete the specified association",
    })   
    @Delete(':id')
    async popFromUsers(@Param('id') parameter : number) {
        await this.service.popFromUsers(parameter);
    }
}
