import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return await this.databaseService.user.findMany();
  }

  async findOne(username: string) {
    return await this.databaseService.user.findUnique({ where: { username } });
  }

  async create(createUserDto: Prisma.UserCreateInput) {
    return await this.databaseService.user.create({ data: createUserDto });
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    return await this.databaseService.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        updatedAt: new Date(),
        avatarFileKey: '',
      },
    });
  }

  async delete(id: string) {
    return await this.databaseService.user.delete({ where: { id } });
  }
}
