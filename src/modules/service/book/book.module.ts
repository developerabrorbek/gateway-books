import { Module } from "@nestjs/common";
import { BookController } from "./book.controller";
import { BookClientService } from "@client";

@Module({
  providers: [BookClientService],
  controllers: [BookController]
})
export class BookModule {}

