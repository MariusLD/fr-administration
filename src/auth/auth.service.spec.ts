import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AssociationsService } from '../associations/associations.service';
import { Association } from '../associations/association.entity';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity)
}));

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        JwtService,
        AssociationsService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
        { provide: getRepositoryToken(User), useFactory: repositoryMockFactory },
        { provide: getRepositoryToken(Association), useFactory: repositoryMockFactory}
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
