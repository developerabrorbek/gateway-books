import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";
import { UpdateAuthorRequest } from "../interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAuthorDto implements UpdateAuthorRequest{
  @ApiProperty({
    type: String,
    description: "Name must be a UUID 4",
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