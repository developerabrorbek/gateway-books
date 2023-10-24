import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  IsIn,
  Contains,
} from 'class-validator';
import { CreateBookRequest } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

const statusValues = ['new', 'old', 'normal'];
type StatusType = (typeof statusValues)[number];

export class CreateBookDto implements CreateBookRequest {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Must be UUID 4',
    example: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
  })
  @IsString()
  @IsUUID(4)
  @IsNotEmpty()
  @MaxLength(64)
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Must be UUID 4',
    example: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
  })
  @IsString()
  @IsUUID(4)
  @IsNotEmpty()
  @MaxLength(64)
  description: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Must be UUID 4',
    example: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
  })
  @IsString()
  @IsUUID(4)
  @IsNotEmpty()
  @MaxLength(64)
  language: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'Must be positive integer',
    example: 150000,
  })
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @ApiProperty({
    type: String,
    required: true,
    example: '2023',
    maxLength: 4,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(4)
  year: string;

  @ApiProperty({
    type: String,
    required: true,
    examples: ['new', 'old', 'normal'],
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  @IsIn(statusValues)
  status: StatusType;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Image Base64 format',
  })
  @Contains(';base64')
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Must be UUID 4',
    example: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
  })
  @IsString()
  @IsUUID(4)
  @IsNotEmpty()
  @MaxLength(64)
  authorId: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Must be UUID 4',
    example: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
  })
  @IsString()
  @IsUUID(4)
  @IsNotEmpty()
  @MaxLength(64)
  genreId: string;
}

