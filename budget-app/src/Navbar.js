import React from "react";
import { Outlet, Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

function Navbar() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Budget
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu" sx={{ mr: 5 }}>
            <ArrowDropDownIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  )
};

export default Navbar;