import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import avatar from '../../assets/img/avatar.png'
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
  },
  media: {
    height: 250,
  },
});

export default function AvatarCard({picture, imageAvatar}) {

  const [currentavatar,setCurrentAvatar]=useState(imageAvatar === null ? avatar:URL.createObjectURL(imageAvatar))
  const classes = useStyles();
  const imageSrc = useRef(null)
  const [file, setFile] = useState(null)

  const handleFile = ({target}) =>{
    setFile(target.files[0]);
    picture(target.files[0]);
    setCurrentAvatar(URL.createObjectURL(target.files[0]));
  };


  return (
    
    <Card className={classes.root}>
      <input accept="image/*" className={classes.input} id="icon-button-file" hidden type="file" ref={imageSrc} onChange={handleFile}/>
      <CardActionArea button ="true" htmlFor="icon-button-file">
        <CardMedia
          className={classes.media}
          image={currentavatar}
          component="label"
          title="Avatar"
          htmlFor="icon-button-file"
        />
      </CardActionArea>
      <CardActions>
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span" onClick={()=>imageSrc.current}>
          <PhotoCamera />
        </IconButton>
      </label>
      </CardActions>
    </Card>
  );
}
