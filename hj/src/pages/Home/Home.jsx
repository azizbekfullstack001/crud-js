import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function Home(props) {
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        getPosts()
        
            },[])

    function getPosts(){
        axios({
            url:"http://localhost:3020/posts",
            method:"get",
          
        }).then((res)=>{
           setPosts(res.data)
        })
    }
    return (
        <div>
            <h1>Home</h1>
            <Link to={'/signup'}><button className='btn btn-info'>SignUp</button></Link>
            <table className="table">
    <thead className="table-warning">
        <tr>
            <th>id</th>
            <th>name</th>
            <th>adress</th>
            <th>gender</th>
        </tr>
    </thead>
    <tbody>
{
    posts.map((item,index)=>{
        return <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.adress}</td>
            <td><input type="checkbox" checked={item.gender} /></td>
        </tr>
    })
}
    </tbody>
</table>
        </div>
    );
}

export default Home;