import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import SettingsIcon from '@material-ui/icons/Settings'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import StarIcon from '@material-ui/icons/Star'
import { useSelector, useDispatch } from 'react-redux';
import Cookies from "js-cookie";
import { logoutUser } from '../../store/actions'
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

export default function BottomAppBar() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user);

  const handleClick = () => {
    Cookies.remove('token');
    dispatch(logoutUser())
  }

  const [state, setState] = React.useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    console.log("heya")
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const classes = useStyles();


  const listLogin = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]:  anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button component={Link} to={`/profile/${user.id}`}>
          <ListItemIcon> <AccountCircleIcon /></ListItemIcon>
          <ListItemText primary={"Profile"} />
        </ListItem>

        <ListItem  button component={Link} to="/" >
          <ListItemIcon> <SettingsIcon /></ListItemIcon>
          <ListItemText primary={"Paramètre Compte"} />
        </ListItem>

        <ListItem  button component={Link} to="/" >
          <ListItemIcon> <RestaurantIcon /></ListItemIcon>
          <ListItemText primary={"Mes plats"} />
        </ListItem>

      </List>

      <Divider />
      <List>
          <ListItem  button component={Link} to="/" onClick={(e) => handleClick()}>
            <ListItemIcon > <ExitToAppIcon /></ListItemIcon>
            <ListItemText primary={"Se Déconnecter"} />
          </ListItem>
      </List>
    </div>
  );

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]:  anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

      <List >
          <ListItem  button component={Link} to="/signin">
            <ListItemIcon> <AccountCircleIcon /></ListItemIcon>
            <ListItemText primary={"Se Connecter"}/>
          </ListItem>


          <ListItem  button component={Link} to="/signup" >
            <ListItemIcon > <ExitToAppIcon /></ListItemIcon>
            <ListItemText primary={"S'inscrire"} />
          </ListItem>

      </List>
    </div>
  );

  return (
    
    <React.Fragment>
      <SwipeableDrawer
            anchor={'bottom'}
            open={state['bottom']}
            onClose={toggleDrawer('bottom', false)}
            onOpen={toggleDrawer('bottom', true)}
          >
            {user.length !== 0? listLogin('bottom') : list('bottom')}
      </SwipeableDrawer>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>

          <IconButton edge="start" color="inherit" aria-label="open drawer" id="simple-menu" onClick={toggleDrawer('bottom', true)}>
            <MenuIcon fontSize ="large"/>
          </IconButton>

          {user.length !== 0?(
            <IconButton color="inherit" button component={Link} to="/">
              <StarIcon fontSize ="large" />
            </IconButton>
          ):""}

          {user.length !==0?(
            <Fab color="secondary" aria-label="add" className={classes.fabButton} button component={Link} to="/">
              <AddIcon fontSize ="large"/>
            </Fab>
          ):""}

          <div className={classes.grow} />

          {user.length !==0?(
                      <IconButton edge="end" color="inherit"  button component={Link} to="/">
                      <RestaurantIcon fontSize ="large"/>
                    </IconButton>
          )
          :""}

          <IconButton color="inherit" button component={Link} to="/search">
            <SearchIcon fontSize ="large"/>
          </IconButton>

        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
