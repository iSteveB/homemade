import {
  Controller,
  Get,
  Request,
  Param,
  Patch,
  Delete,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Res,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { Express, Response } from 'express';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/jwt.strategy';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsS3Service } from 'src/aws/awsS3.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly awsS3Service: AwsS3Service,
  ) {}

  @Get(':id')
  async getUserbyId(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Get(':username/avatar')
  async getUserAvatar(
    @Param('username') username: string,
    @Res() response: Response,
  ) {
    const user = await this.usersService.getUserByUsername(username);

    if (!user || !user.avatarFileKey) {
      // Gérer le cas où l'utilisateur n'existe pas ou n'a pas d'avatar
      throw new NotFoundException('User or avatar not found');
    }

    // Récupérer le fileKey depuis l'utilisateur
    const fileKey = user.avatarFileKey;

    // Récupérer le fichier depuis S3
    const fileStream = await this.awsS3Service.getFileStream(fileKey);

    // Définir les en-têtes appropriés
    response.set({
      'Content-Type': 'image/webp',
      'Cache-Control': 'max-age=36000', // Ajustez la durée de mise en cache si nécessaire
    });

    // Envoyer le fichier au client
    fileStream.pipe(response);
  }

  @Get(':username/banner')
  async getUserBanner(
    @Param('username') username: string,
    @Res() response: Response,
  ) {
    const user = await this.usersService.getUserByUsername(username);

    if (!user || !user.bannerFileKey) {
      throw new NotFoundException('User or banner not found');
    }

    const fileKey = user.bannerFileKey;

    const fileStream = await this.awsS3Service.getFileStream(fileKey);

    response.set({
      'Content-Type': 'image/webp',
      'Cache-Control': 'max-age=36000',
    });

    fileStream.pipe(response);
  }

  @Get(':username')
  async getUserbyUsername(@Param('username') username: string) {
    return this.usersService.getUserByUsername(username);
  }

  @Get(':email')
  async getUserbyEmail(@Param('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Patch()
  async updateUser(
    @Request() request: RequestWithUser,
    @Body()
    updateUserDto: Prisma.UserUpdateInput,
    @Query('fileType') fileType: 'avatar' | 'banner' | undefined,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const id = request.user.id;
    const submittedFile = file;
    return this.usersService.updateUser(
      id,
      {
        ...updateUserDto,
        updatedAt: new Date(),
      },
      submittedFile,
      fileType,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Request() request: RequestWithUser) {
    const id = request.user.id;
    return this.usersService.delete(id);
  }
}
