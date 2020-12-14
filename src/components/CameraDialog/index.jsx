import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Webcam from "react-webcam";


export default function CameraDialog() {
  const [open, setOpen] = React.useState(false);
  const webcamRef = React.useRef(null);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const videoConstraints = {
    aspectRatio: 0.56,
    facingMode: "environment" 
  };
  return (
    <>
    <div>
      <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
        <PhotoCameraIcon/>
      </IconButton>
      </div>
      <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Webcam
              audio={false}
              ref={webcamRef}
              width={426} 
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
          </DialogActions>
      
      </Dialog>
    </div>
    </>
  );
}
