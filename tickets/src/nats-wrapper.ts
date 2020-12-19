import nats, { Stan } from 'node-nats-streaming';
import { OrderCancelledListener } from './events/listener/order-cancelled-listener';
import { OrderCreatedListener } from './events/listener/order-created-listener';

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
        console.log('Connected to NATS tickets');
         new OrderCancelledListener(this.client).listen();
         new OrderCreatedListener(this.client).listen();
         console.log('Connected to Listener tickets');
      });
      this.client.on('error', (err) => {
      });
  
  }
}

export const natsWrapper = new NatsWrapper();
