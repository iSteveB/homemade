import { S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

const AWS_REGION = process.env.AWS_REGION;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

@Injectable()
export class AwsService {
  private readonly s3Client: S3Client;
  constructor() {
    const s3Client = new S3Client({
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_KEY,
      },
      region: AWS_REGION,
    });

    this.s3Client = s3Client;
  }
}
