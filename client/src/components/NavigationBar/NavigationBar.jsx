import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import { logout } from '../../services/sessionService';
import AuthContext from '../../store/auth-context';
import "./NavigationBar.scss";
// const NavigationBar = () => {

//   const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);

//   const onLogoutClick = () => {
//     setIsLoggedIn(false);
//     logout();
//   }


// //   return (
//     <nav className='navigation'>
//       <Link to="/">Home</Link>
//       <Link to="/map">Our Location</Link>
//       {!isLoggedIn && <Link to="/login">Login</Link>} 
//       {isLoggedIn && <Link to="/login" onClick={onLogoutClick}>Logout</Link>}
//     </nav>
//   )
// }

// export default NavigationBar


import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
 logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

function NavigationBar() {
  const classes = useStyles();
  const {user} = useContext(AppContext);
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedin;

  const onLogoutClick = () => {
    isLoggedIn = false;
    logout();
  }

  

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo} >
        <Link to="/" className={classes.logo}>
              Home
            </Link>
        </Typography>
          <div className={classes.navlinks}>
           
            <Link to="/map" className={classes.link}>
              map
            </Link>
            { isLoggedIn && user?.isAdmin && <Link to="/posts" className={classes.link}>
              Posts
            </Link>}
            { isLoggedIn && <Link to="/myPosts" className={classes.link}>
              My posts
            </Link>}
            { isLoggedIn&& user?.isAdmin && <Link to="/statistics" className={classes.link}>
            Statistics
            </Link>} 
            {isLoggedIn && <Link to="/posts/new" className={classes.link}>New Post</Link>}

            { isLoggedIn && <Link to="/tags" className={classes.link}>
              tags
            </Link>}
            {!isLoggedIn &&<Link to="/login" className={classes.link}>
              login
            </Link>}
            {isLoggedIn && <Link to="/login"  className={classes.link} onClick={onLogoutClick}>Logout</Link>}
            {isLoggedIn && <Link to="/profile" className={classes.link}>Profile</Link>}
            <Link to="/faq" className={classes.link}>
              FAQ
            </Link>
          </div>
      </Toolbar>
    </AppBar>
  );
}
export default NavigationBar;