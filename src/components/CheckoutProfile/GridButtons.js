import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import useDeviceDetect from "../DeviceDetect"
import burger from '../../assets/img/burger.jpg';
import dessert from '../../assets/img/dessert.jpg';
import cake from '../../assets/img/cake.jpg';
import french from '../../assets/img/french.jpg';
import indian from '../../assets/img/indian.jpg';
import italian from '../../assets/img/pasta.jpg';
import soup from '../../assets/img/soup.jpg';
import gratin from '../../assets/img/gratin.jpg';
import thai from '../../assets/img/thai.jpg';
import paella from '../../assets/img/paella.jpg';
import yassa from '../../assets/img/yassa.jpeg';
import houmous from '../../assets/img/houmous.jpg';


const images = [
  {
    url: dessert,
    title: 'Dessert',
    width: '25%',
    id: 1,
  },
  {
    url: cake,
    title: 'Patisserie',
    width: '25%',
    id: 2,
  },
  {
    url: soup,
    title: 'Soupe',
    width: '25%',
    id: 3,
  },
  {
    url: gratin,
    title: 'Gratins',
    width: '25%',
    id: 4,
  },
  {
    url: french,
    title: 'Française',
    width: '25%',
    id: 5,
  },
  {
    url: italian,
    title: 'Italie',
    width: '25%',
    id: 6,
  },
  {
    url: yassa,
    title: 'Afrique',
    width: '25%',
    id: 7,
  },
  {
    url: thai,
    title: 'Asie',
    width: '25%',
    id: 8,
  },
  {
    url: houmous,
    title: 'Orientale',
    width: '25%',
    id: 9,
  },
  {
    url: paella,
    title: 'Espagne',
    width: '25%',
    id: 10,
  },
  {
    url: indian,
    title: 'Inde',
    width: '25%',
    id: 11,
  },
  {
    url: burger,
    title: 'Antillaise',
    width: '25%',
    id: 12,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image1: {
    position: 'relative',
    height: 150,
    [theme.breakpoints.down('xs')]: {
      width: '50% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },  
  image2: {
    position: 'relative',
    height: 150,
    [theme.breakpoints.down('xs')]: {
      width: '50% !important', // Overrides inline-style
      height: 100,
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.50,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
  imageBorder: {
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    border: '4px solid currentColor',
  },
}));

const  ButtonBases = ({title, selectedDishes, currentDishes}) => {
  const [selected, setSelected] = useState(currentDishes === null ? []:currentDishes);
  const [currentTitle, setCurrentTitle] = useState(title)
  const classes = useStyles();
  const { isMobile } = useDeviceDetect();

  const handleClick = (value) => {
    if (checkSelected(value) && selected.length < 3){
      setSelected([...selected, value]);
      selectedDishes([...selected, value]);
    } else if (!checkSelected(value)){
      const newArray = selected.filter(x => x !== value);
      setSelected(newArray);
      selectedDishes(newArray);
    }
  };

  const checkSelected = (data) => {
    const checkValue = selected.filter(id => id === data)
    if (checkValue.length > 0){
      return false
    } else {
      return true
    }
  };

  useEffect(() => {
  }, [isMobile])

  return (
    <>
    <Typography variant="h6" gutterBottom>
      {currentTitle} {selected.length}/3
    </Typography>
    <div className={classes.root}>
      {images.map((image) => (
        <ButtonBase
          focusRipple
          key={image.title}
          className={isMobile ? classes.image2 : (selected.length < 3 ? classes.image1 : classes.image2)}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width,
          }}
          onClick={()=>handleClick(image.id)}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${image.url})`,
            }}
          />
          {checkSelected(image.id) && <span className={classes.imageBackdrop} />}
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={checkSelected(image.id)? classes.imageTitle :  classes.imageBorder}
            >
              {image.title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      ))}
    </div>
    </>
  );
}

export default ButtonBases;