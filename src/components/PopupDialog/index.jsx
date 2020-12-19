import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import useDeviceDetect from "../DeviceDetect";

const useStyles = makeStyles((theme) => ({
  button: {
    "&:focus": {
      backgroundColor:'#edf5ff',
    },
  },
  submitBtn: {
    marginTop: 10,
    margin: 'auto',
    display: 'block',
    padding: 10
  }
}))

const PopupDialog = ({userID, open, handleSelectedValue, handleClose}) => {
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const { isMobile } = useDeviceDetect();
  const classes = useStyles();

  const handleListItemClick = (userMarketDishID) => {
    setSelectedValue(userMarketDishID)
  }
  
  const handleClick = () => {
    if (selectedValue !== null) {
      handleSelectedValue(selectedValue)
      handleModalClose(false)
    }
  }

  const handleModalClose = () => {
    setSelectedValue(null)
    handleClose(false)
  }

  useEffect(() => {
    fetch(`https://dippr-api-production.herokuapp.com/api/users/${userID}/market_dishes`, {
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
    })
  }, [])

  return (
    <>
      <Dialog onClose={handleModalClose} aria-labelledby="simple-dialog-title" open={open}>
        {data.length !== 0 &&
          <DialogTitle id="simple-dialog-title">Choisissez votre plat à troquer</DialogTitle>
        }
        <List>
          {data.length !== 0 ? data.map((dataItem) => (
            <>
              <ListItem button onClick={() => handleListItemClick(dataItem.id)} key={dataItem.id} className={classes.button}>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={dataItem.meta.user_dish.name} />
              </ListItem>
              <Button autoFocus  color="primary" onClick={handleClick} className={classes.submitBtn}>
                Envoyer la demande
              </Button>
            </>
            ))
            :
            <DialogContent style={{textAlign: 'center'}}>
              <DialogContentText id="alert-dialog-description">
                Tu n'as pas de plat sur le marché à proposer en troc <SentimentVeryDissatisfiedIcon/>
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                Ajoutes-en un en cliquant sur {isMobile ? <AddCircleOutlineIcon/> : '"Poster une annonce"'}
              </DialogContentText>
            </DialogContent>
          }
        </List>
      </Dialog>
    </>
  );
}

export default PopupDialog;
