import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { UploadFileOptionsDto } from 'src/aws/dto/uploadFile.dto';
import { generateFileKey } from 'utils/fileUtils';
import { convertToWebP } from 'utils/imageConverter';

const AWS_REGION = process.env.AWS_REGION;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

@Injectable()
export class AwsS3Service {
  private readonly s3Client: S3Client;
  constructor() {
    if (!AWS_REGION || !AWS_SECRET_KEY || !AWS_ACCESS_KEY_ID) {
      throw new Error('AWS credentials not found');
    }
    const s3Client = new S3Client({
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_KEY,
      },
      region: AWS_REGION,
    });

    this.s3Client = s3Client;
  }

  async uploadFile(file: Express.Multer.File, options: UploadFileOptionsDto) {
    const { userId, recipeId, fileType } = options;

    const convertedBuffer = await convertToWebP(file.buffer);
    const fileName = file.originalname.split('.')[0];
    const extension = '.webp';

    const { fileKey } = generateFileKey({
      userId,
      recipeId,
      fileType,
      originalFileName: fileName + extension,
    });

    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
      Body: convertedBuffer,
      ContentType: 'image/webp',
      CacheControl: 'max-age=31536000',
    });

    const result = await this.s3Client.send(putObjectCommand);

    if (result.$metadata.httpStatusCode !== 200) {
      throw new Error(`Failed to upload file to S3. Error : ${result}`);
    }

    return fileKey;
  }

  async deleteFile({ fileKey }: { fileKey: string }) {
    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
    });

    const result = await this.s3Client.send(deleteObjectCommand);

    if (result.$metadata.httpStatusCode !== 200) {
      throw new Error(`Failed to upload file to S3. Error : ${result}`);
    }

    return { message: 'Files deleted successfully', error: false };
  }

  async deleteFilesByUserId(userId: string) {
    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `users/${userId}`,
    });

    const result = await this.s3Client.send(deleteObjectCommand);

    if (result.$metadata.httpStatusCode !== 200) {
      throw new Error(`Failed to upload file to S3. Error : ${result}`);
    }

    return { message: 'Files deleted successfully', error: false };
  }

  async getFileStream(fileKey: string): Promise<NodeJS.ReadableStream> {
    const getObjectCommand = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
    });

    try {
      const response = await this.s3Client.send(getObjectCommand);
      return response.Body as NodeJS.ReadableStream;
    } catch (error) {
      throw new Error(
        `Impossible de récupérer le fichier depuis S3 : ${error.message}`,
      );
    }
  }
}
