import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Association } from '../associations/association.entity';
import { AssociationsService } from '../associations/associations.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity)
}));

describe('UsersService', () => {
  let service: UsersService;
  let assoService: AssociationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        AssociationsService,
        { provide: getRepositoryToken(User), useFactory: repositoryMockFactory },
        { provide: getRepositoryToken(Association), useFactory: repositoryMockFactory }
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
    assoService = module.get<AssociationsService>(AssociationsService);
  });
  
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
