import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { SongsRepository } from 'src/repositories/songs.repository';
import { Song } from './entities/song.entity';

@Injectable()
export class PrismaSongsRepository implements SongsRepository {
  constructor(private prisma: PrismaService) {}

  include = {
    urlsDownload: { include: { version: true } },
  };

  async create(song: Song): Promise<Song> {
    const songSaved = await this.prisma.song.create({
      data: {
        ...song,
        urlsDownload: { createMany: { data: song.urlsDownload } },
      },
      include: this.include,
    });
    return songSaved;
  }

  findAll(name: string): Promise<Song[]> {
    return this.prisma.song.findMany({
      where: { active: true, name: { contains: name, mode: 'insensitive' } },
      include: this.include,
    });
  }

  findBySlug(slug: string): Promise<Song> {
    return this.prisma.song.findFirstOrThrow({
      where: { slug, active: true },
      include: this.include,
    });
  }

  findById(id: string): Promise<Song> {
    return this.prisma.song.findFirstOrThrow({
      where: { id },
      include: this.include,
    });
  }

  update(id: string, song: Song): Promise<Song> {
    return this.prisma.song.update({
      data: {
        ...song,
        urlsDownload: {
          deleteMany: {
            id: { in: song.urlsDownload.map(({ id }) => id ?? '') },
          },
          createMany: {
            data: song.urlsDownload,
            skipDuplicates: true,
          },
        },
      },
      where: { id },
      include: this.include,
    });
  }

  delete(id: string): Promise<Song> {
    const song = this.findById(id);
    return this.prisma.song.update({
      data: { ...song, active: false },
      where: { id },
      include: this.include,
    });
  }
}
