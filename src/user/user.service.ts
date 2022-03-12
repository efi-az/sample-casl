import { paymentUserDto } from './dto/payment-user.dto';
import { UserRepository } from './repository/user.repository';
import { ForbiddenError } from '@casl/ability';
import { AbilityFactory, Action } from './../ability/ability.factory';
import { UserEntity } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(private readonly abilityFactory: AbilityFactory, @InjectRepository(UserRepository) private readonly userRep: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    await this.userRep.save(createUserDto)
  }

  findAll() {
    return `This action returns all user`;
  }

  async payment(employeeId: number, paymentDto: paymentUserDto, user: UserEntity) {
    const employee = await this.userRep.findOne({id: employeeId})

    // const ability = this.abilityFactory.defineAbility(currentUser)
    // const userToUpdate = this.findOne(+id)
    // ForbiddenError.from(ability).throwUnlessCan(Action.Update, userToUpdate)

    return {
      employee,
      paymentDto,
      user
    }
  }

  async findOne(conditions): Promise<UserEntity> {
    return await this.userRep.findOne(conditions)
  }

  update(id: number, updateUserDto: UpdateUserDto, currentUser: UserEntity) {
    // const ability = this.abilityFactory.defineAbility(currentUser)
    // const userToUpdate = this.findOne(+id)
    // ForbiddenError.from(ability).throwUnlessCan(Action.Update, userToUpdate)

    // return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
