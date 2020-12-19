import React,{ useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import {Field,reduxForm} from 'redux-form';

function SignupComponent(props) {
    const [values, setValues] = useState({
        loading:false,
        showForm:true
    })
   const {loading}=values
   const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    onSuccess: () => Router.push('/')
  });

  const onSubmit = async formValues => {
    setValues({loading:true})
    await doRequest(formValues);
    setValues({loading:false})
   // debugger
  };


    const showLoading = ()=>(loading ? <div className="alert alert-info">Loading...</div>:'');
    const showError = ()=>(errors ? <div className="alert alert-danger">{errors}</div>:'');

    const signupForm=()=>{
        return(
            <form onSubmit={props.handleSubmit(onSubmit)} >
                 <Field name ="email" component = {renderInput} label ="Enter Email" className="form-control" type="text"/>
                <Field name ="password" label="Enter Password" component = {renderInput} className="form-control" type="password"/>
                <div className="text-center">
                    <button className="btn btn-primary">Sign up</button>
                </div>
            </form>
        )
    }
    return (
        <React.Fragment>
       <h2 className="text-center pt-4 pb-4">Signup Page</h2> 
         <div className="row">
            <div className="col-md-6 offset-md-3">
            {showError()}
            {showLoading()}
            {signupForm()}
            </div>     
        </div> 
        </React.Fragment>
        
    )
}
 const validate = (formValue)=>{
        const errors={};
        if(!formValue.email){
            errors.email= 'Email Is Complusory'
        }
            if(!formValue.password){
            errors.password= 'Password Is Complusory'
        }
        return errors;
    }

    const renderInput=({input,label,className,meta,type})=>{
        return (
            <div className="field form-group">
                <label>{label}</label>
                <input{...input} className={className} type={type} autoComplete="off" />
            {meta.touched && meta.error &&(
            <div className="form-label">
                <div style={{color:"red"}}>{meta.error}</div>
            </div>
            )}
            </div>
        )    }

export default reduxForm({
    form:'signup',
    validate
})(SignupComponent);