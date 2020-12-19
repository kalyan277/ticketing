import { Publisher,Subjects,TicketUpdatedEvent } from "@ksticketingorg/common";


export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
