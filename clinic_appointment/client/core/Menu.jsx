import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import auth from '../signin/auth-helper'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from './../assets/images/tensoftwarelogo.png';

const isActive = (...paths) => {
  return paths.some((path) => location.pathname === path) ? { textDecorationLine: 'underline', } : { color: '#ffffff' };
};

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static" style={{ backgroundColor: '#948BFC' }}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <IconButton aria-label="Home" style={isActive(location, "/")}>
            <img src={logo} alt="Ten Software Logo" style={{ width: '130px', height: '55px', color: '#ffffff' }} />
          </IconButton>
        </Link>
        {
          !auth.isAuthenticated() && (<span>
            {/* Links to show when not signed in */}
          </span>)
        }
        {
          auth.isAuthenticated() && (<span>
            {/* Links to show when signed in */}
            <Link to="/appointments">
              <Button style={isActive(location, "/appointments")}>My Appointments
              </Button>
            </Link>
            <Link to="/book-appointment">
              <Button style={isActive(location, "/book-appointment")}>Book Appointment
              </Button>
            </Link>
            <Button color="inherit" onClick={() => {
              auth.clearJWT(() => navigate('/'));
            }}>Sign out</Button>
          </span>)
        }
      </Toolbar>
    </AppBar>
  );
}
