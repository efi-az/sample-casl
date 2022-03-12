import { DepartmentRepository } from './repository/department.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentEntity } from './entities/department.entity';
import { DepartmentDto } from './dto/create-department.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DepartmentService {
  constructor(@InjectRepository(DepartmentRepository) private readonly departmentRep: DepartmentRepository) {}

  async create(departmentDto: DepartmentDto) {
    const department = new DepartmentEntity()
    department.address = departmentDto.address
    department.name = departmentDto.name
    return await this.departmentRep.save(department)
  }

  findAll() {
    return `This action returns all department`;
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }

  update(id: number, departmentDto: DepartmentDto) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
