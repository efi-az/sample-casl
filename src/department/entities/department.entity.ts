import { UserEntity } from './../../user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('department')
export class DepartmentEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    address: string

    // @OneToMany(() => UserEntity, (user) => user.obj_orgId, {nullable: true})
    // obj_user: UserEntity[]
    @Column({nullable: true})
    obj_user: number
}
