import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route,Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import PageNotFound from './pages/PageNotFount/PageNotFount'
import Admin from './pages/Admin/Admin'
function App(props) {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/pagenotfound' element={<PageNotFound/>}/>
                <Route path='/admin' element={<Admin/>}/>
            </Routes>
        </div>
    );
}

export default App;