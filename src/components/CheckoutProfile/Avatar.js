import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AvatarCard from './AvatarCard'
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie'


export default function Avatar({picture}) {
  const [file, setFile] = useState(null);
  const user = useSelector(state => state.user.user);

  const handleFile = (value) => {
    setFile(value)
    picture(value)
  }

  const handleFileUpload = (user_id) => {
    const formData = new FormData();
    formData.append("file", file);
    fetch(`https://dippr-api-production.herokuapp.com/api/users/${user.id}`, {
      "method": "PUT",
      "headers": {
        "Authorization": Cookies.get("token")
      },
      "body": formData
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    }).finally(() => {
    })
  };

  useEffect(()=>{
    handleFileUpload(user.id)
  },[file])


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