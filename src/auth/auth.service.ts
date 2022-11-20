import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Login } from './auth.login';

@Injectable()
export class AuthService {

    constructor(
        private service: UsersService,
        private jwtService: JwtService
    ){}

    public async validateUser(id: number, password: string) : Promise<User> {
        let user: User = await this.service.getByID(id)
        if (await bcrypt.compare(password, user.password)) {
            return user;
        }
        return undefined;
    }

    async login(login: Login) {
        const payload = { username: login.username }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
