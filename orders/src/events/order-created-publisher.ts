import { Publisher,Subjects,OrderCreatedEvent } from "@ksticketingorg/common";


export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
