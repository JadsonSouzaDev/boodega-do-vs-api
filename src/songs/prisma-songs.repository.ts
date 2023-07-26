import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { SongsRepository } from 'src/repositories/songs.repository';
import { Prisma, Song } from '@prisma/client';

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
      where: { active: true, name: { contains: name } },
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
}
