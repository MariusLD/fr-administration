import { Controller, Get, Body, Post, Param, Put, Delete } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Association } from 'src/associations/association.entity';
import { AssociationsService } from 'src/associations/associations.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Role } from './role.entity';
import { RoleInput } from './role.input';
import { RoleUpdate } from './role.update';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(
        private serviceUser: UsersService,
        private serviceAssociation:  AssociationsService,
        private serviceRole: RolesService
    ){}


    @ApiResponse({
        description: "Creates a new role",
        type: RoleInput,
    })   
    @Post()
    async create(@Body() input: RoleInput): Promise<Role> {
        return await this.serviceRole.create(input.name, input.idUser, input.idAssociation);
    }

    @ApiResponse({
        description: "Returns the role",
        type: RoleInput,

    })
    @Get(':idU/:idA') 
    async getByID(@Param('idU') idUser : number, @Param('idA') idAssociation : number): Promise<Role>{
        let users = await this.serviceAssociation.getMembers(idAssociation);
        if (users.includes(await this.serviceUser.getByID(idUser))) {
            return await this.serviceRole.getByID(idUser, idAssociation)
        }
    }

    @ApiResponse({
        description: "Delete the role",
    })   
    @Delete(':idU/:idA')
    async deleteByID(@Param('idU') idUser : number, @Param('idA') idAssociation : number) {
        await this.serviceRole.deleteByID(idUser, idAssociation);
    }

    @ApiResponse({
        description: "Update a specified association",
        type: RoleInput,
    })  
    @Put(':idU/:idA')
    async edit(@Param('idU') idUser : number, @Param('idA') idAssociation, @Body() input: RoleUpdate) : Promise<Role> {
        return await this.serviceRole.edit(idUser, idAssociation, input.name);
    }
}
