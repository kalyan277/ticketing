import nats, { Stan } from 'node-nats-streaming';
import { ExpirationCompleteListener } from './events/listener/expiration-complete-listener';
import { PaymentCreatedListener } from './events/listener/payment-created-listener';
import { TicketCreatedListener } from './events/listener/ticket-created-listener';
import { TicketUpdatedListener } from './events/listener/ticket-updated-listener';

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting');
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

      this.client.on('connect', () => {
         console.log('Connected to NATS');
         new TicketCreatedListener(this.client).listen();
         new TicketUpdatedListener(this.client).listen();
         new PaymentCreatedListener(this.client).listen();
         new ExpirationCompleteListener(this.client).listen();
         console.log('Connected to Listener');
      });
      this.client.on('error', (err) => {
      });
  }
}

export const natsWrapper = new NatsWrapper();
