import { Test, TestingModule } from '@nestjs/testing';
import { SongVersionsController } from './song-versions.controller';
import { SongVersionsService } from './song-versions.service';

describe('SongVersionsController', () => {
  let controller: SongVersionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongVersionsController],
      providers: [SongVersionsService],
    }).compile();

    controller = module.get<SongVersionsController>(SongVersionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
