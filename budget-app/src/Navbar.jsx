import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const buttonStyles = {
  backgroundColor: '#6495ED',
  padding: '10 px'
}

const linkStyles = {
  color: '#ffffff',
  textDecoration: 'none'
}

function Navbar() {

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Stack direction="row" spacing={3}>
            <Typography variant="h4" color="inherit" component="div">
              Budget
            </Typography>
              <Link to="/transactions" style={linkStyles}>
                <Button variant="contained" style={buttonStyles}>Transactions</Button>
              </Link>
              <Link to="/months" style={linkStyles}>
                <Button variant="contained" style={buttonStyles}>Months</Button>
              </Link>
              <Link to="/categories" style={linkStyles}>
                <Button variant="contained" style={buttonStyles}>Categories</Button>
              </Link>
          </Stack>  
        </Toolbar>
      </AppBar>
      <Outlet />
    </React.Fragment>
  )
};

export default Navbar;