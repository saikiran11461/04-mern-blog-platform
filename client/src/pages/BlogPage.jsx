import React, { useEffect } from 'react'
import {Box} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import BlogComopnent from '../components/BlogComopnent'
import { getBlogs } from '../redux/app/action'
const BlogPage = () => {

  const dispatch = useDispatch()
  const store = useSelector(state=>state.appReducer.blogs.blogs);
  const authId = useSelector(state=>state.authReducer.user.id)
  // console.log("store")


  useEffect(()=>{
      dispatch(getBlogs())
      .then(res=>{
        console.log(res)
      })
      .catch(err=>{
        console.log(err)
      })
  },[dispatch])



  return (
    
    <>
    <Box>
      {
        store && store.map((item)=>(
          <BlogComopnent 
            key={item._id}
            author={item.author}
            title={item.title}
            content={item.content}
            isPublished={item.isPublished}
            tags={item.tags}
            comments={item.comments}
            views={item.views}
            createdAt={item.createdAt}
            authId={authId}
            showActions={false}

          />
        ))
      }
    </Box>
  
    </>
  )
}

export default BlogPage