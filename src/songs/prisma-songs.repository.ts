import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { SongsRepository } from 'src/repositories/songs.repository';
import { Prisma, Song } from '@prisma/client';
import { SongWithUrls } from './entities/song.entity';

@Injectable()
export class PrismaSongsRepository implements SongsRepository {
  constructor(private prisma: PrismaService) {}

  create(song: Prisma.SongCreateInput): Promise<Song> {
    return this.prisma.song.create({
      data: song,
    });
  }

  findAll(name: string): Promise<Song[]> {
    return this.prisma.song.findMany({
      where: { active: true, name: { contains: name, mode: 'insensitive' } },
    });
  }

  findBySlug(slug: string): Promise<Song> {
    return this.prisma.song.findFirstOrThrow({
      where: { slug, active: true },
    });
  }

  findById(id: string): Promise<Song> {
    return this.prisma.song.findFirstOrThrow({
      where: { id },
    });
  }

  async findByIdWithUrls(id: string): Promise<SongWithUrls> {
    return this.prisma.song.findFirstOrThrow({
      where: { id },
      select: {
        id: true,
        active: true,
        name: true,
        createdAt: true,
        duration: true,
        slug: true,
        style: true,
        tonality: true,
        updatedAt: true,
        youtubeCode: true,
        urlsDownload: { select: { id: true, url: true, version: true } },
      },
    });
  }

  update(id: string, song: Prisma.SongUpdateInput): Promise<Song> {
    return this.prisma.song.update({
      data: song,
      where: { id },
    });
  }

  delete(id: string): Promise<Song> {
    const song = this.findById(id);
    return this.prisma.song.update({
      data: { ...song, active: false },
      where: { id },
    });
  }

  // Exclude keys from user
  exclude<Song, Key extends keyof Song>(
    song: Song,
    keys: string[],
  ): Omit<Song, Key> {
    return Object.fromEntries(
      Object.entries(song).filter(([key]) => !keys.includes(key)),
    ) as Song;
  }
}
