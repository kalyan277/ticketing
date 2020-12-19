import { Subjects, Publisher, ExpirationCompleteEvent } from '@ksticketingorg/common';

export class ExpirationCompletePublish extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
