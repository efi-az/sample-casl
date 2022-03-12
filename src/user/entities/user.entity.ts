import { DepartmentEntity } from './../../department/entities/department.entity';
import { UserRoleEnum } from './../enum/user-role.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @Column({type: 'enum', enum: UserRoleEnum, array: true, nullable: true})
    roles: UserRoleEnum[]

    // @ManyToOne(() => DepartmentEntity, (department) => department.obj_user ,{nullable: true})
    // obj_orgId: DepartmentEntity

    @Column({nullable: true})
    obj_orgId: number
}
