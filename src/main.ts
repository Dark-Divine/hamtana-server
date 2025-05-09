import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger } from '@nestjs/common';
import { ServerResponse } from 'http';

async function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Hamtana API')
    .setDescription('')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {});

  app.use('/api-doc', (_, res: ServerResponse) =>
    res.end(JSON.stringify(document)),
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['verbose', 'error', 'warn'],
  });

  await setupSwagger(app);

  app.enableCors({
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    origin: '*',
  });

  try {
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
    Logger.verbose(`Server Running on http://localhost:${PORT}`, 'BOOTSTRAP');
  } catch (err) {
    Logger.error(`START SERVER FAILED ERROR: ${JSON.stringify(err)}`);
  }
}

void bootstrap();
