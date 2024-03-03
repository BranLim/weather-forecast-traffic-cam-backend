import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';

import { AppService } from '../services/app.service';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { SgLocation } from '../../Domain/SgLocation';

@Controller('/api/locations')
export class LocationController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiQuery({ name: 'datetime', example: '2023-12-20T10:40:00' })
  @ApiOkResponse({ status: 200, description: 'Location data found' })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid input' })
  async getLocation(@Query('datetime') datetime: string): Promise<SgLocation[]> {
    if (!datetime) {
      throw new HttpException('Datetime needed', HttpStatus.BAD_REQUEST);
    }
    return await this.appService.getLocation(datetime);
  }
}
