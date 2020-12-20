import React, { useState, useEffect } from 'react';
import { Grid, Container, Paper, Chip, Avatar } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import cooker from '../../assets/img/cooker.png';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TransactionDialog from './TransactionDialog';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import './index.scss';

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
      margin: '0 !important',
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
    margin: 'auto',
    display: "block",
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  textContainer: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '0 !important',
      paddingRight: '0 !important',
      paddingTop: '0 !important',
    }
  },
  textPaper: {
    borderRadius: 35,
    padding: 25,
    marginBottom: 20,
    minHeight: 500,
    maxHeight: 500,
    overflow: 'auto',
    webkitBoxShadow: 'inset -2px -15px 70px -40px rgba(0,0,0,0.30)',
    mozBoxShadow: 'inset -2px -15px 70px -40px rgba(0,0,0,0.30)',
    boxShadow: 'inset -2px -15px 70px -40px rgba(0,0,0,0.30)',
    [theme.breakpoints.down('xs')]: {
      borderRadius: 0,
      marginBottom: 0,
      webkitBoxShadow: '0px 0px 0px 0px rgba(0,0,0,0)',
      mozBoxShadow: '0px 0px 0px 0px rgba(0,0,0,0)',
      boxShadow: '0px 0px 0px 0px rgba(0,0,0,0)',
      maxHeight: 'none',
    },
    "&::-webkit-scrollbar": {
      display: 'none'
    },
    msOverflowStyle: 'none',  /* IE and Edge */
    scrollbarWidth: 'none'
  },
  itemText: {
    marginRight: '20px',
    [theme.breakpoints.down('xs')]: {
      fontSize: "smaller"
    },
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
  const [selectedTransaction, setSelectedTransaction] = useState([])
  const [selectedAnswerer, setSelectedAnswerer] = useState([])
  const [selectedCaller, setSelectedCaller] = useState([])
  const [open, setOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRefused, setIsRefused] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);


  useEffect(() => {
    fetchUserTransactions("trocs")
    fetchUserTransactions("donations")
    const interval = setInterval(() => {
      fetchUserTransactions("trocs")
      fetchUserTransactions("donations")
    }, 10000);
    return () => clearInterval(interval);
  }, [])

  

  const fetchUserTransactions = (type) => {
    fetch(`http://localhost:3090/api/users/${user.id}/${type}`, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": Cookies.get("token")
      }
    })
    .then((response) => response.json())
    .then((response) => {
      if (type === "trocs") {
        console.log(response.data, "response trocs")
        const trocs = response.data
          .filter(transaction => (transaction.attributes.status === 'pending') || (transaction.attributes.status === 'confirmed'))
        setTrocData(trocs)
        console.log(trocs)
      } else {
        console.log(response.data, "response donations")
        const donations = response.data
          .filter(transaction => (transaction.attributes.status === 'pending') || (transaction.attributes.status === 'confirmed'))
        setDonationData(donations) 
        console.log(donations)
      }
    }).catch(error => {
      console.log(error)
    }).finally(() => {
    })
  }

  useEffect(() => {
    // if (trocData.length === 0 || donationData.length === 0) {
    //   return
    // }
    const allData = trocData.concat(donationData)
    allData.sort((a, b) => (b.attributes.updated_at).localeCompare((a.attributes.updated_at)))
    setAllData([...allData])
  }, [trocData, donationData])

  const handleTransactionClick = (transaction, answerer, caller) => {
    setSelectedTransaction(transaction)
    setSelectedAnswerer(answerer)
    setSelectedCaller(caller)
    setOpen(true)
  }

  const handleItemListDisplay = (transaction, currentUser) => {
    if (transaction.type === "trocs") {
      if (transaction.attributes.answerer_id == currentUser.id) {
        return (
          <ListItem spacing={3} button onClick={() => handleTransactionClick(transaction, currentUser, transaction.meta.caller)}>
            <ListItemAvatar>
              <Avatar
                // alt={`Avatar n°${data.id + 1}`}
                // src={`/static/images/avatar/${value + 1}.jpg`}
              />
            </ListItemAvatar>
            <ListItemText
              dense
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
          <ListItem spacing={3} button onClick={() => handleTransactionClick(transaction, transaction.meta.answerer, currentUser)}>
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
      if (transaction.attributes.caller_id == currentUser.id) {
        return (
          <ListItem spacing={3} button onClick={() => handleTransactionClick(transaction, transaction.meta.answerer, currentUser)}>
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
        return (
          <ListItem spacing={3} button onClick={() => handleTransactionClick(transaction, currentUser, transaction.meta.caller)}>
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

  const handleTransactionCreation = (userAnswer) => {
    let transactionData;
    let type;
      if (selectedTransaction.type === "trocs") {
      type = "trocs"
      transactionData = {
        status: userAnswer
      }
    } else {
      type = "donations"
      transactionData = {
        status: userAnswer
      }
    }
    fetch(`http://localhost:3090/api/${type}/${selectedTransaction.id}`, {
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
      if (userAnswer === 1) {
        setIsAccepted(true)
      } else if (userAnswer === 2) {
        setIsRefused(true)
      } else {
        setIsCancelled(true)
      }
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    let acceptedTimeout;
    if (isAccepted) {
      acceptedTimeout = setTimeout(() => {
        setIsAccepted(false)
      }, 2000)
    }
    return () => {
      clearTimeout(acceptedTimeout)
    }
  }, [isAccepted])

  useEffect(() => {
    let refusedTimeout;
    if (isRefused) {
      refusedTimeout = setTimeout(() => {
        setIsRefused(false)
      }, 2000)
    }
    return () => {
      clearTimeout(refusedTimeout)
    }
  }, [isRefused])

  useEffect(() => {
    let cancelledTimeout;
    if (isCancelled) {
      cancelledTimeout = setTimeout(() => {
        setIsCancelled(false)
      }, 2000)
    }
    return () => {
      clearTimeout(cancelledTimeout)
    }
  }, [isCancelled])

  
  
  return (
    <>
    {isAccepted && 
      <Collapse
        in={isAccepted}
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
                setIsAccepted(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {selectedTransaction.type === "trocs" ? 
            `La demande de troc a bien été acceptée !`
            : `La demande de don a bien été acceptée !`
          }
        </Alert>
      </Collapse>
    }
    {isRefused && 
      <Collapse
        in={isRefused}
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
                setIsRefused(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {selectedTransaction.type === "trocs" ? 
            `La demande de troc a bien été refusée !`
            : `La demande de don a bien été refusée !`
          }
        </Alert>
      </Collapse>
    }
    {isCancelled && 
      <Collapse
        in={isCancelled}
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
                setIsCancelled(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {selectedTransaction.type === "trocs" ? 
            `La demande de troc a bien été annulée !`
            : `La demande de don a bien été annulée !`
          }
        </Alert>
      </Collapse>
    }
    {open &&
      <TransactionDialog
        open={open}
        handleClose={(closeValue) => setOpen(closeValue)}
        handleSelectedValue={(userAnswer) => handleTransactionCreation(userAnswer)}
        transaction={selectedTransaction}
        answerer={selectedAnswerer}
        caller={selectedCaller}
        currentUser={user}
      />
    }
      <Grid container fixed spacing={3} className={classes.subMainContainer} alignItems="center">
        <Grid item xs={12} md={6} className={classes.imgContainer} >
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
    </>
  )
}

export default MyTransactions
