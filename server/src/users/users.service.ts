import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', role: 'USER', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Doe', role: 'ADMIN', email: 'jane.doe@example.com' },
    { id: 3, name: 'Jim Doe', role: 'GUEST', email: 'jim.doe@example.com' },
    { id: 4, name: 'Sally Doe', role: 'USER', email: 'sally.doe@example.com' },
    { id: 5, name: 'Bob Doe', role: 'ADMIN', email: 'bob.doe@example.com' },
    { id: 6, name: 'Tim Doe', role: 'GUEST', email: 'tim.doe@example.com' },
    { id: 7, name: 'Linda Doe', role: 'USER', email: 'linda.doe@example.com' },
    { id: 8, name: 'Frank Doe', role: 'ADMIN', email: 'frank.doe@example.com' },
    { id: 9, name: 'Karen Doe', role: 'GUEST', email: 'karen.doe@example.com' },
    { id: 10, name: 'Dave Doe', role: 'USER', email: 'dave.doe@example.com' },
    { id: 11, name: 'Pat Doe', role: 'ADMIN', email: 'pat.doe@example.com' },
    { id: 12, name: 'Joe Doe', role: 'GUEST', email: 'joe.doe@example.com' },
  ];

  findAll(role?: CreateUserDto['role']) {
    if (role) {
      const users = this.users.filter((user) => user.role === role);
      if (users.length === 0) {
        throw new NotFoundException(`Users with role ${role} not found`);
      }
      return users;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  create(user: CreateUserDto) {
    const userHighestId = Math.max(...this.users.map((user) => user.id));
    const newUser = { ...user, id: userHighestId + 1 };
    this.users.push(newUser);

    return newUser;
  }

  update(id: number, userUpdate: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...userUpdate };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const deletedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);

    return deletedUser;
  }
}
