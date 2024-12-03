import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { AwsS3Service } from 'src/aws/awsS3.service';
import { DatabaseService } from 'src/database/database.service';
import { Response } from 'express';

@Controller('pictures')
export class PicturesController {
  constructor(
    private readonly awsS3Service: AwsS3Service,
    private readonly databaseService: DatabaseService,
  ) {}

  @Get(':pictureId')
  async getPicture(
    @Param('pictureId') pictureId: string,
    @Res() res: Response,
  ) {
    // Récupérer le 'fileKey' depuis la base de données en utilisant 'pictureId'
    const picture = await this.databaseService.picture.findUnique({
      where: { pictureId },
    });

    if (!picture) {
      throw new NotFoundException('Image non trouvée');
    }

    const fileKey = picture.fileKey;

    // Obtenir le flux de l'image depuis S3
    const fileStream = await this.awsS3Service.getFileStream(fileKey);

    // Définir les en-têtes appropriés
    res.set({
      'Content-Type': 'image/webp',
      'Cache-Control': 'public, max-age=31536000, immutable',
      ETag: `"${pictureId}"`,
      'Last-Modified': new Date(picture.createdAt).toUTCString(),
    });

    // Envoyer le flux de l'image
    fileStream.pipe(res);
  }
}
