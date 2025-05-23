import React from 'react'
import {Routes, Route} from "react-router-dom";
import Dashboard from '../pages/Dashboard';
import Register  from "../pages/Register";
import Login from '../pages/Login';
import ProfilePage from '../pages/ProfilePage';
import PrivateRoute from "../Private/PrivateRoute"
import WriteBlog from '../pages/WriteBlog';
const AllRoutes = () => {
  return (
    <Routes >
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<PrivateRoute><ProfilePage/></PrivateRoute>} />
        <Route path='/write' element={<PrivateRoute><WriteBlog/></PrivateRoute>} />
    </Routes>
  )
}

export default AllRoutes