import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as path from 'path';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import * as expressBasicAuth from 'express-basic-auth';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // schema 적용
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(
    ['/api/docs', '/api/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    prefix: '/media',
  });

  const config = new DocumentBuilder()
    .setTitle('SeSAC api document')
    .setDescription('sesac api server 명세 입니다.')
    .setVersion('1.0.0')
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  app.enableCors({
    // 개발할 때만 (origin에 특정 url만 작성!!)
    origin: true,
    credentials: true,
  });
  const { PORT } = process.env;
  await app.listen(PORT);
}
bootstrap();
