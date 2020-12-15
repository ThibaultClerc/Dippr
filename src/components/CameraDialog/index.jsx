import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Webcam from "react-webcam";
import CancelIcon from '@material-ui/icons/Cancel';

export default function CameraDialog() {
  const [open, setOpen] = React.useState(false);
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const theme = useTheme();

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

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

  const photoIcon = (value)=>(
    <>
    <IconButton variant="outlined" color="primary" onClick={value}>
        <PhotoCameraIcon/>
      </IconButton>
    </>
  )
  return (
    <>
      <div>
      {photoIcon(()=>handleClickOpen())}
      </div>
      <div>
      <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      >
      {imgSrc !==null && (
      <img src={imgSrc}/>
      )}

      {imgSrc === null && <Webcam
            audio={false}
            ref={webcamRef}
            width={'300vh'} 
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />}

        <DialogActions>
          {imgSrc === null && photoIcon(()=>capture())}

          {imgSrc && <CancelIcon onClick={()=>setImgSrc(null)}/>}

          <Button onClick={handleClose} color="primary" autoFocus>
                    Valider
          </Button>
        </DialogActions>

      </Dialog>
    </div>
    </>
  );
}


