import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from "js-cookie";
import { logoutUser } from '../../store/actions'
import { Link, useHistory } from "react-router-dom";
import  Announcement from '../../pages/Annoucement'
import useDebounce from './use-debounce';

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
import Alert from '@material-ui/lab/Alert';

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
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 100);
  const [announce, setAnnounce] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [publishSuccess, setPublishSuccess] = React.useState(null)
  const history = useHistory();
  const [state, setState] = React.useState({
    bottom: false,
    top: false,
  });

  const classes = useStyles();

  const handleClick = () => {
    Cookies.remove('token');
    dispatch(logoutUser())
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
    if (e.target.value.length < 2) {
      history.push({
        pathname: '/search'
      }); 
    }
  };

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
  
  const fetchData = () => {
    setIsSearching(true);
    fetch(`https://dippr-api-development.herokuapp.com/api/marketdishes/search?query=${debouncedSearchTerm}`, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json"
      },
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      setData(response.data)
    }).catch(error => {
      console.log(error)
    }).finally(() => {
      setIsSearching(false);
      history.push({
        pathname: '/search/',
        search: `${debouncedSearchTerm}`,
        state: {
          data: data,
          searchTerm: searchTerm
        },
      }); 
    });
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
      <Button
      variant="contained"
      color="primary"
      className={classes.button}
      size="small"
      component={Link} 
      to={`/search/${searchTerm}`}
    ><SendIcon/></Button>  
    </div>
  );

  React.useEffect(
    () => {
      if (debouncedSearchTerm) {
        fetchData()
      }
    },
    [debouncedSearchTerm]
  );

  React.useEffect(() => {
  }, [announce])

  return (
    <div>
      {publishSuccess && successAlert()}
    {announce && <Announcement value={announce} visibleModal={(()=>handleAddAnnounce(false))} Alert={publishSuccess} visibleAlert={content=>handlePublishSuccess(content)}/> }
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

        <IconButton color="inherit" button="true" component={Link} to="/">
            <HomeIcon fontSize ="default"/>
          </IconButton>

          {user.length !==0?(
                      <IconButton edge="end" color="inherit"  button="true" component={Link} to="/">
                      <RestaurantIcon fontSize ="default"/>
                    </IconButton>
          )
          :""}

          {user.length !== 0?(
            <IconButton color="inherit" button="true" component={Link} to="/">
              <StarIcon fontSize ="default" />
            </IconButton>
          ):""}

            <Fab color="secondary" aria-label="add" className={classes.fabButton}  onClick={handleModalChange}>
              <AddIcon fontSize ="default"/>
            </Fab>

          <div className={classes.grow} />

          {user.length !== 0?(
            <IconButton color="inherit" button="true" component={Link} to="/">
              <MessageIcon fontSize ="default" />
            </IconButton>
          ):""}

          <IconButton color="inherit" onClick={toggleDrawer('top', true)}>
            <SearchIcon fontSize ="default"/>
          </IconButton>

          <IconButton edge="start" color="inherit" aria-label="open drawer" id="simple-menu"  onClick={toggleDrawer('bottom', true)}>
            <MenuIcon fontSize ="default"/>
          </IconButton>


        </Toolbar>
      </AppBar>
    </React.Fragment>
      ))}
  </div>
  );
}
