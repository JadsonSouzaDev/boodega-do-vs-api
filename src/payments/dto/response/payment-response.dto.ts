import { Payment } from 'src/payments/entities/payment.entity';

export class PaymentResponseDto {
  constructor(payment: Payment) {
    this.id = payment?.id;
  }

  id: string;
}
