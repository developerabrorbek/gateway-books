import {
  AuthorClientModule,
  BookClientModule,
  GenreClientModule,
} from '@client';
import { serviceConfig } from '@config';
import { AuthorModule, BookModule, GenreModule, TranslateModule } from '@modules';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [serviceConfig],
    }),
    AuthorClientModule,
    AuthorModule,
    BookClientModule,
    BookModule,
    GenreClientModule,
    GenreModule,
    TranslateModule,
  ],
})
export class AppModule {}
