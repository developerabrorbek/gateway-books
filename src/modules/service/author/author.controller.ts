import { AuthorClientService } from '@client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { RetrieveAuthorListResponse } from './interfaces';
import { CreateAuthorDto, UpdateAuthorDto } from './dtos';
import { isUUID } from 'class-validator';
import { ApiHeader, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Author routes")
@Controller({
  path: '/author',
  version: '1.0',
})
export class AuthorController {
  #_service: AuthorClientService;

  constructor(service: AuthorClientService) {
    this.#_service = service;
  }

  @ApiHeader({
    name: 'language',
    required: true,
    description: "Language code must be given",
    example: 'en',
  })
  @ApiResponse({
    isArray: true,
    status: 200,
    schema: {
      example: {
        id: 'id',
        name: 'author name'
      }
    }
  })
  @Get('/all')
  async retrieveAuthorList(
    @Headers('language') languageCode: string,
  ): Promise<RetrieveAuthorListResponse[]> {
    return await this.#_service.retrieveAuthorList({ languageCode });
  }

  @Post('/add')
  async createAuthor(@Body() payload: CreateAuthorDto): Promise<void> {
    await this.#_service.createAuthor(payload);
  }

  
  @ApiParam({
    name: 'id',
    example: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
    description: 'Id must be UUID 4',
    required: true
  })
  @Patch('/edit/:id')
  async updateAuthor(
    @Body() payload: UpdateAuthorDto,
    @Param('id') id: string,
  ): Promise<void> {
    await this.#_checkUUID(id);
    await this.#_service.updateAuthor({
      ...payload,
      id,
    });
  }

  @ApiParam({
    name: 'id',
    example: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
    description: 'Id must be UUID 4',
    required: true
  })
  @Delete('/delete/:id')
  async deleteAuthor(@Param('id') id: string): Promise<void> {
    await this.#_checkUUID(id);
    await this.#_service.deleteAuthor({ authorId: id });
  }

  async #_checkUUID(id: string): Promise<void> {
    if (!isUUID(id, 4)) {
      throw new UnprocessableEntityException(`Given ${id} id is not a UUID`);
    }
  }
}
