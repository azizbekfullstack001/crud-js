import React,{useState,useEffect} from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form'
import axios from 'axios';
function SignUp(props) {
    const {register,handleSubmit} = useForm()
const navigate = useNavigate()
    function mySubmit(data){
    console.log(data);
if(data.password===data.repeatPassword){
    axios({
        url:"http://localhost:3020/users",
        method:"POST",
        data
    }).then((res)=>{
        console.log(res.data);
navigate('/login')
    })
}else{
    alert("password yoki repeatPassword bir emas")
}

    }
    return (
        <div className='container '>
         <div className='card w-50 m-auto'>
            <div className='card-header bg-dark text-white text-center'>
<h1>Sign Up</h1>
            </div>
            <div className="card-body">
<form id='form-group1' onSubmit={handleSubmit(mySubmit)}>
    <input {...register("firstname")} className='form-control mx-2 ' type="text" placeholder='lastname..' />
    <input {...register("lastname")} className='form-control my-3 mx-2' type="text" placeholder='firstname..' />
    <input {...register("age")} className='form-control my-3 mx-2' type="number" placeholder='age..' />
    <input {...register("email")}  className='form-control mx-2' type="text" placeholder='email..' />
    <input {...register("phoneNumber")}  className='form-control my-3 mx-2' type="number" placeholder='phoneNumber..' />
    <input {...register("password")} className='form-control mx-2' type="password" placeholder='password..' />
    <input {...register("repeatPassword")} className='form-control my-3 mx-2' type="password" placeholder='repeat password..' />
</form>
            </div>
            <div className="card-footer">
                <Link to={'/login'}>login page!</Link>
                <br />
                <hr />
                <button form='form-group1' className='btn btn-success'>SignUp</button>
            </div>

         </div>
        </div>
    );
}

export default SignUp;