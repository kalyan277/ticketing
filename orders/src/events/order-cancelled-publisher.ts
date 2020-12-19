import { Subjects, Publisher, OrderCancelledEvent } from '@ksticketingorg/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
