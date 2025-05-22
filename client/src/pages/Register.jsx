import React, { useState } from 'react'
import { Box, Input, Stack, Typography, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { postRegister } from '../redux/auth/action';

const Register = () => {

    const dispatch = useDispatch();
    

    const init ={
        name:"",
        email:"",
        password:""
    }
    const [formData ,setFormData] = useState(init)

    const handleChange = (e)=>{
        const {name,value} = e.target;
        const payload ={
            ...formData,
            [name]:value
        }
        setFormData(payload)
    }


    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(postRegister(formData))
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
  return (
    <>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f6f8',
      }}
    >
      <Paper
        elevation={2}
        sx={{
          padding: 5,
          width: '100%',
          maxWidth: 500,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" textAlign="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
             <Input name='name' onChange={handleChange} value={formData.name} placeholder="Name" fullWidth />
            <Input name='email' onChange={handleChange} value={formData.email} placeholder="Email" type="email" fullWidth />
            <Input name='password' onChange={handleChange} value={formData.password} placeholder="Password" type="password" fullWidth />
            <Input variant="contained" type='submit' fullWidth sx={{bgcolor:"black", color:'white'}} >
              Submit
            </Input>
          </Stack>
        </form>
      </Paper>
    </Box></>
  )
}

export default Register