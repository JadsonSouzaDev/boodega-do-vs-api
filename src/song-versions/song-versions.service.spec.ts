import { Test, TestingModule } from '@nestjs/testing';
import { SongVersionsService } from './song-versions.service';

describe('SongVersionsService', () => {
  let service: SongVersionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SongVersionsService],
    }).compile();

    service = module.get<SongVersionsService>(SongVersionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
