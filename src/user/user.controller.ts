import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import { paymentUserDto } from './dto/payment-user.dto';
import { UserEntity } from './entities/user.entity';
import { AbilityGuard } from './../ability/ability.guard';
import { CheckAbilities, DeleteUserAbility, PaymentUserAbility } from './../ability/ability.decorator';
import { AbilityFactory, Action } from './../ability/ability.factory';
import { Controller, Get, Post, Body, Patch, Param, Delete, ForbiddenException, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ForbiddenError } from '@casl/ability';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService,
              private readonly abilityFactory: AbilityFactory) {}

  // @Post()
  // async create(@Body() createUserDto: CreateUserDto) {
    // const user: User = {id: 1, isAdmin: false, orgId: 1} // req.user
    // const ability = this.abilityFactory.defineAbility(user)

    // const isAllowed = ability.can(Action.Create, User)
    // if(!isAllowed) {
    //   throw new ForbiddenException('only admin')
    // }

    // try {
      // ForbiddenError.from(ability).throwUnlessCan(Action.Create, User)
      
      // return await this.userService.createUser(createUserDto);
    // } catch (error) {
      // if (error instanceof ForbiddenError) {
        // throw new ForbiddenException(error.message)
      // }
    // }
  // }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @CheckAbilities(new PaymentUserAbility())
  @Post('payment/:employeeId')
  async paymentUser(@Param('employeeId') employeeId: number, @Body() paymentDto: paymentUserDto, @Req() req): Promise<any> {
    return await this.userService.payment(employeeId, paymentDto, req.user)
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // @CheckAbilities(new ReadUserAbility())
  // @UseGuards(AbilityGuard)
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // const user: UserEntity = {id: 1, isAdmin: false, orgId: 1} // req.user
    
    // try {
    //   return this.userService.update(+id, updateUserDto, user);
    // } catch (error) {
    //   if (error instanceof ForbiddenError) {
    //     throw new ForbiddenException(error.message)
    //   }
    // }
  // }

  // @Delete(':id')
  // @CheckAbilities(new DeleteUserAbility())
  // @UseGuards(AbilityGuard)
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
