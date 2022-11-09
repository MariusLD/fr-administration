import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private serviceUser: UsersService,
        private jwtService: JwtService
    ){}
    public async validateUser(id: number, password: string) : Promise<User> {
    let u : Promise<User> = this.serviceUser.getByID(id);

    if ((await u) !== undefined && bcrypt.compare((await u).password, password)) {
        return u;
    } else {
        return undefined;
    }
    }

    async login(user: any) {
        const payload = { username: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
