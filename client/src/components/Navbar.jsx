import React from "react";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import AdbIcon from "@mui/icons-material/LibraryBooks";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "black" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ color:"white", mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              href="www.google.com"
              sx={{
                color: { sx: "red", md: "white", sm: "blue" },
              }}
            >
             Blogs 
            </Typography>

            <Box sx={{ml:'auto'}}>
                <Link to={"/"}><Button sx={{bgcolor:"white", color:'black',mr:"10px"}}>Dashboard</Button></Link>
               <Link to={"/login"}> <Button sx={{bgcolor:"white", color:'black',mr:"10px"}}>Login In</Button></Link>
                <Link to={"/register"}><Button sx={{bgcolor:"white", color:'black'}}>Register</Button></Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
