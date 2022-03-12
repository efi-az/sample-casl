import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { DepartmentEntity } from "../entities/department.entity";

@Injectable()
@EntityRepository(DepartmentEntity)
export class DepartmentRepository extends Repository<DepartmentEntity> {
    
}