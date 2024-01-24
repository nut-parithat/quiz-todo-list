import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipe/validation.pipe';
import { SwaggerModule } from '@nestjs/swagger';
import { AppSwagger } from './common/swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // NOTE validation
  app.useGlobalPipes(new ValidationPipe());
  // NOTE init swagger
  const document = SwaggerModule.createDocument(app, AppSwagger);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}

bootstrap();
