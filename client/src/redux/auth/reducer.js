//reducer js
import * as types from "./actionTypes"

const user = JSON.parse(localStorage.getItem("user") || "null");

const init = {
    isLoading: false,
    isError: false,
    isAuth: !!user,
    user: user || {},
  };
  


export const reducer = (oldState = init, action) =>{
    const {type, payload} = action;
    switch(type){
        case types.POST_REGISTER_REQUEST:
          return{
            ...oldState,
            isLoading:true,
            isError:false,
            isAuth:false
          }
        case types.POST_REGISTER_SUCCESS:
            return{
                ...oldState,
                isLoading:false,
                isError:false,
                isAuth:payload
            }
        case types.POST_REGISTER_FAILURE:
            return{
                isLoading:false,
                isError:true,
                isAuth:false
            }
            case types.POST_LOGIN_REQUEST:
                return{
                  ...oldState,
                  isLoading:true,
                  isError:false,
                  isAuth:false
                }
              case types.POST_LOGIN_SUCCESS:
                  return{
                      ...oldState,
                      isLoading:false,
                      isError:false,
                      isAuth:true,
                      user:payload
                  }
              case types.POST_LOGIN_FAILURE:
                  return{
                      isLoading:false,
                      isError:true,
                      isAuth:false
                  }
        
        default:
            return oldState
       
    }
}
