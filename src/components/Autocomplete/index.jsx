import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const AutocompleteSearchBar = ({content, title, data}) =>{
  const [currentTitle,setCurrentTitle] = useState(title);
  const [currentValues, setCurrentValues] = useState(content);
  const [elements, setElements] = useState([]);
  const classes = useStyles();


  const addElement = (event, values) => {
    setElements(values)
    data(values)
  };

  return(

          <Autocomplete
          multiple
          id="combo-box-demo"
          options={currentValues}
          getOptionLabel={(options) => options.type}
          style={{ width: 270 }}
          onChange={addElement}
          renderInput={(params) => 
          <TextField required {...params} label={currentTitle} variant="outlined"/>}
          />
  
  )
};

export default AutocompleteSearchBar;