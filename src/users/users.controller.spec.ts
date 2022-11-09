import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserInput } from './user.input';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
}));

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useFactory: repositoryMockFactory}
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

describe('getAll', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useFactory: repositoryMockFactory}
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
    let u1 : UserInput = new UserInput; u1.age = 23; u1.firstname = 'John'; u1.lastname = 'Doe';
    let u2 : UserInput = new UserInput; u2.age = 99; u2.firstname = 'Yanis'; u2.lastname = 'Bouger';
    controller.create(u1);
    controller.create(u2);
  });
  it('should return an array of users', async () => {
    const expected = Promise.all([{ 
        id: 0, 
        firstname: 'John',
        lastname: 'Doe',
        age: 23,
        password: 'blabla'
    }, {
        id:1,
        firstname:'Yanis',
        lastname: 'Bouger',
        age: 99,
        password: 'blabla'
    }]);
    jest.spyOn(service, 'getAll').mockImplementation(() => expected);
    expect(await controller.getAll()).toBe(await expected);
  });
});

/*
describe('getByID', () => {
  let controller: UsersController;
  let service: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useFactory: repositoryMockFactory}
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
    let u1 : UserInput = new UserInput; u1.age = 23; u1.firstname = 'John'; u1.lastname = 'Doe';
    let u2 : UserInput = new UserInput; u2.age = 99; u2.firstname = 'Yanis'; u2.lastname = 'Bouger';
    controller.create(u1);
    controller.create(u2);
  });
  it('should return a single user, with the provided id', async () => {
    const expected = await Promise.all([{
        id: 1, 
        firstname: 'Yanis',
        lastname: 'Bouger',
        age: 99
    }]);
    jest.spyOn(service, 'getByID').mockImplementation(id => {
      return Promise.resolve(expected[0]);
    });
    expect(await controller.getByID(1)).toBe(expected[0]);
  })
});

*/

