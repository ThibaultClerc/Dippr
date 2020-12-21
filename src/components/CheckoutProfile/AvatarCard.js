import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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

export default function AvatarCard({picture}) {
  const [currentavatar,setCurrentAvatar]=useState(avatar)
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
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={currentavatar}
          title="Contemplative Reptile"
        />
      </CardActionArea>
      <CardActions>
      <input accept="image/*" className={classes.input} id="icon-button-file" hidden type="file" ref={imageSrc} onChange={handleFile}/>
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span" onClick={()=>imageSrc.current}>
          <PhotoCamera />
        </IconButton>
      </label>
      </CardActions>
    </Card>
  );
}
