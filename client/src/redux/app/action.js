
import * as types from "./actionTypes";
import axios from "axios";
const  BASE_URL =  process.env.REACT_APP_API_URL
export const getBlogs = () =>(dispatch)=>{
     dispatch({type:types.GET_BLOG_REQUEST})
    return axios.get(`${BASE_URL}/blogs`)
    .then(res=>{
        
      return  dispatch({type:types.GET_BLOG_SUCCESS, payload:res.data})
    })
    .catch(err=>{
      return  dispatch({type:types.GET_BLOG_FAILURE, payload:err})
    })
}


export const userBlogs = () =>(dispatch)=>{
    dispatch({type:types.GET_USER_BLOGS_REQUEST})
    return axios.get(`${BASE_URL}/blogs/userblogs`,{withCredentials:true})
    .then(res=>{
       dispatch({type:types.GET_USER_BLOGS_SUCCESS,payload:res.data})
    })
    .catch(err=>{
      dispatch({type:types.GET_USER_BLOGS_FAILURE, payload:err})
    })
}

export const deleteUserBlogs = (id) =>(dispatch) =>{
   dispatch({type:types.DELETE_USER_BLOGS_REQUREST})
   return axios.delete(`${BASE_URL}/blogs/${id}`)
   .then(res=>{
   return dispatch({type:types.DELETE_USER_BLOGS_SUCCESS})
   })
   .catch(err=>{
    dispatch({type:types.DELETE_USER_BLOGS_FAILURE,payload:err})
   })
}

export const createBlogs = (payload) =>(dispatch)=>{
   dispatch({type:types.CREATE_USER_BLOGS_REQUREST})
  return axios.post(`${BASE_URL}/blogs/add`, payload,{withCredentials:true})
   .then(res=>{
   return dispatch({type:types.CREATE_USER_BLOGS_SUCCESS, payload:res})
   })
   .catch(err=>{
   return dispatch({type:types.CREATE_USER_BLOGS_FAILURE,payload:err})
   })
}