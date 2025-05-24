import { Box, Button, Card, TextField, Typography,FormControl,InputLabel,Select,MenuItem, Chip  } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlogs } from "../redux/app/action";
import FullScreenLoader from "../components/FullScreenLoader";
import { useNavigate } from "react-router-dom";

const WriteBlog = () => {
  const categories = ['Technology', 'Lifestyle', 'Education', 'Travel'];
  const navigate = useNavigate()
  const [loading ,setLoading] = useState(false)
  const init={
    title:"",
    content:"",
    tags:[],
    category:'',
    published:true
  }

  const [formData,setFormData] = useState(init);
  const [tagInput ,setTagInput] = useState("");
  const [coverImage ,setCoverImage] = useState("")

  const dispatch = useDispatch()

  const handleChange = (e) =>{
    const {name,value} = e.target
    setFormData(prev=>({
      ...prev,
      [name]:value
    }))
  }


  const handleTags = () =>{
    if (tagInput.trim() === "") return;
    setFormData((prev)=>({
      ...prev,
      tags:[...prev.tags , tagInput]
    }));
    setTagInput("");
   
  }  

  const handleDeleteTags = (tagToRemove)=>{
      setFormData((prev)=>({
        ...prev,
        tags: prev.tags.filter((tag) => tag !== tagToRemove),
       
      }))
  }

  const handleFileChange = (e)=>{
    setCoverImage(e.target.files[0]);
  }


  const handleSubmit =(e) =>{
    e.preventDefault();

    setLoading(true)

    const data = new FormData();


   data.append("title", formData.title);
   data.append("category", formData.category);
   data.append("content",formData.content);
   data.append("tags", JSON.stringify(formData.tags));
   data.append("coverImage", coverImage);

  //  console.log("data",data)

  // for (let pair of data.entries()) {
  //   if (pair[1] instanceof File) {
  //     console.log(`${pair[0]}: ${pair[1].name}`);
  //   } else {
  //     console.log(`${pair[0]}: ${pair[1]}`);
  //   }
  // }
  
     dispatch(createBlogs(data))
     .then(res=>{
      if(res?.payload?.status === 201){
        navigate("/")
      }
     })
    .catch(err=>{
      console.log(err)
    })
    .finally(() => {
      setLoading(false); 
    });

  }




  return (
    <>
     
      {
          loading && <FullScreenLoader/>
      }
      <Card sx={{ width: "50%", margin: "auto" ,boxSizing:"border-box", padding:"40px 40px"}}>
        <Typography variant="h4">Create New Blog</Typography>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <TextField
            label="Title"
            placeholder="enter the title"
            fullWidth
            required
            margin="normal"
            onChange={handleChange}
            value={formData.title}
            name="title"
          />

          <TextField
            label="Content"
            fullWidth
            required
            multiline
            rows={6}
            margin="normal"
            onChange={handleChange}
            value={formData.content}
            name="content"
          />

<Box sx={{display:"flex", alignItems:"center"}}>
<Button
          variant="outlined"
          component="label"
          
          sx={{ mt: 2, textAlign:'left' }}
        >
          Upload Cover Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>

       <Box>
       {coverImage && (
          <Typography mt={1} variant="body2">
            Selected file: {coverImage.name}
          </Typography>
        )}
       </Box>
</Box>
        

        <Box sx={{display:"flex" , }} >
          <TextField
          label="Tags"
          placeholder="enter the title"
          variant="outlined"
          onChange={(e)=>setTagInput(e.target.value)}
          value={tagInput}
          name="tags"
          margin="normal"
          />
          <Button onClick={handleTags} sx={{padding:"12px 30px",  variant:"outlined"}}>Add Tag</Button>
        </Box>
        <Box display="flex" gap={1} mt={1} flexWrap="wrap">
          {
            formData?.tags?.map(tag=>(
              <Chip
              key={tag}
              label={tag}
              onDelete={()=>handleDeleteTags(tag)}
              />
            ))
          }
        </Box>

        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            onChange={handleChange}
            label="Category"
          >
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
          Submit Blog
        </Button>
        </form>
      </Card>
    </>
  );
};

export default WriteBlog;
