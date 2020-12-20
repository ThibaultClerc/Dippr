import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { Grid, Container, Paper, Chip, Avatar, Button } from "@material-ui/core"
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import moment from 'moment'
import MiniMap from '../../components/MiniMap';
import PopupDialog from '../../components/PopupDialog';
import { useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

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
      top: '50%',
      width: '100vw'
    }
  },
  textPaper: {
    borderRadius: 35,
    padding: 25,
    marginBottom: 20,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 0,
      borderRadius: '35px 35px 0px 0px',
      webkitBoxShadow: '0px -18px 100px 0px rgba(0,0,0,0.60)',
      mozBoxShadow: '0px -18px 100px 0px rgba(0,0,0,0.60)',
      boxShadow: '0px -18px 100px 0px rgba(0,0,0,0.60)'
    }
  },
  mapPaper: {
    borderRadius: 35
  },
  askButton: {
    bottom: '4%',
    left: '24%',
    borderRadius: 50,
    padding: 10,
    width: '50%',
    lineHeight: 2.5,
    webkitBoxShadow: '0px 0px 50px 0px rgba(0,0,0,0.50)',
    mozBoxShadow: '0px 0px 50px 0px rgba(0,0,0,0.50)',
    boxShadow: '0px 0px 50px 0px rgba(0,0,0,0.50)',
    [theme.breakpoints.down('xs')]: {
      zIndex: '100',
      top: '-27%',
      '& > *': {
        fontSize: "0.7rem",
      },
      display: 'none'
    },
    [theme.breakpoints.down('sm')]: {
      bottom: '5.5%',
    }
  },
  askButton2: {
    display: 'none',
    left: '24%',
    borderRadius: 50,
    padding: 10,
    width: '50%',
    lineHeight: 2.5,
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.down('xs')]: {
      zIndex: '100',
      position: 'absolute',
      top: '-3%',
      display: 'initial',
      fontSize: "0.8rem",
    }
  },
  avatar: {
    position: 'absolute',
    top: 40,
    left: 40,
    border: "1px solid white",
    maxWidth: "fit-content",
    webkitBoxShadow: '0px 0px 50px 0px rgba(0,0,0,0.60)',
    mozBoxShadow: '0px 0px 50px 0px rgba(0,0,0,0.60)',
    boxShadow: '0px 0px 50px 0px rgba(0,0,0,0.60)',
    [theme.breakpoints.down('xs')]: {
      top: 40,
      marginLeft: 'auto',
      marginRight: 'auto',
      left: 0,
      right: 0
    }
  },
  nameChip: {
    position: 'absolute',
    top: 44,
    left: 90,
    backgroundColor: "white",
    [theme.breakpoints.down('xs')]: {
      top: 44,
      left: 240,
    }
  },
  title : {
    [theme.breakpoints.down('xs')]: {
      marginTop: '20px',
    }
  }
}));

