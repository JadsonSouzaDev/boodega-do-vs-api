import { Decimal } from '@prisma/client/runtime/library';

export const SongVersionEnum: {
  [x: string]: 'playback' | 'lr' | 'multitrack';
} = {
  playback: 'playback',
  lr: 'lr',
  multitrack: 'multitrack',
};

export type SongVersionEnum =
  (typeof SongVersionEnum)[keyof typeof SongVersionEnum];

export class SongVersion {
  id: string;
  key: SongVersionEnum;
  label: string;
  price: Decimal;
}
