import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/LibraryBooks";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "black" , mb:"30px"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Left: Logo + Title */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AdbIcon sx={{ color: "white", mr: 1 }} />
            <Typography variant="h6" sx={{ color: "white" }}>
              Blogs
            </Typography>
          </Box>

        
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to={"/"}>
              <Button sx={{ bgcolor: "white", color: "black", mr: 1 }}>
                Dashboard
              </Button>
            </Link>
            <Link to={"/login"}>
              <Button sx={{ bgcolor: "white", color: "black", mr: 1 }}>
                Login
              </Button>
            </Link>
            <Link to={"/register"}>
              <Button sx={{ bgcolor: "white", color: "black", mr: 1 }}>
                Register
              </Button>
            </Link>
            <IconButton
              size="large"
              onClick={handleMenu}
              color="inherit"
              sx={{ ml: 1 }}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
               <Link to={"/profile"}> <MenuItem onClick={handleClose}>Profile</MenuItem></Link>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
