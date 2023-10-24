import { Module } from '@nestjs/common';
import { BookClientService } from './book.service';

@Module({
  exports: [BookClientService],
  providers: [BookClientService],
})
export class BookClientModule {}
