//action js
import * as types from "./actionTypes";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL; 

console.log("action url",BASE_URL)
export const postRegister = (paload) =>(dispatch)=>{
    dispatch({type:types.POST_REGISTER_REQUEST})
    return axios.post(`${BASE_URL}/users/register`,paload)
    .then(res=>{
       return dispatch({type:types.POST_REGISTER_SUCCESS,payload:res.data})
    })
    .catch(err=>{
      return  dispatch({type:types.POST_REGISTER_FAILURE})
    })
}


export const postLogin = (paload) =>(dispatch)=>{
    dispatch({type:types.POST_LOGIN_REQUEST})
    return axios.post(`${BASE_URL}/users/login`,paload,{withCredentials:true})
    .then(res=>{
       return dispatch({type:types.POST_LOGIN_SUCCESS,payload:res})
    })
    .catch(err=>{
      return  dispatch({type:types.POST_LOGIN_FAILURE,payload:err})
    })
}


export const userLogOut =()=>(dispatch)=>{
    dispatch({type:types.POST_LOGOUT_REQUEST})
    return axios.get(`${BASE_URL}/users/logout`)
    .then(res=>{
      localStorage.removeItem("user"); 
    return  dispatch({type:types.POST_LOGOUT_SUCCESS, payload:res})
    })
    .catch(err=>{
     return dispatch({type:types.POST_LOGOUT_FAILURE})
    })
}
