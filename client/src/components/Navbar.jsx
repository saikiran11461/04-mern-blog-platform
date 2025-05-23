import React, {  useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogOut } from "../redux/auth/action";



const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const isAuth = useSelector((state) => state.authReducer.isAuth);
  console.log("Navbar - isAuth:", isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () =>{
    dispatch(userLogOut())
    navigate("/login");
    window.location.reload();
  }

 

  return (
    <AppBar position="static" sx={{ bgcolor: "black", mb: "30px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        
          <Link to={"/"}>
            {" "}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AdbIcon sx={{ color: "white", mr: 1 }} />
              <Typography variant="h6" sx={{ color: "white" }}>
                Blogs
              </Typography>
            </Box>
          </Link>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isAuth && (
              <Box>
                <Link to={"/write"}>
                  <Button sx={{ bgcolor: "white", color: "black", mr: 1 }}>
                    write a blog
                  </Button>
                </Link>

                <Link to={"/"}>
                  <Button sx={{ bgcolor: "white", color: "black", mr: 1 }}>
                    Dashboard
                  </Button>
                </Link>

                <Link>
                  <Button onClick={handleLogout}  sx={{ bgcolor: "white", color: "black", mr: 1 }}>
                    logout
                  </Button>
                </Link>
              </Box>
            )}

            {!isAuth && (
              <Box>
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
              </Box>
            )}

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
              <Link to={"/profile"}>
                {" "}
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </Link>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
