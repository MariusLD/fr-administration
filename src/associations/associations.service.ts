import { Injectable, Get, Body, Post, Param, Put, Delete, HttpException, HttpStatus} from '@nestjs/common';
import { Association } from './association.entity';

const assoc : Association[] = [
    {
        id: 0,
        idUsers : [0],
        name : "Les ptits filous"
    }
]

@Injectable()
export class AssociationsService {
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
        let id : number = assoc.length+1;
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
}
