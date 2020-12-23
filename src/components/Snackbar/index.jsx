import React, { useState, useEffect }from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function AlertSnackBar({alertMessage,alertType}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null)
  const [alertSeverity, setAlertSeverity] = useState(null)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (alertType ==="SignupSuccessAlert"){
      setMessage(alertMessage)
      setAlertSeverity('info')
      handleOpen();
    }
  }, [])

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical:"top", horizontal :"center"}}>
        <Alert onClose={handleClose} severity={alertSeverity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
