import React,{useState} from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';
const NewTickets =()=>{
    const [title,setTitle]=useState('');
    const [price,setPrice]=useState();
    const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    onSuccess: () => Router.push('/')
  });

  const onSubmit = async(e) => {
      e.preventDefault();
      await doRequest({title,price});
   // debugger
  };
    const onBlur = () =>{
        const value =parseFloat(price);
        if(isNaN(value)){
            return;
        }
        setPrice(value.toFixed(2));

    }
return(
    <div className="container">
        <h1>Created A Ticket</h1>
        {errors}
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input className="form-control" value={title} onChange={(e)=> setTitle(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Price</label>
                <input className="form-control" 
                value={price}
                onBlur={onBlur}
                onChange={(e)=> setPrice(e.target.value)}/>
            </div>
            <button className="btn-primary btn">Submit</button>
        </form>
    </div>
)
}

export default NewTickets;
