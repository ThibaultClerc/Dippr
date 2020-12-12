import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSelector, useDispatch } from 'react-redux';
import Announcement from '../../pages/Annoucement';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function TransitionsModal({value, visibleModal}) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user);
  const classes = useStyles();
  const [open, setOpen] = React.useState(value);

  const handleClose = () => {
    setOpen(false);
    visibleModal(false)
  };

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
          <div>
            <Announcement/>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
