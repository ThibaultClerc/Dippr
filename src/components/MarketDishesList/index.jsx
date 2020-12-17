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
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(email,first_name, last_name, description, country, city, street, zip_code, phone_number, user_rating, dippers, icon) {
  return { email, first_name, last_name, description, country, city, street, zip_code, phone_number, user_rating, dippers, icon };
}

const MarketDishesList = (profileId) => {

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
        fetchData(`https://dippr-api-development.herokuapp.com/api/users`)
      }, []);

      const rows = [];
        data.map(user => {
          rows.push(
            createData(user.attributes.email, user.attributes.first_name, user.attributes.last_name, user.attributes.description,user.attributes.country, user.attributes.city, user.attributes.street, user.attributes.zip_code, user.attributes.phone_number, user.attributes.user_rating, user.attributes.dippers,   <CreateIcon/>
            ) 
          );
        })
      

      const classes = useStyles();

    return (
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Email </TableCell>
            <TableCell>Prénom </TableCell>
            <TableCell align="left">Nom</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Pays</TableCell>
            <TableCell align="left">Ville</TableCell>
            <TableCell align="left">Rue</TableCell>
            <TableCell align="left">Code Postal</TableCell>
            <TableCell align="left">Numéro</TableCell>
            <TableCell align="left">Note</TableCell>
            <TableCell align="left">Dippers</TableCell>
            <TableCell align="left">Modifier</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
             <TableCell component="th" scope="row">
                {row.email}
              </TableCell>

              <TableCell component="th" scope="row">
                {row.first_name}
              </TableCell>
              <TableCell align="left">{row.last_name}</TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="left">{row.country}</TableCell>
              <TableCell align="left">{row.city}</TableCell>
              <TableCell align="left">{row.street}</TableCell>
              <TableCell align="left">{row.zip_code}</TableCell>
              <TableCell align="left">{row.phone_number}</TableCell>
              <TableCell align="left">{row.user_rating}</TableCell>
              <TableCell align="left">{row.dippers}</TableCell>
              <TableCell align="left"><Button key="btn-logout" component={Link} to ="/users/edit" variant="outlined" color="secondary" >{row.icon}</Button></TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
}

export default MarketDishesList