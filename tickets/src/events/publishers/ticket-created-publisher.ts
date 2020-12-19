import { Publisher,Subjects,TicketCreatedEvent } from "@ksticketingorg/common";


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
