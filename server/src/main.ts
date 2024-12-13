import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./secrets/localhost-key.pem'),
    cert: fs.readFileSync('./secrets/localhost-cert.pem'),
  };
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
  });
  app.use(cookieParser());
  app.enableCors({ origin: process.env.CLIENT_URL, credentials: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Supprimer les champs non définis dans le DTO
      transform: true, // Convertir les champs en types appropriés
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Homemade Server')
    .setDescription('Homemade Server API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
