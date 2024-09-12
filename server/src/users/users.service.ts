import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return await this.databaseService.user.findMany();
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.databaseService.user.findUnique({ where: { email } });
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
