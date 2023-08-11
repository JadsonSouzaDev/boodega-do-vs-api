export const PaymentStatus: {
  [x: string]: 'PENDING' | 'REFUSED' | 'APPROVED';
} = {
  PENDING: 'PENDING',
  REFUSED: 'REFUSED',
  APPROVED: 'APPROVED',
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export class Payment {
  id: string;
  status: PaymentStatus;
}
