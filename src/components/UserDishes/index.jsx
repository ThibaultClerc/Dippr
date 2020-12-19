import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Loader from '../../components/UI/Loader';
import {Link, useParams} from "react-router-dom";
import UserDishCard from '../UserDishCard'
import CardColumns from 'react-bootstrap/CardColumns'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, description, rate, photo_url) {
  return { name, description, rate, photo_url };
}

const UserDishes = (profileId) => {
  const classes = useStyles();
  const user = useSelector(state => state.user.user);
  const [data, setData] = useState([]);
  const rows = [];

  data.map(dish => {
    rows.push(
      createData(dish.attributes.name, dish.attributes.description, dish.attributes.dish_rating, dish.attributes.photo_url) 
    );
  })

  const fetchData = (url) => {
    fetch(url, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json",
        'Authorization': `${Cookies.get('token')}`
      },
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      setData(response.data)
    }).catch(error => {
      console.log(error)
    })
  };

  useEffect(() => {
    if (user.attributes.email === "admin@admin.fr" ) {
      fetchData(`https://dippr-api-development.herokuapp.com/api/user_dishes`)
    } else {
      fetchData(`https://dippr-api-development.herokuapp.com/api/users/${profileId.profileId}/user_dishes`)
    }
  }, []);
      
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nom du plat </TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Note</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="left">{row.rate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserDishes;