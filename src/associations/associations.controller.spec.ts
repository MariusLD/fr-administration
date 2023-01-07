import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Association } from './association.entity';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity)
}));

describe('AssociationsController', () => {
  let controller: AssociationsController;
  let service: AssociationsService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociationsController],
      providers: [
        AssociationsService,
        UsersService,
        { provide: getRepositoryToken(User), useFactory: repositoryMockFactory },
        { provide: getRepositoryToken(Association), useFactory: repositoryMockFactory }
      ]
    }).compile();

    service = module.get<AssociationsService>(AssociationsService);
    usersService = module.get<UsersService>(UsersService);
    controller = module.get<AssociationsController>(AssociationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
