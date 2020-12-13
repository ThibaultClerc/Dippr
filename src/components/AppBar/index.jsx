import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from "js-cookie";
import { logoutUser } from '../../store/actions'
import { Link, Redirect } from "react-router-dom";
import  Announcement from '../../pages/Annoucement'


// Material UI
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

// Icons
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import SettingsIcon from '@material-ui/icons/Settings'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import StarIcon from '@material-ui/icons/Star'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import SendIcon from '@material-ui/icons/Send';
import HomeIcon from '@material-ui/icons/Home';
import MessageIcon from '@material-ui/icons/Message';


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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },inputInput: {
    padding: theme.spacing(3, 3, 3, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  },
}));

export default function BottomAppBar() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user);
  const [query, setQuery] = React.useState("")
  const [redirection, setRedirection] = React.useState(false);
  const [announce, setAnnounce] = React.useState(null);

  const [state, setState] = React.useState({
    bottom: false,
    top: false,
  });

  const handleClick = () => {
    Cookies.remove('token');
    dispatch(logoutUser())
  };

  const handleChange = (e) => {
    setQuery(e.target.value)
  };

  const handleSearch = (e) => {
    if(e.keyCode === 13 ||e.which === 13){
      setRedirection(true)
    }
  };

  const handleModalChange = () => {
    setAnnounce(true);
  }

  const handleAddAnnounce = (value) => {
    setAnnounce(false)
  };

  const toggleDrawer = (anchor, open) => (event) => {
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

        <ListItem  button component={Link} to="/" >
          <ListItemIcon> <StarIcon/></ListItemIcon>
          <ListItemText primary={"Favoris"} />
        </ListItem>

        <ListItem  button component={Link} to="/" >
          <ListItemIcon> <MessageIcon/></ListItemIcon>
          <ListItemText primary={"Messages"} />
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

  const searchBar = (anchor) => (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        value={query} 
        onChange={(e) => handleChange(e)}
        onKeyPress={(e) => handleSearch(e)}
      />
      <Button
      variant="contained"
      color="primary"
      className={classes.button}
      size="small"
      component={Link} 
      to={`/search/${query}`}
    ><SendIcon/></Button>  
    </div>
  );

  React.useEffect(() => {
  }, [announce])

  return (
    <div>
    <Redirect to={`/search/${query}`}/>
    {announce && <Announcement value={announce} visibleModal={(()=>handleAddAnnounce(false))}/> }
    {['top', 'bottom'].map((anchor) => (
    <React.Fragment>
      <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >

            {state.bottom && (user.length !== 0? listLogin('bottom') : list('bottom'))}
            {state.top && searchBar('top')}
      </SwipeableDrawer>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>

        <IconButton color="inherit" button component={Link} to="/">
            <HomeIcon fontSize ="medium"/>
          </IconButton>

          {user.length !==0?(
                      <IconButton edge="end" color="inherit"  button component={Link} to="/">
                      <RestaurantIcon fontSize ="medium"/>
                    </IconButton>
          )
          :""}

          {user.length !== 0?(
            <IconButton color="inherit" button component={Link} to="/">
              <StarIcon fontSize ="medium" />
            </IconButton>
          ):""}

            <Fab color="secondary" aria-label="add" className={classes.fabButton}  onClick={handleModalChange}>
              <AddIcon fontSize ="medium"/>
            </Fab>

          <div className={classes.grow} />

          {user.length !== 0?(
            <IconButton color="inherit" button component={Link} to="/">
              <MessageIcon fontSize ="medium" />
            </IconButton>
          ):""}

          <IconButton color="inherit" onClick={toggleDrawer('top', true)}>
            <SearchIcon fontSize ="medium"/>
          </IconButton>

          <IconButton edge="start" color="inherit" aria-label="open drawer" id="simple-menu" onClick={toggleDrawer('bottom', true)}>
            <MenuIcon fontSize ="medium"/>
          </IconButton>


        </Toolbar>
      </AppBar>
    </React.Fragment>
      ))}
  </div>
  );
}
