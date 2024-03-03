import { Controller, Get, Query } from '@nestjs/common';

import { AppService } from '../services/app.service';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('/api/locations')
export class LocationController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ status: 200, description: 'Location data found' })
  async getLocation(@Query() datetime: string): Promise<{}> {
    return await this.appService.getLocation(datetime);
  }
}
