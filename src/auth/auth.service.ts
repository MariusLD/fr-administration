import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private serviceUser: UsersService,
    ){}
    public async validateUser(id: number, password: string) : Promise<User> {
    let u : Promise<User> = this.serviceUser.getByID(id);

    if (u !== undefined && (await u).password == password) {
        return u;
    } else {
        return undefined;
    }
}
}
