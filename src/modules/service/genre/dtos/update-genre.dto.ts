import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';
import { UpdateGenreRequest } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGenreDto implements Omit<UpdateGenreRequest, 'id'> {
  @ApiProperty({
    type: String,
    maxLength: 64,
    description: 'Must be UUID 4',
    example: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
    required: true,
  })
  @MaxLength(64)
  @IsString()
  @IsUUID(4)
  @IsNotEmpty()
  name: string;
}
