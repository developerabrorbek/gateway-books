import { Module } from "@nestjs/common";
import { GenreController } from "./genre.controller";
import { GenreClientService } from "@client";

@Module({
  providers: [GenreClientService],
  controllers: [GenreController],
})
export class GenreModule {}