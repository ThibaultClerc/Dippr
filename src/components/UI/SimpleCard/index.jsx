import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 275,
    maxHeight: 320,
    textAlign: 'center',
    padding: '1rem',
    margin: "2rem !important"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  text: {
    marginTop: '1rem',
  },
});

const SimpleCard = ({img, content, alt}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <img alt={alt} src={img} width="150px"></img>
        <Typography variant="h5" component="h2" className={classes.text}>
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SimpleCard