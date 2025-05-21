import * as types from "./actionTypes"


const init ={
    isLoading:false,
    isError:false,
    blogs:[]
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
        default:
            return oldState
    }
}