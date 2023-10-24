import { Module } from "@nestjs/common";
import { TranslateController } from "./translate.controller";
import { TranslateClientService } from "@client";

@Module({
  controllers: [TranslateController],
  providers: [TranslateClientService]
})
export class TranslateModule {}