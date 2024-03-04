import {
  Controller,
  Get,
  Headers,
  Param,
  Query,
  HttpException,
  BadRequestException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

import { FormService } from "./form.service";
import { Message } from "./enums/message.enum";
import { PaginatedResponse } from "./types/paginated-response.type";

@Controller("api/forms")
export class FormController {
  constructor(
    private readonly configService: ConfigService,
    private readonly formService: FormService,
  ) {}

  @Get(":formId/filteredResponses")
  async filterSubmissions(
    @Headers("Authorization") Authorization,
    @Param("formId") formId: string,
    @Query() { filters, ...query },
  ) {
    const { baseURL } = this.configService.get("bridge");

    try {
      const { data } = await axios.get<PaginatedResponse>(
        `forms/${formId}/submissions`,
        {
          baseURL,
          headers: { Authorization },
          params: query,
        },
      );

      try {
        const filteredSubmissions = this.formService.filterSubmissions(
          data.responses,
          JSON.parse(filters || null),
        );

        return {
          responses: filteredSubmissions,
          pageCount: data.pageCount,
          totalResponses: data.totalResponses,
        };
      } catch (err) {
        throw new BadRequestException(Message.InvalidFilters);
      }
    } catch (err) {
      const { statusCode, message } = err.response.data || err.response;
      throw new HttpException(message, statusCode);
    }
  }
}
