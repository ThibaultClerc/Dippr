import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from "js-cookie";
import { logoutUser } from '../../store/actions'
import { Link, useHistory } from "react-router-dom";
import  Announcement from '../../pages/Announcement'
import useDebouncedEffect from 'use-debounced-effect-hook'

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
import Alert from '@material-ui/lab/Alert';

// Icons
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
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
    backgroundColor: "white"
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    backgroundColor: "#D9414F",
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
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  },
  appBarSearchIcon: {
    marginRight: "30px"
  },
  appBarRestaurantIcon: {
    marginLeft: "21px",
  }
}));

export default function BottomAppBar() {
  const dispatch = useDispatch()
  let user = useSelector(state => state.user.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [announce, setAnnounce] = useState(null);
  const [publishSuccess, setPublishSuccess] = useState(null)
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = useState({
    bottom: false,
    top: false,
  });
  

  const handleClick = () => {
    Cookies.remove('token');
    dispatch(logoutUser())
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  };

  useDebouncedEffect(() => {
    if (searchTerm !== "") {
      history.push({
        pathname: '/search/',
        search: searchTerm
      });
    }
  },
  [ searchTerm ],
    1000
  );

  useEffect(() => {
    if (searchTerm.length < 2) {
      return
    }
    if (searchTerm !== "") {
      history.push({
        pathname: '/search/'
      });
    }
  }, [searchTerm])


  const handleModalChange = () => {
    setAnnounce(true);
  }

  const handleAddAnnounce = () => {
    setAnnounce(false)
  };

  const handlePublishSuccess = () => {
    setPublishSuccess(true);
  };

  const successAlert = () =>(
    <Alert onClose={() =>setPublishSuccess(false)} severity="success">Votre plat est bien enregistré !</Alert>
  );

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  

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
          <ListItemText primary={"Mon Profil"} />
        </ListItem>
        <ListItem  button component={Link} to="/swap" >
          <ListItemIcon>
            <RestaurantIcon/>
          </ListItemIcon>
          <ListItemText primary={"Mes annonces"} />
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
      <List  key="list-1">
        <ListItem  button component={Link} to="/signin" key="signin">
          <ListItemIcon> <AccountCircleIcon /></ListItemIcon>
          <ListItemText primary={"Se Connecter"}/>
        </ListItem>
        <ListItem  button component={Link} to="/signup" key="signup">
          <ListItemIcon > <ExitToAppIcon /></ListItemIcon>
          <ListItemText primary={"S'inscrire"} />
        </ListItem>
      </List>
    </div>
  );

  const searchBar = () => (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Rechercher des plats..."
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={e => handleChange(e)}
        value={searchTerm}
      /> 
    </div>
  );

  useEffect(() => {
  }, [announce])

  return (
    <div>
      {publishSuccess && successAlert()}
      {announce &&
        <Announcement
          value={announce}
          visibleModal={(()=>handleAddAnnounce(false))}
          Alert={publishSuccess}
          visibleAlert={content=>handlePublishSuccess(content)}
        />
      }
      {['top', 'bottom'].map((anchor) => (
      <>
        <SwipeableDrawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          onOpen={toggleDrawer(anchor, true)}
        >
          {state.bottom && ((user !== undefined && user.length !== 0? listLogin('bottom') : list('bottom')))}
          {state.top && searchBar('top')}
        </SwipeableDrawer>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton  button="true" component={Link} to="/">
              <HomeIcon fontSize ="default"/>
            </IconButton>
            {user !== undefined && user.length !== 0 ? (
              <IconButton edge="end"  button="true" component={Link} to="/swap" className={classes.appBarRestaurantIcon}>
                <RestaurantIcon fontSize="small"/>
              </IconButton>
            )
            :""}
            <Fab color="secondary" aria-label="add" className={classes.fabButton}  onClick={handleModalChange}>
              <AddIcon fontSize ="default"/>
            </Fab>
            <div className={classes.grow} />
            <IconButton  onClick={toggleDrawer('top', true)} className={classes.appBarSearchIcon}>
              <SearchIcon fontSize ="default"/>
            </IconButton>
            <IconButton edge="start"  aria-label="open drawer" id="simple-menu"  onClick={toggleDrawer('bottom', true)}>
              <MenuIcon fontSize ="default"/>
            </IconButton>
          </Toolbar>
        </AppBar>
      </>
      ))}
  </div>
  );
}
