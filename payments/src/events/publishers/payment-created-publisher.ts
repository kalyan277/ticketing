import { Subjects, Publisher,PaymentCreatedEvent  } from '@ksticketingorg/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
