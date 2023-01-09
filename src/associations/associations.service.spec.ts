import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Association } from './association.entity';
import { AssociationsService } from './associations.service';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity)
}));

describe('AssociationsService', () => {
  let service: AssociationsService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssociationsService,
        UsersService,
        { provide: getRepositoryToken(Association), useFactory: repositoryMockFactory },
        { provide: getRepositoryToken(User), useFactory: repositoryMockFactory }]
    }).compile();

    service = module.get<AssociationsService>(AssociationsService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
