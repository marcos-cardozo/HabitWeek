import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${process.env.PORT}`);
  console.log(`Database URL: ${process.env.DATABASE_URL}`);
}
void bootstrap();
