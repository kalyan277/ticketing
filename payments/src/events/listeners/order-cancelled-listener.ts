import {
  OrderCancelledEvent,
  Subjects,
  Listener,
  OrderStatus,
} from '@ksticketingorg/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    
    try {
    //console.log(data);
    const order = await Order.findOne({
      _id: data.id
    });
   //console.log(order);

    if (!order) {
      throw new Error('Order not found');
    }

    order.set({ status: OrderStatus.Cancelled });
    try {
       await order.save();
       msg.ack();
    } catch (error) {
      console.error(error);
    }
      
    } catch (error) {
        console.error(error);
    }
  
}
}
