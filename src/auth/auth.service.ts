import { UserEntity } from './../user/entities/user.entity';
import { UserService } from './../user/user.service';
import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import {UserLoginDto} from "./dto/user-login.dto";
import {UserRegisterDto} from "./dto/user-register.dto";
import {jwtConstants} from "./constants";

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {
    }

    async validateUser(userLoginDto: UserLoginDto): Promise<any> {
        const findUser = await this.userService.findOne({where: {username: userLoginDto.username}})

        if (!findUser) throw new NotFoundException()

        if (!bcrypt.compareSync(userLoginDto.password, findUser.password)) throw new ConflictException()

        const {password, ...result} = findUser;

        return result;
    }

    async login(userLoginDto: UserLoginDto): Promise<any> {
        const user = await this.validateUser(userLoginDto)
        const payload = {userId: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async registerUser(userDto: UserRegisterDto): Promise<any> {
        const findUser = await this.userService.findOne({where: {username: userDto.username}})

        if (findUser)
            throw new ConflictException()

        // hashed password
        const hashPassword = bcrypt.hashSync(userDto.password, jwtConstants.salt)

        // create user
        const user = new UserEntity()

        user.username = userDto.username
        user.password = hashPassword

        await this.userService.createUser(user)

        return {
            result: true
        }
    }
}
