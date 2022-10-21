import { Injectable, Get, Body, Post, Param, Put, Delete, HttpException, HttpStatus} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Association } from './association.entity';
import { User } from 'src/users/user.entity';

const assoc : Association[] = [
    {
        id: 0,
        idUsers : [0],
        name : "Les ptits filous"
    }
]

@Injectable()
export class AssociationsService {
    constructor(
        private service: UsersService
    ) {}
    @Get()
    getAll(): Association[] {
        return assoc;
    }

    @Get(':id') 
    getByID(@Param() id : number): Association{
        return assoc.find(asso => asso.id == id);
    }

    @Post()
    create(@Body() idUsers : number[], name : string): Association {
        let id : number = assoc.length;
        let a:Association = new Association(id, idUsers, name);
        assoc .push(a);
        return a;
    }

    @Put(':id')
    edit(@Param() id : number, @Body() idUsers : number[], name : string) : Association {
        let a : Association = assoc.find(asso => asso.id == id);
        if (idUsers !== undefined) {
            a.idUsers=idUsers;
        }
        if (name !== undefined) {
            a.name=name;
        }
        return a;
    }

    @Delete(':id')
    popFromUsers(@Param() id : number) {
        let a : Association = assoc.find(asso => asso.id == id);
        if (a !== undefined) {
            assoc.splice(id, 1);
        } else {
            throw new HttpException(`AUCUN UTILISATEUR CORRESPONDANT AVEC L\'ID : ${id}`, HttpStatus.NOT_FOUND);
        }
    }

    @Get(':id/members')
    getMembers(@Param() id : number): User[] {
        let a : Association = assoc.find(asso => asso.id == id);
        let usersList : User[];
        for (var IDs of a.idUsers) {
            usersList.push(this.service.getByID(IDs));
        }
        return usersList;
    }
}
