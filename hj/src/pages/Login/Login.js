import React,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
function Login(props) {
    const [user,setUser] = useState({
      email:"",
      password:""
    })
    const navigate = useNavigate()
  function LoginPage(){
    axios({
        url:"http://localhost:3020/users?email="+user.email,
        method:'get'
    }).then((res)=>{
      let userOne =res.data[0]
         if(userOne.password===user.password){
            localStorage.setItem("token",userOne.id)
            navigate('/admin')
         }else{
            alert("email yoki parol xato")
         }
    })
  }
    return (
        <div>
            <div className='card w-50 m-auto'>
            <div className='card-header bg-dark text-white text-center'>
               <h1>Login</h1>
            </div>
            <div className="card-body">
             <input onChange={(e)=>setUser({...user,email:e.target.value})} className='form-control mx-2 ' type="text" placeholder='email..' />
              <input onChange={(e)=>setUser({...user,password:e.target.value})}  className='form-control my-3 mx-2' type="text" placeholder='password..' />

            </div>
            <div className="card-footer">
                <Link to={'/signup'}>create your account!</Link>
                <br />
                <hr />
                <button onClick={LoginPage} form='form-group1' className='btn btn-success'>Login</button>
            </div>

         </div>
        </div>
    );
}

export default Login;