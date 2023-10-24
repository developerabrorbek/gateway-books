import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ClientTCP } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import {
  CreateAuthorRequest,
  DeleteAuthorInterface,
  RetrieveAuthorListRequest,
  RetrieveAuthorListResponse,
  UpdateAuthorRequest,
} from './interfaces';
import { CMD } from './enums';

@Injectable()
export class AuthorClientService implements OnModuleInit, OnModuleDestroy {
  readonly #_client: ClientProxy;

  constructor(config: ConfigService) {
    this.#_client = new ClientTCP({
      host: config.getOrThrow<string>('service.host') ?? '127.0.0.1',
      port: config.getOrThrow<number>('service.port') ?? 3001,
    });
  }

  async retrieveAuthorList(
    payload: RetrieveAuthorListRequest,
  ): Promise<RetrieveAuthorListResponse[]> {
    return await this.#_request<
      RetrieveAuthorListRequest,
      RetrieveAuthorListResponse[]
    >(CMD.RETRIEVE_AUTHOR_LIST, { languageCode: payload.languageCode });
  }

  async createAuthor(payload: CreateAuthorRequest): Promise<void> {
    await this.#_request<CreateAuthorRequest, void>(CMD.CREATE_AUTHOR, payload);
  }

  async updateAuthor(payload: UpdateAuthorRequest): Promise<void> {
    await this.#_request<UpdateAuthorRequest, void>(CMD.UPDATE_AUTHOR, payload);
  }
  
  async deleteAuthor(payload: DeleteAuthorInterface): Promise<void> {
    await this.#_request<DeleteAuthorInterface, void>(
      CMD.DELETE_AUTHOR,
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
    )
  }
}
