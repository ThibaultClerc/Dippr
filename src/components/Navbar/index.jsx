import { withRouter, useHistory, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dipprLogoTest2 from '../../assets/img/dipprLogoTest2.png'
import Cookies from "js-cookie";
import { logoutUser } from '../../store/actions'
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import useDebouncedEffect from 'use-debounced-effect-hook'
import Alert from '@material-ui/lab/Alert';
import  Announcement from '../../pages/Announcement'
import './index.scss'

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
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [announce, setAnnounce] = useState(null);
  const [publishSuccess, setPublishSuccess] = useState(null)
  const history = useHistory();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

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

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = (event) => {
    setAnchorEl(event.currentTarget);
    Cookies.remove('token');
    dispatch(logoutUser())
  }

  const handleDialogAnnounce = () => {
    setAnnounce(true);
  }

  const handlePublishSuccess = () => {
    setPublishSuccess(true);
  };

  const handleAddAnnounce = () => {
    setAnnounce(false)
  };


  const successAlert = () =>(
    <Alert onClose={() =>setPublishSuccess(false)} severity="success">Votre plat est bien enregistré !</Alert>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {user === undefined || user.length === 0 ?
        [
        <MenuItem key="signup" onClick={handleProfileMenuOpen} component={Link} to="/signup">
          <p>S'inscrire</p>
        </MenuItem>,
        <MenuItem key="signin" onClick={handleProfileMenuOpen} component={Link} to="/signin">
          <p>Se connecter</p>
        </MenuItem>
        ]
        : [
          <MenuItem key="myProfile" onClick={handleProfileMenuOpen} component={Link} to={`/profile/${user.id}`}>
            <p>Mon profil</p>
          </MenuItem>,
          <MenuItem key="logout" onClick={(e) => handleLogout(e)} component={Link} to="/">
            <p>Se déconnecter</p>
          </MenuItem>
        ]
      }
    </Menu>
  );

  return (
    <div className={classes.grow}>
    {announce && <Announcement value={announce} visibleModal={(()=>handleAddAnnounce(false))} Alert={publishSuccess} visibleAlert={content=>handlePublishSuccess(content)}/> }
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
          <Button key="btn-announce" onClick={()=>handleDialogAnnounce()}  variant="outlined" color="secondary">
                  Poster une annonce
          </Button>
          {(user !== undefined && user.length !== 0) && 
              <Button key="btn-btn-dish" component={Link} to ={`/swap`}>
                Mes Annonces
              </Button>
          }
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          { (user !== undefined && user.length !== 0) && user.attributes.is_admin === true  ? <Button key="btn-signup" component={Link} to ="/admin" variant="outlined" color="secondary">
            Dashboard Admin
            </Button>: ""}

            {user === undefined || user.length === 0?
              [
                <Button key="btn-signup" component={Link} to ="/signup" variant="outlined" color="secondary">
                  S'inscrire
                </Button>,
                <Button key="btn-signin" component={Link} to ="/signin">Se connecter</Button>
              ]
              : [
              <Button key="btn-profile" component={Link} to ={`/profile/${user.id}`}>
                  Mon Profil
                </Button>,
                <Button key="btn-logout" component={Link} to ="/" variant="outlined" color="secondary" onClick={(e) => handleLogout(e)}>Se déconnecter</Button>
              ]
            }
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
      {renderMenu}
    </div>
  );
}

export default withRouter(Nav);