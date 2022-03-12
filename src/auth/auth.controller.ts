import {Body, Controller, Get, Post, Req, UseGuards, ValidationPipe} from "@nestjs/common";
import {UserRegisterDto} from "./dto/user-register.dto";
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./guard/jwt-auth.guard";
import {UserLoginDto} from "./dto/user-login.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('register')
    async registerUser(@Body(ValidationPipe) userRegisterDto: UserRegisterDto): Promise<any> {
        return await this.authService.registerUser((userRegisterDto))
    }

    @Post('login')
    async loginUser(@Body(ValidationPipe) userLoginDto: UserLoginDto): Promise<any> {
        return await this.authService.login(userLoginDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('user')
    async getUser(@Req() req) {
        return {
            result: req.user
        }
    }

}