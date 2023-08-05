import { Test, TestingModule } from '@nestjs/testing';
import { SongRequestsService } from './song-requests.service';

describe('SongRequestsService', () => {
  let service: SongRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SongRequestsService],
    }).compile();

    service = module.get<SongRequestsService>(SongRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
