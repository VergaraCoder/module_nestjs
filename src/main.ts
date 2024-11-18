import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { FilterError } from './common/errors/filter/exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { SeederRole } from './common/db/seeder/seeder.role';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new FilterError());

  const dataSource= app.get(DataSource);
  const seederRole= new SeederRole();

  await seederRole.run(dataSource);

  
  const config = new DocumentBuilder()
    .setTitle('Reservations Rooms')
    .setDescription('This API is build to reserver rooms for work with your team work')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);
}
bootstrap();
