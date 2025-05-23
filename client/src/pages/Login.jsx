import React, { useState } from 'react';
import { Box, Input, Stack, Typography, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { postLogin } from '../redux/auth/action';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const dispatch  = useDispatch();
    const navigate = useNavigate()
    const init ={
        email:"",
        password:""
    }

    const [formData ,setFromData] = useState(init)

    const handleChange = (e)=>{
        const {name,value} = e.target;
        const payload = {
            ...formData,
            [name]:value
        }
        setFromData(payload)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(postLogin(formData))
        .then(res=>{
          console.log(res)

          console.log("status",res?.paload)

          const user = {
            id: res?.payload?.id,
            name: res?.payload?.name,
            email: res?.payload?.email,
          };
          
          localStorage.setItem("user", JSON.stringify(user));
          

           if(res?.payload?.status === 200){
             navigate("/")
           }
        })
        .catch(err=>{
            console.log(err)
        })
    }


    



  return (
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
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Input name='email' value={formData.email} onChange={handleChange} placeholder="Email" type="email" fullWidth />
            <Input name='password' value={formData.password} onChange={handleChange} placeholder="Password" type="password" fullWidth />
            <Input variant="contained" type='submit' fullWidth sx={{bgcolor:"black", color:'white'}}>
              Submit
            </Input>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