const MarketDish = () => {
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector(state => state.user.user);
  const { dishID } = useParams()
  const [data, setData] = useState(null)
  const [isSearching, setIsSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCancelSuccess, setIsCancelSuccess] = useState(false);
  const [alreadyAsked, setAlreadyAsked] = useState(null)
  const [userTransaction, setUserTransaction] = useState([])

  useEffect(() => {
    setIsSearching(true)
    fetch(`http://localhost:3090/api/market_dishes/${dishID}`, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((response) => {
      setData(response.data)
      if (response.data.attributes.market_dish_type === "troc") {
        fetchUserTransactions("trocs", response.data.id)
      } else {
        fetchUserTransactions("donations", response.data.id)
      }
    }).catch(error => {
      console.log(error)
    })
  }, [isSuccess, isCancelSuccess])

  const fetchUserTransactions = (type, pageDishID) => {
    fetch(`http://localhost:3090/api/users/${user.id}/${type}`, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": Cookies.get("token")
      }
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.data.length === 0) {
        setAlreadyAsked(false)
      } else {
          const transaction = response.data
            .filter(transaction => ((transaction.attributes.answer_dish_id == pageDishID)
            && ((transaction.attributes.status === 'pending') || (transaction.attributes.status === 'confirmed'))))
        if (transaction.length === 0) {
          setAlreadyAsked(false)
        } else {
          setAlreadyAsked(true)
          setUserTransaction([...transaction])
        }
      }
    }).catch(error => {
      console.log(error)
    }).finally(() => setIsSearching(false))
  }

  const handleChipClick = (chipName) => {
    history.push({
      pathname: '/search/',
      search: chipName
    });
  }

  const handleAvatarClick = () => {
    history.push({
      pathname: `/profile/${data.meta.user_dish.user_id}`
    });
  }

  const handleAskClick = () => {
    if (user.length === 0) {
      return history.push({ pathname: '/signup'})
    }
    if (data.attributes.market_dish_type === "troc") {
      setOpen(true)
    } else {
      handleTransactionCreation()
    }
  }

  const handleCancelClick = () => {
    if (data.attributes.market_dish_type === "troc") {
      handleTransactionDelete()
    } else {
      handleTransactionDelete()
    }
  }

  const handleTransactionDelete = () => {
    let transactionData;
    let type;
      if (data.attributes.market_dish_type === "troc") {
      type = "trocs"
      transactionData = {
        status: 3
      }
    } else {
      type = "donations"
      transactionData = {
        status: 3
      }
    }
    const actualTransaction = userTransaction[0]
    fetch(`http://localhost:3090/api/${type}/${actualTransaction.id}`, {
      "method": "PUT",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": Cookies.get("token")
      },
      "body": JSON.stringify(transactionData)
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("There was an error with the Rails API")
      } else {
      return response.json()
      }
    })
    .then(() => {
      setAlreadyAsked(false)
      setIsCancelSuccess(true)
    }).catch(error => {
      console.log(error)
    })
  }

  const handleTransactionCreation = (userMarketDish = 0) => {
    let transactionData;
    let type;
      if (data.attributes.market_dish_type === "troc") {
      type = "trocs"
      transactionData = {
        answerer_id: data.meta.user_dish.user_id,
        caller_dish_id: userMarketDish,
        answer_dish_id: data.id,
        status: 0
      }
    } else {
      type = "donations"
      transactionData = {
        answerer_id: data.meta.user_dish.user_id,
        answer_dish_id: data.id,
        status: 0
      }
    }
    fetch(`http://localhost:3090/api/${type}`, {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": Cookies.get("token")
      },
      "body": JSON.stringify(transactionData)
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("There was an error with the Rails API")
      } else {
      return response.json()
      }
    })
    .then(() => {
      setAlreadyAsked(true)
      setIsSuccess(true)
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    let successTimeout;
    if (isSuccess) {
      successTimeout = setTimeout(() => {
        setIsSuccess(false)
      }, 2000)
    }
    return () => {
      clearTimeout(successTimeout)
    }
  }, [isSuccess])

  useEffect(() => {
    let successTimeout;
    if (isCancelSuccess) {
      successTimeout = setTimeout(() => {
        setIsCancelSuccess(false)
      }, 2000)
    }
    return () => {
      clearTimeout(successTimeout)
    }
  }, [isCancelSuccess])

  // && data.meta.user_dish.user_id === user.id
  console.log(data, user)
  return (
    <>
    {isSuccess && 
      <Collapse
        in={isSuccess}
        style={{
          zIndex: 10,
          position: "absolute",
          width: "100%"
        }}
        >
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              severity="success"
              size="small"
              onClick={() => {
                setIsSuccess(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {data.attributes.market_dish_type === "troc" ? 
            `La demande de troc a bien été envoyée à ${data.meta.user_first_name} !`
            : `La demande de don a bien été envoyée à ${data.meta.user_first_name}`
          }
        </Alert>
      </Collapse>
    }
    {isCancelSuccess && 
      <Collapse
        in={isCancelSuccess}
        style={{
          zIndex: 10,
          position: "absolute",
          width: "100%"
        }}
        >
        <Alert
          severity="info"
          action={
            <IconButton
              aria-label="close"
              severity="info"
              size="small"
              onClick={() => {
                setIsCancelSuccess(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {data.attributes.market_dish_type === "troc" ? 
            `Le troc a bien été annulé !`
            : `Le don a bien été annulé !`
          }
        </Alert>
      </Collapse>
    }
    {open &&
      <PopupDialog
        userID={user.id}
        open={open}
        handleClose={(closeValue) => setOpen(closeValue)}
        handleSelectedValue={(userMarketDish) => handleTransactionCreation(userMarketDish)}
      />
    }
    {(data !== null) &&
      <Container fixed className={classes.mainContainer}>
        <Grid container fixed spacing={3} className={classes.subMainContainer}>
          <Grid item xs={12} md={6} className={classes.imgContainer}>
            <img className={classes.image} src={`https://dippr-api-development.herokuapp.com${data.meta.user_dish.photo_url}`} alt="dish-photo"></img>   
            <Chip
              avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
              label={data.meta.user_first_name}
              className={classes.avatar}
              onClick={handleAvatarClick}
            />
            {data.meta.user_dish.user_id != user.id &&
              <>
              {!alreadyAsked ? 
                <Button variant="contained" color="secondary" size="large" className={classes.askButton} onClick={handleAskClick}>
                  {data.attributes.market_dish_type === "troc" ?
                  "PROPOSER UN TROC"
                  : "DEMANDER CE PLAT"
                }
                </Button>
              : <Button variant="contained" color="primary" size="large" className={classes.askButton} onClick={handleCancelClick}>
                  Annuler la demande
                </Button>
              }
              </>
            } 
            {data.meta.user_dish.user_id == user.id &&
              <Button variant="contained" color="primary" size="large" className={classes.askButton}>
                C'est votre plat !
              </Button>
            }
          </Grid>
          <Grid item xs={12} md={6} className={classes.textContainer}>
          {data.meta.user_dish.user_id != user.id &&
            <>
            {!alreadyAsked ? 
              <Button variant="contained" color="secondary" size="large" className={classes.askButton2} onClick={handleAskClick}>
                  {data.attributes.market_dish_type === "troc" ?
                  "PROPOSER UN TROC"
                  : "DEMANDER CE PLAT"
                }
              </Button>
              : <Button variant="contained" color="primary" size="large" className={classes.askButton2} onClick={handleCancelClick}>
                  Annuler la demande
                </Button>
            }
            </>
          }
          {data.meta.user_dish.user_id == user.id &&
              <Button variant="contained" color="primary" size="large" className={classes.askButton2}>
                C'est votre plat !
              </Button>
            }
            <Paper className={classes.textPaper}>
              <Typography variant="h2" gutterBottom className={classes.title}>
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
              <MiniMap
                dishID={data.attributes.user_dish_id}
                dishLat={data.meta.user_lat}
                dishLng={data.meta.user_lng}
                className={classes.miniMap}
                />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    }
    </>
  );
};

export default MarketDish;
