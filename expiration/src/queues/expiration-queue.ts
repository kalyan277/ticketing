import Queue from 'bull';
import { ExpirationCompletePublish } from '../events/publisher/expiration-complete-publisher';
import { natsWrapper } from '../nats-wrapper';

interface Payload {
  orderId: string | undefined;
  version?: number;
}

const expirationQueue = new Queue<Payload>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job) => {
 // console.log(job);
  new ExpirationCompletePublish(natsWrapper.client).publish({
    orderId: job.data.orderId,
    version:job.data.version
  })
});

export { expirationQueue };
