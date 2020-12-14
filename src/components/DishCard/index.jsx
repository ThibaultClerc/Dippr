// import React from 'react';
// import Card from 'react-bootstrap/Card';
// import { Link } from 'react-router-dom';

// const DishCard = ({market_dish_id, name, description, dish_rating, user_id, created_at, type}) => {
//   return (
//     <Card as={Link} to={`/marketdishes/${market_dish_id}`} style={{ textDecoration: 'none' }}>
//       <Card.Img variant="top" src="holder.js/100px160" />
//       <Card.Body>
//         <Card.Title>{name}</Card.Title>
//         <Card.Text>{description}</Card.Text>
//         <small className="text-muted">{type}</small>
//         <Card.Text as={Link} to={`/profile/${user_id}`}>Qui a fait ce plat ?</Card.Text>
//       </Card.Body>
//       <Card.Footer>
//         <small className="text-muted">{dish_rating}</small> • 
//         <small className="text-muted"> {created_at}</small>
//       </Card.Footer>
//     </Card>
//   )
// }

// export default DishCard

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Stars from '../UI/Stars'
import "./index.scss"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '200',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '45%',
      maxHeight: 220,
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  header: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  title: {
    fontSize: '1em',
    fontWeght: "bold",
    wordWrap: "break-word"
  },
  description: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    wordWrap: "break-word"
  }
}));

const DishCard = ({market_dish_id, name, description, dish_rating, user_id, created_at, type, first_name}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={first_name}
        subheader={created_at}
        className={classes.header}
      />
      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <CardContent>
      <Typography className={classes.title} variant="h4" color="textSecondary" component="h5">
          {name}
        </Typography>
        <Typography className={classes.description} variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
        {/* <Stars className={classes.stars} dish_rating={dish_rating}/> */}
        </CardContent>
      
    </Card>
  );
}

export default DishCard;
