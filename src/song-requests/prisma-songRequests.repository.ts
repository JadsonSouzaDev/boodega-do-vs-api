import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { SongRequestsRepository } from 'src/repositories/songRequest.repository';
import { SongRequest } from '@prisma/client';

@Injectable()
export class PrismaSongRequestsRepository implements SongRequestsRepository {
  constructor(private prisma: PrismaService) {}

  create(request: SongRequest): Promise<SongRequest> {
    return this.prisma.songRequest.create({
      data: request,
    });
  }

  findAll(): Promise<SongRequest[]> {
    return this.prisma.songRequest.findMany();
  }

  findById(id: string): Promise<SongRequest> {
    return this.prisma.songRequest.findFirstOrThrow({
      where: { id },
    });
  }

  update(id: string, request: SongRequest): Promise<SongRequest> {
    return this.prisma.songRequest.update({
      data: request,
      where: { id },
    });
  }

  delete(id: string): Promise<SongRequest> {
    return this.prisma.songRequest.delete({
      where: { id },
    });
  }
}
