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
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const videoConstraints = {
    width: 720,
    height: 1280,
    facingMode: "environnement"
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
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Webcam
              audio={false}
              ref={webcamRef}
              height={1280}
              screenshotFormat="image/jpeg"
              width={720}
              videoConstraints={videoConstraints}
            >
        </Webcam>
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
