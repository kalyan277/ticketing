import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

const OrderShow = ({ order, currentUser }) => {
const [timeLeft, setTimeLeft] = useState(0);

const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    onSuccess: () => Router.push('/')
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  return (
    <div className="container">
      Time left to pay: {timeLeft} seconds
      <StripeCheckout
        token={({ id }) => doRequest({ token: id,orderId: order.id })}
        stripeKey="pk_test_51H6Hr3GnkpG2FVvjrdYkVwsbMUTjrcM9aFLIxGzj5MJ3OBMy8UcTe01bhTjksoicc7cQifBkeeKKYbtPep7c9D4G00UTIVvOz2"
        amount={order.ticket.price * 100}
        email={currentUser.email}
        currency="INR"
        billingAddress={false}
      />
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { id } = context.query;
  const { data } = await client.get(`/api/orders/${id}`);

  return { order: data };
};

export default OrderShow;


