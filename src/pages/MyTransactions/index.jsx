import React, { useState, useEffect } from 'react';
import { Grid, Container, Paper, Chip, Avatar, Button } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import cooker from '../../assets/img/cooker.png';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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
    width: '70%',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
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
    minHeight: 500,
    maxHeight: 500,
    overflow: 'auto',
    [theme.breakpoints.down('xs')]: {
      marginBottom: 0,
      borderRadius: '35px 35px 0px 0px',
      webkitBoxShadow: '0px -18px 100px 0px rgba(0,0,0,0.60)',
      mozBoxShadow: '0px -18px 100px 0px rgba(0,0,0,0.60)',
      boxShadow: '0px -18px 100px 0px rgba(0,0,0,0.60)'
    },
    "&::-webkit-scrollbar": {
      display: 'none'
    },
    msOverflowStyle: 'none',  /* IE and Edge */
    scrollbarWidth: 'none'
  },
  itemText: {
    marginRight: '20px'
  },
  pending: {
    marginLeft: '20px',
    color: "#4BAAF5"
  },
  confirmed: {
    marginLeft: '20px',
    color: "#5CB660"
  }
}));

const MyTransactions = () => {
  const classes = useStyles();
  const user = useSelector(state => state.user.user);
  const [trocData, setTrocData] = useState([]);
  const [donationData, setDonationData] = useState([]);
  const [allData, setAllData] = useState([]);


  useEffect(() => {
    fetchUserTransactions("trocs")
    fetchUserTransactions("donations")
  }, [])

  const fetchUserTransactions = (type) => {
    fetch(`https://dippr-api-development.herokuapp.com/api/users/${user.id}/${type}`, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": Cookies.get("token")
      }
    })
    .then((response) => response.json())
    .then((response) => {
      if (type === "trocs") {
        const trocs = response.data
          .filter(transaction => (transaction.attributes.status === 'pending') || (transaction.attributes.status === 'confirmed'))
        setTrocData(trocs)
      } else {
        const donations = response.data
          .filter(transaction => (transaction.attributes.status === 'pending') || (transaction.attributes.status === 'confirmed'))
        setDonationData(donations) 
      }
    }).catch(error => {
      console.log(error)
    }).finally(() => {
    })
  }

  useEffect(() => {
    if (trocData.length === 0 || donationData.length === 0) {
      return
    }
    const allData = trocData.concat(donationData)
    allData.sort((a, b) => (b.attributes.updated_at).localeCompare((a.attributes.updated_at)))
    setAllData([...allData])
  }, [trocData, donationData])

  const handleItemListDisplay = (transaction, currentUser) => {
    if (transaction.type === "trocs") {
      if (transaction.attributes.answerer_id == currentUser.id) {
        return (
          <ListItem spacing={3} button>
            <ListItemAvatar>
              <Avatar
                // alt={`Avatar n°${data.id + 1}`}
                // src={`/static/images/avatar/${value + 1}.jpg`}
              />
            </ListItemAvatar>
            <ListItemText
              className={classes.itemText}
              id={transaction.id}
              primary={`${transaction.meta.caller.first_name} vous propose son
              ${transaction.meta.caller_dish.name} contre votre ${transaction.meta.answer_dish.name}`
              }
            />
            <Chip size="small" label="TROC" className={classes.chip} color="secondary" />
            {transaction.attributes.status === 'pending' ? 
              <HourglassFullIcon className={classes.pending}/>
              : <CheckCircleIcon className={classes.confirmed}/>
            }
          </ListItem>
        )
      } else {
        return (
          <ListItem spacing={3} button>
            <ListItemAvatar>
              <Avatar
                // alt={`Avatar n°${data.id + 1}`}
                // src={`/static/images/avatar/${value + 1}.jpg`}
              />
            </ListItemAvatar>
            <ListItemText
              className={classes.itemText}
              id={transaction.id}
              primary={`Vous avez proposé votre ${transaction.meta.caller_dish.name} à
              ${transaction.meta.answerer.first_name} contre son  ${transaction.meta.answer_dish.name}`
              }
            />
            <Chip size="small" label="TROC" className={classes.chip} color="secondary" />
            {transaction.attributes.status === 'pending' ? 
              <HourglassFullIcon className={classes.pending}/>
              : <CheckCircleIcon className={classes.confirmed}/>
            }
          </ListItem>
        )
      }
    } else if (transaction.type === "donations") {
      console.log(transaction.attributes.caller_id, currentUser.id)
      if (transaction.attributes.caller_id == currentUser.id) {
        return (
          <ListItem spacing={3} button>
            <ListItemAvatar>
              <Avatar
                // alt={`Avatar n°${data.id + 1}`}
                // src={`/static/images/avatar/${value + 1}.jpg`}
              />
            </ListItemAvatar>
            <ListItemText
              className={classes.itemText}
              id={transaction.id}
              primary={`Vous avez demandé à ${transaction.meta.answerer.first_name} son 
              ${transaction.meta.answer_dish.name}`
              }
            />
            <Chip size="small" label="DON" className={classes.chip} color="primary" />
            {transaction.attributes.status === 'pending' ? 
              <HourglassFullIcon className={classes.pending}/>
              : <CheckCircleIcon className={classes.confirmed}/>
            }
          </ListItem>
        )
      } else {
        console.log(transaction.attributes.caller_id, currentUser.id)
        return (
          <ListItem spacing={3} button>
            <ListItemAvatar>
              <Avatar
                // alt={`Avatar n°${data.id + 1}`}
                // src={`/static/images/avatar/${value + 1}.jpg`}
              />
            </ListItemAvatar>
            <ListItemText
              className={classes.itemText}
              id={transaction.id}
              primary={`${transaction.meta.caller.first_name} vous a demandé votre
              ${transaction.meta.answer_dish.name}`
              }
            />
            <Chip size="small" label="DON" className={classes.chip} color="primary" />
            {transaction.attributes.status === 'pending' ? 
              <HourglassFullIcon className={classes.pending}/>
              : <CheckCircleIcon className={classes.confirmed}/>
            }
          </ListItem>
        )
      }
    }
  }

  console.log(allData)

  return (
    <Container fixed className={classes.mainContainer}>
      <Grid container fixed spacing={3} className={classes.subMainContainer}>
        <Grid item xs={12} md={6} className={classes.imgContainer}>
          <img className={classes.image} src={cooker} alt="cooker"></img>   
        </Grid>
        <Grid item xs={12} md={6} className={classes.textContainer}>
          <Paper className={classes.textPaper}>
          <List className={classes.root}>
            {allData && allData.map((data) => {
              return handleItemListDisplay(data, user)
            })}
          </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default MyTransactions
