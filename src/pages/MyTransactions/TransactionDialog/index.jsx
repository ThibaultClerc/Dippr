import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import MuiDialogActions from '@material-ui/core/DialogActions';

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
  },
  image: {
    width: "-webkit-fill-available"
  }
}))

const TransactionDialog = ({open, handleSelectedValue, handleClose, transaction, answerer, caller, currentUser}) => {
  const classes = useStyles();

  const handleListItemClick = (userResponse) => {
    if (userResponse !== null) {
      handleSelectedValue(userResponse)
      handleClose(false)
    }
  }

  const handleModalClose = () => {
    handleClose(false)
  }

  const handleItemDisplay = () => {
    if (transaction.type === "trocs") {
      if (answerer.id == currentUser.id) {
        return (
          <>
            <img className={classes.image} src={`https://dippr-api-production.herokuapp.com${transaction.meta.caller_dish.photo_url}`}></img>
            <ListItem key={transaction.id} button>
              <ListItemAvatar>
                <Avatar
                  // alt={`Avatar n°${value + 1}`}
                  // src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={transaction.id} primary={caller.first_name} />
              <Typography variant="body2" color="textPrimary">
                {caller.city}
              </Typography>
            </ListItem>
            <DialogContent dividers>
              <Typography variant="body1" color="textPrimary">
                {caller.first_name} souhaite échanger son {transaction.meta.caller_dish.name} contre votre 
                  {transaction.meta.answer_dish.name}
              </Typography>
            </DialogContent>
            <MuiDialogActions>
              <Button autoFocus onClick={() => handleListItemClick(1)} color="primary">
                ACCEPTER
              </Button>
              <Button autoFocus onClick={() => handleListItemClick(2)} color="secondary">
                REFUSER
              </Button>
            </MuiDialogActions>
          </>
        )
      } else {
        return (
          <>
            <img className={classes.image} src={`https://dippr-api-production.herokuapp.com${transaction.meta.answer_dish.photo_url}`}></img>
            <ListItem key={transaction.id} button>
              <ListItemAvatar>
                <Avatar
                  // alt={`Avatar n°${value + 1}`}
                  // src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={transaction.id} primary={answerer.first_name} />
              <Typography variant="body2" color="textPrimary">
                {answerer.city}
              </Typography>
            </ListItem>
            <DialogContent dividers>
              <Typography variant="body1" color="textPrimary">
                Vous avez proposé votre {transaction.meta.caller_dish.name} à
                {answerer.first_name} contre son  {transaction.meta.answer_dish.name}
              </Typography>
            </DialogContent>
            <MuiDialogActions>
              <Button autoFocus onClick={() => handleListItemClick(3)} color="secondary">
                ANNULER LA DEMANDE
              </Button>
            </MuiDialogActions>
          </>
        )
      }
    } else if (transaction.type === "donations") {
      if (caller.id == currentUser.id) {
        return (
          <>
            <img className={classes.image} src={`https://dippr-api-production.herokuapp.com${transaction.meta.answer_dish.photo_url}`}></img>
            <ListItem key={transaction.id} button>
              <ListItemAvatar>
                <Avatar
                  // alt={`Avatar n°${value + 1}`}
                  // src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={transaction.id} primary={caller.first_name} />
              <Typography variant="body2" color="textPrimary">
                {caller.city}
              </Typography>
            </ListItem>
            <DialogContent dividers>
              <Typography variant="body1" color="textPrimary">
                Vous avez demandé à {answerer.first_name} son 
                {transaction.meta.answer_dish.name}
              </Typography>
            </DialogContent>
            <MuiDialogActions>
              <Button autoFocus onClick={() => handleListItemClick(3)} color="secondary">
                ANNULER LA DEMANDE
              </Button>
            </MuiDialogActions>
          </>
        )
      } else {
        return (
        <>
          <img className={classes.image} src={`https://dippr-api-production.herokuapp.com${transaction.meta.answer_dish.photo_url}`}></img>
          <ListItem key={transaction.id} button>
            <ListItemAvatar>
              <Avatar
                // alt={`Avatar n°${value + 1}`}
                // src={`/static/images/avatar/${value + 1}.jpg`}
              />
            </ListItemAvatar>
            <ListItemText id={transaction.id} primary={caller.first_name} />
            <Typography variant="body2" color="textPrimary">
              {caller.city}
            </Typography>
          </ListItem>
          <DialogContent dividers>
            <Typography variant="body1" color="textPrimary">
              {caller.first_name} vous a demandé votre
              {transaction.meta.answer_dish.name}
            </Typography>
          </DialogContent>
          <MuiDialogActions>
            <Button autoFocus onClick={() => handleListItemClick(1)} color="primary">
              ACCEPTER
            </Button>
            <Button autoFocus onClick={() => handleListItemClick(1)} color="secondary">
              REFUSER
            </Button>
          </MuiDialogActions>
        </>
        )
      }
    }
  }

  return (
    <>
      <Dialog onClose={handleModalClose} aria-labelledby="simple-dialog-title" open={open}>
        {handleItemDisplay()}
      </Dialog>
    </>
  );
}

export default TransactionDialog;
