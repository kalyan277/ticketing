import Router  from 'next/router';
import useRequest from '../../hooks/use-request';

const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    onSuccess: (order) => Router.push(`/showorders/${order.id}`) ,
  });
  const orderRequest = async()=>{
   await doRequest({ticketId: ticket.id})
  }
  return (
    <div className="container">
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
      {errors}
      <button onClick={(ticket)=>orderRequest(ticket)} className="btn btn-primary">
        Purchase
      </button>
    </div>
  );
};

TicketShow.getInitialProps = async (context, client) => {
   const { id } = context.query;
  const { data } = await client.get(`/api/tickets/${id}`);

  return { ticket: data };
};

export default TicketShow;
