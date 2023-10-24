import { IsIn, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { RetrieveFilteredBookRequest } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

const statusValues = ['new', 'old', 'normal'];
type StatusType = (typeof statusValues)[number];

export class RetrieveFilteredBooksDto
  implements Omit<RetrieveFilteredBookRequest, 'languageCode'>
{
  @ApiProperty({
    type: String,
    examples: ['new', 'old', 'normal'],
  })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  @IsIn(statusValues)
  status: StatusType;

  @ApiProperty({
    type: String,
    description: 'Must be UUID 4',
    example: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
  })
  @IsOptional()
  @IsString()
  @IsUUID(4)
  @MaxLength(64)
  authorId: string;

  @ApiProperty({
    type: String,
    description: 'Must be UUID 4',
    example: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
  })
  @IsOptional()
  @IsString()
  @IsUUID(4)
  @MaxLength(64)
  genreId: string;
}
