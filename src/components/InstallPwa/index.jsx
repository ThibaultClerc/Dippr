import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ShareIcon from '../../assets/img/share-icon.png'


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const InstallPWA = ({...props}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    React.useEffect(
        () => {
          handleOpen(true)
        }, []
    )
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Installer Dippr</h2>
              <p id="transition-modal-description">Appuyez sur                         
              <img
                            src={ShareIcon}
                            alt="Add to homescreen"
                            height="20"
                            width="20"
                            />
                            et "Sur l'écran d'accueil" pour avoir une meilleure expérience</p>
            </div>
          </Fade>
        </Modal>
      </div>
    );
}