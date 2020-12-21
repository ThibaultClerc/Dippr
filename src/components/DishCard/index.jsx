import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Stars from '../UI/Stars'
import moment from 'moment';
import "./index.scss";
import burger from '../../assets/img/burger.jpg'

const useStyles = makeStyles((theme) => ({
  dishCard: {
    width: '200',
    height: '100',
    [theme.breakpoints.down('xs')]: {
      maxWidth: 150,
      maxHeight: 200,
      minWidth: 150,
      minHeight: 200,
    },
    transition: "transform 0.15s ease-in-out",
    '&:hover': {
      cursor: "pointer",
      transform: "scale3d(1.05, 1.05, 1)"
    },
  },
  media: {
    height: "120px !important",
    paddingTop: '56.25%',
    [theme.breakpoints.down('xs')]: {
      height: "130px",
      paddingTop: 0
    },
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
    width: "2rem",
    height: "2rem"
  },
  header: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
  },
  title: {
    fontSize: '1em',
    fontWeight: "bold",
    wordWrap: "break-word",
    overflow: "hidden",
    whiteSpace: "nowrap",
    wordBreak: "break-word",
    textOverflow: "ellipsis",
  },
  description: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
    wordBreak: "break-word",
    textOverflow: "ellipsis",
    fontSize: '13px',
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  stars: {
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  textContainer: {
    padding: "200px"
  }
  }
}));

const DishCard = ({market_dish_id, name, description, dish_rating, user_id, created_at, user_first_name, photo_url}) => {
  const classes = useStyles();
  const history = useHistory();

  const handleCardClick = () => {
    history.push({
      pathname: `/marketdish/${market_dish_id}`
    });
  }

  const handleProfileClick = () => {
    history.push({
      pathname: `/users/${user_id}`
    });
  }

  const handleImageCard = (noPhoto, photo_url) => {
    if (photo_url === undefined) {
      return noPhoto
    } else {
      return `https://dippr-api-production.herokuapp.com${photo_url}`
    }
  }

  return (
    <Card className={classes.dishCard} onClick={(e) => handleCardClick(e)}>
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
        title={user_first_name}
        subheader={moment(created_at).fromNow()}
        className={classes.header}
        onClick={(e) => handleProfileClick(e)}
      />
      <CardMedia
        className={classes.media}
        image={handleImageCard(burger, photo_url)}
      />
      <CardContent className={classes.textContainer}>
      <Typography className={classes.title} variant="h4" color="textSecondary" component="h5">
          {name}
        </Typography>
        <Typography className={classes.description} variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
        <CardActions className={classes.stars}>
          <Stars dish_rating={dish_rating}/>
        </CardActions>
        </CardContent>
    </Card>
  );
}

export default withRouter(DishCard);
