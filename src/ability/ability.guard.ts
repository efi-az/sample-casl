import { UserEntity } from './../user/entities/user.entity';
import { UserService } from './../user/user.service';
import { AbilityFactory } from './ability.factory';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequiredRule, CHECK_ABILITY } from './ability.decorator';
import { ForbiddenError } from '@casl/ability';

@Injectable()
export class AbilityGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private caslAbilityFactory: AbilityFactory,
        private userService: UserService
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const rules = this.reflector.getAllAndOverride<RequiredRule[]>(CHECK_ABILITY,[ context.getHandler(), context.getClass() ] )

        const { user } = context.switchToHttp().getRequest()
        const ability = this.caslAbilityFactory.defineAbility(user)

        const { params } = context.switchToHttp().getRequest()
        const findEmployee = await this.userService.findOne({ id: params.employeeId })

        try {
            rules.forEach((rule) => ForbiddenError.from(ability).throwUnlessCan(rule.action, findEmployee))
            
            // return rules.every((rule) => ability.can(rule.action, rule.subject))

            return true
        } catch (error) {
            if (error instanceof ForbiddenError) {
                throw new ForbiddenException(error.message)
            }
        }
    }

}