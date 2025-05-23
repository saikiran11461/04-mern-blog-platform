import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserBlogs, userBlogs } from '../redux/app/action';
import BlogComopnent from '../components/BlogComopnent';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const store = useSelector(state=>state.appReducer.userBlogs.userBlogs);
    // console.log(store)
    const authId = useSelector(state=>state.authReducer.user.id)
    // console.log("store",store)

    useEffect(()=>{
        dispatch(userBlogs())
        .then(res=>{
            console.log("res",res)
        })
        .catch(err=>{
            console.log(err)
        })
    },[dispatch])


 
      const deleteHandler =(id)=>{
        dispatch(deleteUserBlogs(id))
        .then(res=>{
          console.log(res)
          dispatch(userBlogs())
        })
        .catch(err=>{
          console.log(err)
        })
      }
     


  return (
    <>
         {
        store?.length > 0 && store.map((item)=>(
          <BlogComopnent 
            key={item._id}
            id={item._id}
            author={item.author}
            title={item.title}
            content={item.content}
            isPublished={item.isPublished}
            tags={item.tags}
            comments={item.comments}
            views={item.views}
            createdAt={item.createdAt}
            authId={authId}
            showActions={true}
            deleteHandler={deleteHandler}
          />
         
        ))
        }
    </>
  )
}

export default ProfilePage