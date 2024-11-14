import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { AwsS3Service } from 'src/aws/awsS3.service';
import { DatabaseService } from 'src/database/database.service';
import { SafeUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly awsS3Service: AwsS3Service,
  ) {}

  async getUsers() {
    return await this.databaseService.user.findMany();
  }

  async getUserById(id: string): Promise<SafeUserDto> {
    const user = await this.databaseService.user.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            recipes: true,
            followers: true,
            following: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, prettier/prettier
    const { id: _, avatarFileKey, bannerFileKey, _count: { followers, following, recipes }, isAdmin, resetPasswordToken, isResettingPassword, password, ...safeUser } = user;
    return {
      ...safeUser,
      followersCount: followers,
      followingCount: following,
      recipesCount: recipes,
    };
  }

  async getUserByUsername(
    username: string,
  ): Promise<Partial<User> | undefined> {
    return await this.databaseService.user.findUnique({
      where: { username },
      omit: {
        isAdmin: true,
        resetPasswordToken: true,
        isResettingPassword: true,
        password: true,
      },
    });
  }

  async getUserByEmail(email: string): Promise<Partial<User> | undefined> {
    return await this.databaseService.user.findUnique({ where: { email } });
  }

  async getUserByResetPasswordToken(token: string): Promise<User | undefined> {
    return await this.databaseService.user.findUnique({
      where: { resetPasswordToken: token },
    });
  }

  async updateUser(
    id: string,
    updateUserDto: Prisma.UserUpdateInput,
    submittedFile?: Express.Multer.File,
    fileType?: 'avatar' | 'banner',
  ) {
    const existingUser = await this.databaseService.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const dataToUpdate = {
      ...updateUserDto,
      updatedAt: new Date(),
    };

    if (submittedFile && fileType) {
      const fileKey = await this.awsS3Service.uploadFile(submittedFile, {
        userId: id,
        fileType,
      });

      if (fileType === 'avatar') {
        dataToUpdate.avatarFileKey = fileKey;
      } else if (fileType === 'banner') {
        dataToUpdate.bannerFileKey = fileKey;
      }
    }

    return await this.databaseService.user.update({
      where: { id },
      data: {
        ...dataToUpdate,
      },
    });
  }

  async delete(id: string) {
    await this.awsS3Service.deleteFilesByUserId(id);
    return await this.databaseService.user.delete({ where: { id } });
  }
}
