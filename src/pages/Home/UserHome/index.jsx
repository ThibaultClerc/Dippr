import React, { useState, useEffect } from 'react';
import { Grid, Divider } from '@material-ui/core';
import dipprLogo from '../../../assets/img/dipprLogo.png';
import dipprMini from '../../../assets/img/dipprMini.png'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SearchResults from '../../../pages/Search/SearchResults'
// import { useSelector, useDispatch } from 'react-redux';
// import Cookies from 'js-cookie';
// import {loginUser} from '../../../store/actions';

const useStyles = makeStyles((theme) => ({
  mainWelcomeContainer: {
    backgroundColor: '#fafafb',
  },
  welcomeContainer: {
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
    [theme.breakpoints.up('md')]: {
        width: 920,
    },
    [theme.breakpoints.up('lg')]: {
        width: 1170,
    },
    [theme.breakpoints.up('xl')]: {
        width: 1366,
    },
  },
  image: {
    width: '50%',
    margin: 'auto',
    display: "block",
    padding: 30,
    [theme.breakpoints.down('lg')]: {
    },
    [theme.breakpoints.down('md')]: {
      padding: 20,
    },
    [theme.breakpoints.down('sm')]: {
      padding: 15,
      marginTop: 20,
      width: '30%'
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: 30,
      width: '50%'
    }
  },
  textContainer: {
    padding: 30,
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      textJustify: 'inter-word'
    }
  },
  newContainer: {
    margin: "5em 10em",
    [theme.breakpoints.down('xs')]: {
      margin: "3rem"
    }
  },
  text: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 'small'
    }
  }
}));

const UserHome = () => {
  const [data, setData] = useState([]);
  const classes = useStyles();
  // const user = useSelector(state => state.user.user);
  // const [userLat, setUserLat] = useState(null)
  // const [userLng, setUserLng] = useState(null)
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (typeof user === 'undefined') {
  //     return
  //   }
  //   if ((user.attributes.lat !== null) && (user.attributes.lng !== null)) {
  //     return
  //   }
  //   if ("geolocation" in navigator) {
  //     console.log("ici")
  //     navigator.geolocation.getCurrentPosition(function(position) {
  //       setUserLat(position.coords.latitude.toFixed(6));
  //       setUserLng(position.coords.longitude.toFixed(6));
  //     });
  //   } else {
  //     setUserLat(48.858370);
  //     setUserLng(2.294481);
  //   }
  // }, [])

  // useEffect(() => {
  //   if (typeof user === 'undefined') {
  //     return
  //   }
  //   if ((user.attributes.lat !== null) && (user.attributes.lng !== null)) {
  //     return
  //   }
  //   fetch(`https://dippr-api-production.herokuapp.com/api/users/${user.id}`, {
  //     "method": "PUT",
  //     "headers": {
  //       "Content-Type": "application/json",
  //       "Authorization": Cookies.get("token")
  //     },
  //     "body": JSON.stringify(
  //       {
  //         lat: userLat,
  //         lng: userLng
  //       }
  //     )
  //   })
  //   .then((response) => {
  //     return response.json()
  //   })
  //   .then((response) => {
  //     dispatch(loginUser(response.data))
  //   }).catch(error => {
  //     console.log(error)
  //   })
  // }, [])

  const fetchLastMarketDishes = () => {
    fetch(`https://dippr-api-production.herokuapp.com/api/market_dishes`, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json"
      },
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      const orderedResponse = response.data
        .sort((a, b) => (b.attributes.created_at).localeCompare((a.attributes.created_at)))
      const cropData = orderedResponse.slice(0, 12)
      setData(cropData)
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    fetchLastMarketDishes()
    const interval = setInterval(() => {
      fetchLastMarketDishes()
    }, 10000);
    return () => clearInterval(interval);
  }, [])

  return (
    <>
      <Grid className={classes.mainContainer}>
        <Grid className={classes.mainWelcomeContainer}>
          <Grid container className={classes.welcomeContainer}>
            <Grid container item xs={12} md={5} alignItems="center">
              <img src={dipprLogo} className={classes.image}></img>
            </Grid>
            <Grid container item xs={12} md={7} alignItems="center" className={classes.textContainer}>
              <Grid>
                <Typography variant="h4" gutterBottom>
                  Bienvenue sur <span><img src={dipprMini}></img></span>
                </Typography>
                <Typography variant="subtitle1" className={classes.text} gutterBottom>
                  Ici, tu peux partager tes plats maisons favoris et découvrir
                  de nouvelles saveurs !
                </Typography>
                <Typography variant="subtitle1" className={classes.text} gutterBottom>
                  Sur ta page d'accueil, tu peux voir tous les nouveaux plats
                  autour de chez toi. Si tu souhaites en découvrir d'avantage,
                  fais donc une recherche  !
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.newContainer}>
          <Typography variant="h3" gutterBottom>
              Nouveautés
          </Typography>
          <Divider variant="middle" />
        </Grid>
        {data.length > 0 &&
          <> 
            <SearchResults
              data={data}
              className="searchResults"
            />
          </>
        }
      </Grid>
    </>
  )
}

export default UserHome
