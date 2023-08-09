import { Decimal } from "@prisma/client/runtime/library";

export type SongVersionEnum = 'playback' | 'lr' | 'multitrack';

export class SongVersion {
  id: string;
  key: SongVersionEnum;
  label: string;
  price: Decimal;
}
