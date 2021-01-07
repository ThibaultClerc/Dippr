import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AvatarCard from './AvatarCard'

export default function Avatar({picture, imageAvatar }) {
  const [file, setFile] = useState(imageAvatar === null ? null:imageAvatar);

  const handleFile = (value) => {
    setFile(value)
    picture(value)
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Photo de profil
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <AvatarCard picture={content => handleFile(content)} imageAvatar={file}/>
        </Grid>
      </Grid>

    </React.Fragment>
  );
}