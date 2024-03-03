import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';
import { AppService } from '../services/app.service';

describe('AppController', () => {
  let appController: LocationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [AppService],
    }).compile();

    appController = app.get<LocationController>(LocationController);
  });

  describe('root', () => {

  });
});
