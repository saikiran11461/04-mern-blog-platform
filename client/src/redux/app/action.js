
import * as types from "./actionTypes";
import axios from "axios";

export const getBlogs = () =>(dispatch)=>{
     dispatch({type:types.GET_BLOG_REQUEST})
    return axios.get("http://localhost:4567/blogs/")
    .then(res=>{
        
      return  dispatch({type:types.GET_BLOG_SUCCESS, payload:res.data})
    })
    .catch(err=>{
        dispatch({type:types.GET_BLOG_FAILURE, payload:err})
    })
}