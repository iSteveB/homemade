import { Controller, Get, Param, Patch, Delete, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Get(':id')
  async getUserbyId(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Get(':email')
  async getUserbyEmail(@Param('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

// @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    return this.usersService.updateUser(id, {
      ...updateUserDto,
      updatedAt: new Date(),
    });
  }

  @Delete(':id')

  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
