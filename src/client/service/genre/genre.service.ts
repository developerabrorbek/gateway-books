import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ClientTCP } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { CMD } from './enums';
import { CreateGenreRequest, DeleteGenreRequest, RetrieveGenreListRequest, RetrieveGenreListResponse, UpdateGenreRequest } from './interfaces';

@Injectable()
export class GenreClientService implements OnModuleInit, OnModuleDestroy {
  readonly #_client: ClientProxy;

  constructor(config: ConfigService) {
    this.#_client = new ClientTCP({
      host: config.getOrThrow<string>('service.host') ?? '127.0.0.1',
      port: config.getOrThrow<number>('service.port') ?? 3001,
    });
  }

  async retrieveGenreList(
    payload: RetrieveGenreListRequest,
  ): Promise<RetrieveGenreListResponse[]> {
    return await this.#_request<
    RetrieveGenreListRequest,
      RetrieveGenreListResponse[]
    >(CMD.RETRIEVE_GENRE_LIST, { languageCode: payload.languageCode });
  }

  async createGenre(payload: CreateGenreRequest): Promise<void> {
    await this.#_request<CreateGenreRequest, void>(CMD.CREATE_GENRE, payload);
  }

  async updateGenre(payload: UpdateGenreRequest): Promise<void> {
    await this.#_request<UpdateGenreRequest, void>(CMD.UPDATE_GENRE, payload);
  }
  
  async deleteGenre(payload: DeleteGenreRequest): Promise<void> {
    await this.#_request<DeleteGenreRequest, void>(
      CMD.DELETE_GENRE,
      payload,
    );
  }

  async onModuleInit() {
    await this.#_client.connect();
  }

  async onModuleDestroy() {
    await this.#_client.close();
  }

  async #_request<TRequest = any, TResponse = any>(
    pattern: string,
    payload: TRequest,
  ): Promise<TResponse> {
    return firstValueFrom<TResponse>(
      await this.#_client.send<TResponse, TRequest>(pattern, payload).pipe(timeout(5000)),
    );
  }
}
