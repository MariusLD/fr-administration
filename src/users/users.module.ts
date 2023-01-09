import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssociationsModule } from 'src/associations/associations.module';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports : [
    forwardRef(() => AssociationsModule),
    TypeOrmModule.forFeature([User])],
  exports : [UsersService]
})
export class UsersModule {}
