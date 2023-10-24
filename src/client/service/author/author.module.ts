import { Module } from '@nestjs/common';
import { AuthorClientService } from './author.service';

@Module({
  exports: [AuthorClientService],
  providers: [AuthorClientService],
})
export class AuthorClientModule {}
