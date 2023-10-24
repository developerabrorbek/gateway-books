import { GenreClientService } from '@client';
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
import { RetrieveGenreListResponse } from './interfaces';
import { isUUID } from 'class-validator';
import { CreateGenreDto, UpdateGenreDto } from './dtos';
import { ApiHeader, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Genre routes')
@Controller({
  path: 'genre',
  version: '1.0',
})
export class GenreController {
  #_service: GenreClientService;

  constructor(service: GenreClientService) {
    this.#_service = service;
  }

  @ApiHeader({
    name: 'language',
    schema: {
      example: 'uz',
    },
    required: true,
  })
  @ApiOkResponse({
    isArray: true,
    schema: {
      example: {
        id: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
        name: 'Genre name',
      },
    },
  })
  @Get('/all')
  async retrieveAllGenre(
    @Headers('language') languageCode: string,
  ): Promise<RetrieveGenreListResponse[]> {
    return await this.#_service.retrieveGenreList({ languageCode });
  }

  @Post('/add')
  async createGenre(@Body() payload: CreateGenreDto): Promise<void> {
    await this.#_service.createGenre(payload);
  }

  @ApiParam({
    name: 'id',
    example: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
    description: 'Must be UUID 4',
    schema: {
      example: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
    },
    required: true,
  })
  @Patch('/edit/:id')
  async updateGenre(
    @Param('id') id: string,
    @Body() payload: UpdateGenreDto,
  ): Promise<void> {
    await this.#_checkUUID(id);
    await this.#_service.updateGenre({ id, name: payload.name });
  }

  @ApiParam({
    name: 'id',
    example: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
    description: 'Must be UUID 4',
    schema: {
      example: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
    },
    required: true,
  })
  @Delete('/delete/:id')
  async deleteGenre(@Param('id') id: string): Promise<void> {
    await this.#_checkUUID(id);
    await this.#_service.deleteGenre({ genreId: id });
  }

  async #_checkUUID(id: string): Promise<void> {
    if (!isUUID(id, 4)) {
      throw new UnprocessableEntityException(`Given ${id} id is not a UUID`);
    }
  }
}
