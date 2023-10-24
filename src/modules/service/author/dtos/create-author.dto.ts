import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";
import { CreateAuthorRequest } from "../interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthorDto implements CreateAuthorRequest{
  @ApiProperty({
    type: String,
    description: "Name must be a UUID",
    example: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
    maxLength: 64,
    required: true
  })
  @IsString()
  @IsUUID(4)
  @IsNotEmpty()
  @MaxLength(64)
  name: string;
}