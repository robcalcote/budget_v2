import React from "react";
import { Outlet, Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Navbar() {
  const buttonStyles = {
    backgroundColor: '#6495ED',
    padding: '10 px'
  }

  const linkStyles = {
    color: '#ffffff',
    textDecoration: 'none'
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Stack direction="row" spacing={3}>
            <Typography variant="h4" color="inherit" component="div">
              Budget
            </Typography>
            <Button variant="contained" style={buttonStyles}>          
              <Link to="/transactions" style={linkStyles}>Transactions</Link>
            </Button>
            <Button variant="contained" style={buttonStyles}>
              <Link to="/months" style={linkStyles}>Months</Link>
            </Button>
            <Button variant="contained" style={buttonStyles}>
              <Link to="/categories" style={linkStyles}>Categories</Link>
            </Button>
          </Stack>  
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  )
};

export default Navbar;