import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  IsUUID,
  IsIn,
  Contains,
} from 'class-validator';
import { UpdateBookRequest } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';


const  statusValues = ['new' , 'old' , 'normal'];
type StatusType = typeof statusValues[number];


export class UpdateBookDto implements Omit<UpdateBookRequest, 'id'> {
  @ApiProperty({
    type: String,
    required: false,
    description: 'Must be UUID 4',
    example: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
    nullable: true,
  })
  @IsString()
  @IsUUID(4)
  @IsOptional()
  @MaxLength(64)
  title?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Must be UUID 4',
    example: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
    nullable: true,
  })
  @IsString()
  @IsUUID(4)
  @IsOptional()
  @MaxLength(64)
  description?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Must be UUID 4',
    example: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
    nullable: true,
  })
  @IsString()
  @IsUUID(4)
  @IsOptional()
  @MaxLength(64)
  language?: string;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'Must be positive integer',
    example: 150000,
    nullable: true,
  })
  @IsInt()
  @IsOptional()
  @IsPositive()
  price?: number;

  @ApiProperty({
    type: String,
    required: false,
    example: '2023',
    maxLength: 4,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  @MaxLength(4)
  year?: string;

  @ApiProperty({
    type: String,
    required: false,
    examples: ['new', 'old', 'normal'],
    nullable: true,
  })
  @IsIn(statusValues)
  @IsString()
  @IsOptional()
  @MaxLength(64)
  status?: StatusType;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Must be Base64...',
    example: 'Base64 format...',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  @Contains(';base64')
  image?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Must be UUID 4',
    example: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
    nullable: true,
  })
  @IsString()
  @IsUUID(4)
  @IsOptional()
  @MaxLength(64)
  authorId?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Must be UUID 4',
    example: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
    nullable: true,
  })
  @IsString()
  @IsUUID(4)
  @IsOptional()
  @MaxLength(64)
  genreId?: string;
}
