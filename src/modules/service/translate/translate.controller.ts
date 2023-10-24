import { TranslateClientService } from "@client";
import { RetrieveUnUsedTranslateListResponse } from "./interfaces";
import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Translate API")
@Controller({
  path: 'translate',
  version: '1.0'
})
export class TranslateController {
  #_service: TranslateClientService

  constructor(service: TranslateClientService){
    this.#_service = service
  }

  @Get("/unused")
  @ApiResponse({
    isArray: true,
    status: 200,
    description: 'Unused translate list response',
    schema: {
      example: {
        id: "ad78969d-e8b0-484f-b7ea-a0864cc533e7",
        code: "translate_create_code",
        type: 'content'
      }
    }
  })
  async retrieveUnUsedTranslateList(): Promise<RetrieveUnUsedTranslateListResponse[]>{
    return await this.#_service.retrieveUnUsedTranslateList()
  }
}