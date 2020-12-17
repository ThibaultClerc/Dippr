import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { Grid, Container, Paper, Chip, Avatar, Button } from "@material-ui/core"
import { borders } from '@material-ui/system';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import Loader from '../../components/UI/Loader';
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
      paddingRight: 0,
    }
  },
  subMainContainer: {
    paddingTop: 100,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      width: '100vw !important',
      margin: '0 !important'
    }
  },
  ingtContainer: {
    display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  imgContainer : {
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '0 !important',
      paddingRight: '0 !important',
      paddingTop: '0 !important'
    }
  },
  image: {
    borderRadius: 35,
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      borderRadius: 0,
      height: '55vh',
      width: 'none',
      objectFit: 'cover'
    }
  },
  textContainer: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '0 !important',
      paddingRight: '0 !important',
      paddingTop: '0 !important',
      position: 'absolute',
      bottom: '15%'
    }
  },
  textPaper: {
    borderRadius: 35,
    padding: 20
  },
  mapPaper: {
    borderRadius: 35,
  },
  askButton: {
    position: 'absolute',
    bottom: '-3%',
    left: '24%',
    borderRadius: 50,
    padding: 10,
    width: '50%',
    lineHeight: 2.5,
    [theme.breakpoints.down('xs')]: {
      '& > *': {
        fontSize: "0.7rem"
      },
    }
  },
  avatar: {
    position: 'absolute',
    top: 40,
    left: 40,
    border: "1px solid white",
    [theme.breakpoints.down('xs')]: {
      top: 40,
      right: 40,
    }
  },
  nameChip: {
    position: 'absolute',
    top: 44,
    left: 90,
    backgroundColor: "white",
    [theme.breakpoints.down('xs')]: {
      top: 44,
      right: 90,
    }
  }
}));

const MarketDish = () => {
  const classes = useStyles();
  const { dishID } = useParams()
  const [data, setData] = useState(null)
  const [isSearching, setIsSearching] = useState(false);
  const history = useHistory();

  useEffect(() => {
    console.log(dishID)
    setIsSearching(true)
    fetch(`https://dippr-api-development.herokuapp.com/api/market_dishes/${dishID}`, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((response) => {
      setData(response.data)
    }).catch(error => {
      console.log(error)
    }).finally(() => {
      setIsSearching(false)
    })
  }, [])

  const handleChipClick = (chipName) => {
    history.push({
      pathname: '/search/',
      search: chipName
    });
  }

  return (
    <>
    {isSearching && <Loader/>}
    {(data !== null && !isSearching) &&
      <Container fixed className={classes.mainContainer}>
        <Grid container fixed spacing={3} className={classes.subMainContainer}>
          <Grid item xs={12} md={6} className={classes.imgContainer}>
            <img className={classes.image} src={data.meta.user_dish.photo_url} alt="dish-photo"></img>
            <Avatar className={classes.avatar}>H</Avatar>
            <Chip className={classes.nameChip} label={data.meta.user_first_name} />
            
            <Button variant="contained" color="secondary" size="large" className={classes.askButton}>
              {data.attributes.market_dish_type === "troc" ?
              "PROPOSER UN TROC"
              : "DEMANDER CE PLAT"
            }
            </Button>
            
          </Grid>
          <Grid item xs={12} md={6} className={classes.textContainer}>
            <Paper className={classes.textPaper}>
              <Typography variant="h2" gutterBottom>
                {data.meta.user_dish.name}
              </Typography>
              <Typography variant="overline" display="block" gutterBottom>
                <AccessTimeIcon/>{moment(data.attributes.created_at).fromNow()}
              </Typography>
              <Grid spacing={3} className={classes.ingtContainer}>
                {data.meta.ingredients.map(ingt => {
                  return <Chip
                    label={ingt.name}
                    size="small"
                    onClick={() => handleChipClick(ingt.name)}
                    color="primary"
                    variant="outlined"
                    clickable
                    />
                })}
              </Grid>
              <Grid spacing={3} className={classes.ingtContainer}>
                {data.meta.tags.map(tag => {
                  return <Chip
                    label={tag.name}
                    size="small"
                    onClick={() => handleChipClick(tag.name)}
                    color="secondary"
                    variant="outlined"
                    clickable
                    />
                })}
              </Grid>
              <Typography variant="body1" gutterBottom>
                {data.meta.user_dish.description}
              </Typography>
            </Paper>
            <Paper className={classes.mapPaper}>

            </Paper>
          </Grid>
        </Grid>
      </Container>
    }

    </>
  )
}

export default MarketDish




