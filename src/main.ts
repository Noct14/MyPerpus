import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());

  // ✅ static folder (css, js, images)
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // ✅ set views folder
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // ✅ register partials
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));

  // ✅ helper
  hbs.registerHelper('eq', function (a, b) {
    return a === b;
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
