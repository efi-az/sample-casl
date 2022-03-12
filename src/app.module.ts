import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AbilityModule } from './ability/ability.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [UserModule, AbilityModule, ConfigModule, DatabaseModule, AuthModule, DepartmentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
