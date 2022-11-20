import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Login } from './auth.login';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() login: Login) {
        return this.authService.login(login)
    }
}
