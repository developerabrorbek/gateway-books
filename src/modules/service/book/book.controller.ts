import { BookClientService } from '@client';
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
  HttpCode,
  Query,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import {
  RetrieveBookListResponse,
  RetrieveFilteredBooksResponse,
  RetrieveSearchedBooksResponse,
  RetrieveSingleBookResponse,
} from './interfaces';
import { CreateBookDto, RetrieveFilteredBooksDto, UpdateBookDto } from './dtos';
import {
  ApiHeader,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Book routes')
@Controller({
  path: 'book',
  version: '1.0',
})
export class BookController {
  #_service: BookClientService;

  constructor(service: BookClientService) {
    this.#_service = service;
  }

  @ApiHeader({
    name: 'language',
    required: true,
    example: 'uz',
    schema: {
      type: 'uz',
      example: 'uz',
    },
  })
  @ApiOkResponse({
    isArray: true,
    status: 200,
    schema: {
      example: {
        id: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
        title: 'title',
        description: 'string',
        status: 'string',
        language: 'string',
        price: 15000,
        year: '2023',
        image: 'image link',
        genreId: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
        authorId: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
      },
    },
  })
  @Get('/all')
  async retrieveBookList(
    @Headers('language') languageCode: string,
  ): Promise<RetrieveBookListResponse[]> {
    return await this.#_service.retrieveBookList({ languageCode });
  }

  @ApiQuery({
    name: 'search',
    type: String,
  })
  @ApiHeader({
    name: 'language',
    required: true,
    example: 'uz',
    schema: {
      type: 'uz',
      example: 'uz',
    },
  })
  @ApiOkResponse({
    isArray: true,
    status: 200,
    schema: {
      example: {
        id: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
        title: 'title',
        description: 'string',
        status: 'string',
        language: 'string',
        price: 15000,
        year: '2023',
        image: 'image link',
        genreId: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
        authorId: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
      },
    },
  })
  @Get('/')
  async retrieveSearchedBooks(
    @Headers('language') languageCode: string,
    @Query('search') text: string,
  ): Promise<RetrieveSearchedBooksResponse[]> {
    return await this.#_service.retrieveSearchedBooks({ languageCode, text });
  }

  @ApiHeader({
    name: 'language',
    required: true,
    example: 'uz',
    schema: {
      type: 'uz',
      example: 'uz',
    },
  })
  @Post('/filter')
  async retrieveFilteredBooks(
    @Headers('language') languageCode: string,
    @Body() payload: RetrieveFilteredBooksDto,
  ): Promise<RetrieveFilteredBooksResponse[]> {
    return await this.#_service.retrieveFilteredBooks({
      languageCode,
      authorId: payload.authorId,
      genreId: payload.genreId,
      status: payload.status,
    });
  }

  @ApiParam({
    name: 'id',
    schema: {
      example: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
    },
    required: true,
    description: 'Must be UUID 4',
  })
  @ApiHeader({
    name: 'language',
    required: true,
    example: 'uz',
    schema: {
      type: 'uz',
      example: 'uz',
    },
  })
  @Get('/single/:id')
  async retrieveSingleBook(
    @Headers('language') languageCode: string,
    @Param('id') id: string,
  ): Promise<RetrieveSingleBookResponse> {
    await this.#_checkUUID(id);
    return await this.#_service.retrieveSingleBook({
      languageCode,
      bookId: id,
    });
  }

  @HttpCode(201)
  @Post('/add')
  async createBook(@Body() payload: CreateBookDto): Promise<void> {
    await this.#_service.createBook(payload);
  }

  @ApiParam({
    name: 'id',
    schema: {
      example: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
    },
    required: true,
    description: 'Must be UUID 4',
  })
  @Patch('/edit/:id')
  async updateBook(
    @Body() payload: UpdateBookDto,
    @Param('id') id: string,
  ): Promise<void> {
    await this.#_checkUUID(id);
    await this.#_service.updateBook({
      ...payload,
      id,
    });
  }

  @ApiParam({
    name: 'id',
    schema: {
      example: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
    },
    required: true,
    description: 'Must be UUID 4',
  })
  @Delete('/delete/:id')
  async deleteBook(@Param('id') id: string): Promise<void> {
    await this.#_checkUUID(id);
    await this.#_service.deleteBook({ bookId: id });
  }

  async #_checkUUID(id: string): Promise<void> {
    if (!isUUID(id, 4)) {
      throw new UnprocessableEntityException(`Given ${id} id is not a UUID`);
    }
  }
}
