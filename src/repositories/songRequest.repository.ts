
import { SongRequest } from "src/song-requests/entities/song-request.entity";

export abstract class SongRequestsRepository {
    abstract create(song: SongRequest): Promise<SongRequest>;
    abstract findAll(): Promise<SongRequest[]>
    abstract findById(id: string): Promise<SongRequest>
    abstract update(id: string, song: SongRequest): Promise<SongRequest>;
    abstract delete(id: string): Promise<SongRequest>
}