import { Controller, Get, Param, Patch, Delete, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  async findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Patch(':userId')
  async update(@Param('userId') id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
    return this.usersService.update(id, {
      ...updateUserDto,
      updatedAt: new Date(),
    });
  }

  @Delete(':id')
  async delete(@Param('userId') id: string) {
    return this.usersService.delete(id);
  }
}

