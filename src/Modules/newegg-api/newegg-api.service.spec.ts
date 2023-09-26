import { Test, TestingModule } from '@nestjs/testing';
import { NeweggApiService } from './newegg-api.service';

describe('NeweggApiService', () => {
  let service: NeweggApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NeweggApiService],
    }).compile();

    service = module.get<NeweggApiService>(NeweggApiService);
  });

  it('should be defined', () => {
    expect(service.getRecomProducts()).toBeCalled();
  });
});
