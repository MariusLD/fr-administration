import { Controller, Get, Body, Post, Param, Put, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './role.entity';
import { RoleInput } from './role.input';
import { RoleUpdate } from './role.update';
import { RolesService } from './roles.service';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
    constructor(
        private service: RolesService
    ) { }


    @ApiResponse({
        description: "Creates a new role",
        type: RoleInput,
    })
    @Post()
    async create(@Body() input: RoleInput): Promise<Role> {
        return this.service.create(
            input.name,
            input.idUser,
            input.idAssociation);
    }

    @ApiResponse({
        description: "Returns the role",
        type: RoleInput,
    })
    @Get(':idU/:idA')
    async getByID(@Param('idU') idUser: number, @Param('idA') idAssociation: number): Promise<Role> {
        const role: Role = await this.service.get(idUser, idAssociation);
        if (role === null) {
            throw new HttpException(`Could not find role for user with the id ${idUser} in association with th id ${idAssociation}`, HttpStatus.NOT_FOUND)
        }
        return role
    }

    @ApiResponse({
        description: "Update a specified association",
        type: RoleInput,
    })
    @Put(':idU/:idA')
    async updateById(@Param('idU') idUser: number, @Param('idA') idAssociation, @Body() input: RoleUpdate): Promise<Role> {
        return this.service.update(idUser, idAssociation, input.name);
    }

    @ApiResponse({
        description: "Delete the role",
    })
    @Delete(':idU/:idA')
    async deleteByID(@Param('idU') idUser: number, @Param('idA') idAssociation: number): Promise<boolean> {
        return this.service.delete(idUser, idAssociation);
    }

}
