import { Module } from '@nestjs/common';
import { TranslateClientService } from './translate.service';

@Module({
  exports: [TranslateClientService],
  providers: [TranslateClientService],
})
export class TranslateClientModule {}
