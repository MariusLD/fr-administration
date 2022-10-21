import { Injectable, Get, Body, Post, Param, Put, Delete, HttpException, HttpStatus} from '@nestjs/common';
//https://bobbyhadz.com/blog/typescript-file-is-not-a-module
import { User } from './user.entity';

const users : User[] = [
    {
        id: 0,
        lastname: 'Bouger',
        firstname: 'Yanis',
        age: 23
    }
]

@Injectable()
export class UsersService {
    @Get()
    getAll(): User[] {
        return users;
    }

    @Get(':id') 
    getByID(@Param() id : number): User{
        return users.find(user => user.id == id);
    }

    @Post()
    create(@Body() lastname : string, firstname : string, age : number): User {
        let id : number = users.length+1;
        let u:User = new User(id, lastname, firstname, age);
        users.push(u);
        return u;
    }

    @Put(':id')
    edit(@Param() id : number, @Body() lastname : string, firstname : string, age : number) : User {
        let u : User = users.find(user => user.id == id);
        if (lastname !== undefined) {
            u.lastname=lastname;
        }
        if (firstname !== undefined) {
            u.firstname=firstname;
        }
        if (age !== undefined) {
            u.age=age;
        }
        return u;
    }

    @Delete(':id')
    popFromUsers(@Param() id : number) {
        let u : User = users.find(user => user.id == id);
        if (u !== undefined) {
            users.splice(id, 1);
        } else {
            throw new HttpException(`AUCUN UTILISATEUR CORRESPONDANT AVEC L\'ID : ${id}`, HttpStatus.NOT_FOUND);
        }
    }
}
