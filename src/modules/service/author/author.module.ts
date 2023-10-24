import { Module } from "@nestjs/common";
import { AuthorController } from "./author.controller";
import { AuthorClientService } from "@client";

@Module({
  providers: [AuthorClientService],
  controllers: [AuthorController]
})
export class AuthorModule {}