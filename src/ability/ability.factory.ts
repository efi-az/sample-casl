import { UserRoleEnum } from './../user/enum/user-role.enum';
import { UserEntity } from './../user/entities/user.entity';
import { Injectable } from "@nestjs/common";
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete'
}

export type Subjects = InferSubjects<typeof UserEntity>;

export type AppAbility =  Ability<[Action, Subjects]>

@Injectable()
export class AbilityFactory {
    defineAbility(user: UserEntity) {
        const { can, cannot, build, rules } = new AbilityBuilder(Ability as AbilityClass<AppAbility>)

        // if (user.roles.includes(UserRoleEnum.admin)) {
            can(Action.Manage, UserEntity)
            cannot(Action.Manage, UserEntity, { obj_orgId: {$ne: user.obj_orgId} }).because('you can only manage users in your own organization')
        // } else {
        //     can(Action.Read, UserEntity)
        //     cannot(Action.Create, UserEntity).because('only admin')
        //     cannot(Action.Delete, UserEntity).because('not Access')
        // }
        
        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>
        })

    }
}
