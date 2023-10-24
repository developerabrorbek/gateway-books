import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ClientTCP } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { CMD } from './enums';
import { RetrieveUnUsedTranslateListResponse } from './interfaces';

@Injectable()
export class TranslateClientService implements OnModuleInit, OnModuleDestroy {
  readonly #_client: ClientProxy;

  constructor(config: ConfigService) {
    this.#_client = new ClientTCP({
      host: config.getOrThrow<string>('service.host') ?? '127.0.0.1',
      port: config.getOrThrow<number>('service.port') ?? 3001,
    });
  }

  async retrieveUnUsedTranslateList(): Promise<RetrieveUnUsedTranslateListResponse[]> {
    return await this.#_request<
      '',
      RetrieveUnUsedTranslateListResponse[]
    >(CMD.RETRIEVE_UNUSED_TRANSLATE_LIST, '');
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
