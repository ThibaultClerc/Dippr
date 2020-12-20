import React, { useState } from 'react';
import Search from '../../Search';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MapIcon from '@material-ui/icons/Map';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { Grid, Button, ButtonGroup, Divider } from '@material-ui/core';
import dipprLogo from '../../../assets/img/dipprLogo.png';
import dipprMini from '../../../assets/img/dipprMini.png'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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
  mainContainer: {
  },
  imageContainer: {

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
  listOrMapContainer: {
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
  const [categoryValue, setCategoryValue] = useState(1);
  const [listOrMaps, setListOrMaps] = useState("list");
  const classes = useStyles();

  return (
    <>
      <Paper square  style={{backgroundColor: '#ebeff5'}}>
        <Grid container item justify='center' alignItems='center'>
          <Tabs
            value={categoryValue}
            indicatorColor="primary"
            aria-label="disabled tabs example"
          >
            <Tab value={1} label="Trocs" onClick={(e) => setCategoryValue(1)} style={{outline: 'none'}}/>
            <Tab value={2} label="Dons" onClick={(e) => setCategoryValue(2)} style={{outline: 'none'}}/>
          </Tabs>
          <ButtonGroup className={classes.listOrMapContainer} size="small" color="primary" aria-label="outlined primary button group">
              <Button onClick={(e) => setListOrMaps("list")}>
                <FormatListBulletedIcon/>
              </Button>
              <Button onClick={(e) => setListOrMaps("map")}>
                <MapIcon/>
              </Button>
            </ButtonGroup>
        </Grid>
      </Paper>
      <Grid className={classes.mainContainer}>
        <Grid className={classes.mainWelcomeContainer}>
          <Grid container fixed className={classes.welcomeContainer}>
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
      </Grid>
    </>
  )
}

export default UserHome
