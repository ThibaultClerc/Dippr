import { withRouter, Redirect, useLocation, useHistory, Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import useDebounce from './use-debounce';
import { useSelector, useDispatch } from 'react-redux';
import dipprLogoTest from '../../assets/img/dipprLogoTest.png'
import dipprLogoTest2 from '../../assets/img/dipprLogoTest2.png'
import dipprLogoTest3 from '../../assets/img/dipprLogoTest3.png'

import './index.scss'
import Cookies from "js-cookie";
import { logoutUser } from '../../store/actions'
// import AutocompleteInputSearch from './AutocompleteInputSearch';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import { spacing } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  title: {
    marginLeft: "1rem",
    textDecoration: 'none',
    marginRight: theme.spacing(2),
    fontWeight: 'bold',
    fontSize: '1.5rem'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
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
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  rootToolbar: {
    backgroundColor: '#b51e1e'
  },
}));

const Nav = () => {
  
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 100);
  const [redirect, setRedirect] = useState('')
  const location = useLocation();
  const history = useHistory();

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
          data: data
        },
      }); 
    });
  };

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        fetchData()
      };
    },
    [debouncedSearchTerm]
  );

  useEffect (
    () => {
      history.push({
        pathname: '/search'
      }); 
    },
    [searchTerm]
  );

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = (event) => {
    setAnchorEl(event.currentTarget);
    Cookies.remove('token');
    dispatch(logoutUser())
  }

  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  // hambuger menu
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {user.length === 0 ?
        [
        <MenuItem onClick={handleProfileMenuOpen} component={Link} to="/signup">
          <p>S'inscrire</p>
        </MenuItem>,
        <MenuItem onClick={handleProfileMenuOpen} component={Link} to="/signin">
          <p>Se connecter</p>
        </MenuItem>
        ]
        : [
          <MenuItem onClick={handleProfileMenuOpen} component={Link} to={`/profile/${user.id}`}>
            <p>Mon profil</p>
          </MenuItem>,
          <MenuItem onClick={(e) => handleLogout(e)} component={Link} to="/">
            <p>Se déconnecter</p>
          </MenuItem>
        ]
      }
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        className="appBar"
        style={{backgroundColor: "white", color: "black"}}
        elevation={0}
        >
        <Toolbar className="rootToolbar">
          
          <Link to="/" className={classes.title} variant="h6" color='inherit'>
            <img src={dipprLogoTest2} className="dipprFullLogo" ></img>
          </Link>
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
              onChange={e => handleInputChange(e)}
              value={searchTerm}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {user.length === 0 ?
              [
                <Button component={Link} to ="/signup" variant="outlined" color="secondary" marginRight={2}>
                  S'inscrire
                </Button>,
                <Button component={Link} to ="/signin">Se connecter</Button>
              ]
              : [
              <Button component={Link} to ={`/profile/${user.id}`} marginRight={2}>
                  Mon Profil
                </Button>,
                <Button component={Link} to ="/" variant="outlined" color="secondary" onClick={(e) => handleLogout(e)}>Se déconnecter</Button>
              ]
            }
            {/* <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              
            </IconButton> */}
          </div>




          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {/* {renderMenu} */}
    </div>
  );
}

export default withRouter(Nav);