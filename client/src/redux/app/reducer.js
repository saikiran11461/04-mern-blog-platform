//reducer js

import * as types from "./actionTypes"


const init ={
    isLoading:false,
    isError:false,
    blogs:[],
    userBlogs:[],
   
}

export const reducer = (oldState=init,action) =>{
    const {type,payload} = action;

    switch(type){
        case types.GET_BLOG_REQUEST:
            return{
                ...oldState,
                isLoading:true,
                isError:false,
                blogs:[]
            }
        case types.GET_BLOG_SUCCESS:
            return{
                ...oldState,
                isLoading:false,
                isError:false,
                blogs:payload
            }
        case types.GET_BLOG_FAILURE:
            return{
                ...oldState,
                isLoading:false,
                isError:true,
                blogs:[]
            }
        case types.GET_USER_BLOGS_REQUEST:
            return{
                ...oldState,
                isLoading:true,
                isError:false,
                userBlogs:[]
            }
        case types.GET_USER_BLOGS_SUCCESS:
            return{
                ...oldState,
                isLoading:true,
                isError:false,
                userBlogs:payload,
               
            }
        case types.GET_USER_BLOGS_FAILURE:
            return{
                ...oldState,
                isLoading:false,
                isError:true,
                userBlogs:payload,
                
            }
        
        default:
            return oldState
    }
}
