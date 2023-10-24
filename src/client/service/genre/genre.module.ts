import { Module } from '@nestjs/common';
import { GenreClientService } from './genre.service';

@Module({
  exports: [GenreClientService],
  providers: [GenreClientService],
})
export class GenreClientModule {}
