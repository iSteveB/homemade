import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUsers() {
    return await this.databaseService.user.findMany();
  }

  async getUserById(id: string): Promise<User | undefined> {
    return await this.databaseService.user.findUnique({
      where: { id },
    });
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return await this.databaseService.user.findUnique({ where: { username } });
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.databaseService.user.findUnique({ where: { email } });
  }

  async updateUser(id: string, updateUserDto: Prisma.UserUpdateInput) {
    return await this.databaseService.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        updatedAt: new Date(),
      },
    });
  }

  async delete(id: string) {
    return await this.databaseService.user.delete({ where: { id } });
  }
}
