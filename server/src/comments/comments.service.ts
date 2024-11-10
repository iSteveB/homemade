import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CommentsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCommentDto: Prisma.CommentCreateInput) {
    return this.databaseService.comment.create({
      data: { ...createCommentDto },
    });
  }

  async findAllByRecipe(recipeId?: string) {
    if (!recipeId) {
      return this.databaseService.comment.findMany();
    }
    return this.databaseService.comment.findMany({ where: { recipeId } });
  }

  async findOne(id: string) {
    return this.databaseService.comment.findUnique({ where: { id } });
  }

  async update(id: string, updateCommentDto: Prisma.CommentUpdateInput) {
    return this.databaseService.comment.update({
      where: { id },
      data: { ...updateCommentDto },
    });
  }

  async delete(id: string) {
    return this.databaseService.comment.delete({ where: { id } });
  }
}
