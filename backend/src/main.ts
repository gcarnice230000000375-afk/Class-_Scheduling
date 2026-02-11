import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Enable global validation
    app.useGlobalPipes(new ValidationPipe());

    // Use cookie parser
    app.use(cookieParser());
    const curdate = new Date();

    // CORS configuration
    const whiteList = ['http://localhost:8080', 'http://localhost:5173'];
    app.enableCors({
      origin: (origin, callback) => {
        if (!origin || whiteList.includes(origin)) {
          callback(null, true);
          console.log(
            'allowed cors for: ',
            origin + ' Date: ' + curdate.toString().substring(0, 24),
          );
        } else {
          callback(new Error('Not allowed by CORS'));
          console.log(
            'blocked cors for: ',
            origin + ' Date: ' + curdate.toString().substring(0, 24),
          );
        }
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

    // Listen on environment port or fallback to 8000
    const port = process.env.PORT || 8000;
    await app.listen(port);

    console.log(`Application is running on: http://localhost:${port}`);
  } catch (error) {
    console.error('Error starting application:', error);
    process.exit(1);
  }
}

bootstrap();
