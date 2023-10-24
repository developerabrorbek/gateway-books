import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ClientTCP } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { CMD } from './enums';
import {
  CreateBookRequest,
  DeleteBookRequest,
  RetrieveBookListRequest,
  RetrieveBookListResponse,
  RetrieveFilteredBookRequest,
  RetrieveFilteredBooksResponse,
  RetrieveSearchedBooksRequest,
  RetrieveSearchedBooksResponse,
  RetrieveSingleBookRequest,
  RetrieveSingleBookResponse,
  UpdateBookRequest,
} from './interfaces';

@Injectable()
export class BookClientService implements OnModuleInit, OnModuleDestroy {
  readonly #_client: ClientProxy;

  constructor(config: ConfigService) {
    this.#_client = new ClientTCP({
      host: config.getOrThrow<string>('service.host') ?? '127.0.0.1',
      port: config.getOrThrow<number>('service.port') ?? 3001,
    });
  }

  async retrieveBookList(
    payload: RetrieveBookListRequest,
  ): Promise<RetrieveBookListResponse[]> {
    return await this.#_request<
      RetrieveBookListRequest,
      RetrieveBookListResponse[]
    >(CMD.RETRIEVE_BOOK_LIST, { languageCode: payload.languageCode });
  }

  async retrieveSearchedBooks(
    payload: RetrieveSearchedBooksRequest,
  ): Promise<RetrieveSearchedBooksResponse[]> {
    return await this.#_request<
      RetrieveSearchedBooksRequest,
      RetrieveSearchedBooksResponse[]
    >(CMD.RETRIEVE_SEARCHED_BOOK, {
      languageCode: payload.languageCode,
      text: payload.text,
    });
  }

  async retrieveFilteredBooks(
    payload: RetrieveFilteredBookRequest,
  ): Promise<RetrieveFilteredBooksResponse[]> {
    return await this.#_request<
      RetrieveFilteredBookRequest,
      RetrieveFilteredBooksResponse[]
    >(CMD.RETRIEVE_FILTERED_BOOK, {
      languageCode: payload.languageCode,
      authorId: payload.authorId,
      genreId: payload.genreId,
      status: payload.status,
    });
  }

  async retrieveSingleBook(
    payload: RetrieveSingleBookRequest,
  ): Promise<RetrieveSingleBookResponse> {
    return await this.#_request<
      RetrieveSingleBookRequest,
      RetrieveSingleBookResponse
    >(CMD.RETRIEVE_BOOK, {
      languageCode: payload.languageCode,
      bookId: payload.bookId,
    });
  }

  async createBook(payload: CreateBookRequest): Promise<void> {
    await this.#_request<CreateBookRequest, void>(
      CMD.CREATE_BOOK,
      payload,
    ).catch((err): unknown => err.message);
  }

  async updateBook(payload: UpdateBookRequest): Promise<void> {
    await this.#_request<UpdateBookRequest, void>(CMD.UPDATE_BOOK, payload);
  }

  async deleteBook(payload: DeleteBookRequest): Promise<void> {
    await this.#_request<DeleteBookRequest, void>(CMD.DELETE_BOOK, payload);
  }

  async onModuleInit() {
    await this.#_client.connect();
  }

  async onModuleDestroy() {
    await this.#_client.close();
  }

  async #_request<TRequest = any, TResponse = any | void>(
    pattern: string,
    payload: TRequest,
  ): Promise<TResponse> {
    return firstValueFrom<TResponse>(
      await this.#_client
        .send<TResponse, TRequest>(pattern, payload)
        .pipe(timeout(5000)),
    );
  }
}
