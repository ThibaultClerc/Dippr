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
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(id, name, description, rate, icon, photo_url) {
  return { id, name, description, rate, icon, photo_url };
}

const UserDishes = (profileId) => {
  const user = useSelector(state => state.user.user);

    const [data, setData] = useState([])

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
        
        if (user.attributes.is_admin === true ){
          fetchData(`https://dippr-api-development.herokuapp.com/api/user_dishes`)
        } else {
          fetchData(`https://dippr-api-development.herokuapp.com/api/users/${profileId.profileId}/user_dishes`)
        }
      }, []);

      const rows = [];
        data.map(dish => {
          rows.push(
            createData(dish.id, dish.attributes.name, dish.attributes.description, dish.attributes.dish_rating, <DeleteForeverIcon/> ,dish.attributes.photo_url) 
          );
        })
      

      const classes = useStyles();

    return (
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Id </TableCell>
            <TableCell>Nom du plat </TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Note</TableCell>
            {user.attributes.is_admin === true ? <TableCell align="left">Supprimer</TableCell> : ''}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="left">{row.rate}</TableCell>
              {user.attributes.is_admin === true ? <TableCell align="left"><Button key="btn-logout" as={Link} to ={`/admin`} variant="outlined" color="secondary" >{row.icon}</Button></TableCell> : ''}

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
}

export default UserDishes