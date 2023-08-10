import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { SongsRepository } from 'src/repositories/songs.repository';
import { Song } from './entities/song.entity';

@Injectable()
export class PrismaSongsRepository implements SongsRepository {
  constructor(private prisma: PrismaService) {}

  async create(song: Song): Promise<Song> {
    const songSaved = await this.prisma.song.create({
      data: {
        ...song,
        urlsDownload: { createMany: { data: song.urlsDownload } },
      },
      include: {
        urlsDownload: { include: { version: true } },
      },
    });
    console.log(songSaved);
    return songSaved;
  }

  findAll(name: string): Promise<Song[]> {
    return this.prisma.song.findMany({
      where: { active: true, name: { contains: name, mode: 'insensitive' } },
      include: {
        urlsDownload: { include: { version: true } },
      },
    });
  }

  findBySlug(slug: string): Promise<Song> {
    return this.prisma.song.findFirstOrThrow({
      where: { slug, active: true },
      include: {
        urlsDownload: { include: { version: true } },
      },
    });
  }

  findById(id: string): Promise<Song> {
    return this.prisma.song.findFirstOrThrow({
      where: { id },
      include: {
        urlsDownload: { include: { version: true } },
      },
    });
  }

  update(id: string, song: Song): Promise<Song> {
    return this.prisma.song.update({
      data: {
        ...song,
        urlsDownload: {
          deleteMany: { id: { in: song.urlsDownload.map(({ id }) => id) } },
          createMany: { data: song.urlsDownload },
        },
      },
      where: { id },
      include: {
        urlsDownload: { include: { version: true } },
      },
    });
  }

  delete(id: string): Promise<Song> {
    const song = this.findById(id);
    return this.prisma.song.update({
      data: { ...song, active: false },
      where: { id },
      include: {
        urlsDownload: { include: { version: true } },
      },
    });
  }
}
