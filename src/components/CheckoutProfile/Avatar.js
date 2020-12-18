import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AvatarCard from './AvatarCard'


export default function Avatar({picture}) {
  const [file, setFile] = useState(null);

  const handleFile = (value) => {
    setFile(value)
    picture(value)
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Avatar
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AvatarCard picture={content => handleFile(content)}/>
        </Grid>
      </Grid>

    </React.Fragment>
  );
}