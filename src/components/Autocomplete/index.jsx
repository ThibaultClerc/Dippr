import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { Badge, Table } from "react-bootstrap";


const AutocompleteSearchBar = ({content, title}) =>{
  const [currentTitle,setCurrentTitle] = useState(title);
  const [currentValues, setCurrentValues] = useState(content);
  const [data, setData] = useState([]);

  const addElement = (event, values) => {
    console.log(values)
    setData(values)
  };

  return(
    <>
    
    <Autocomplete
    multiple
    id="combo-box-demo"
    options={currentValues}
    getOptionLabel={(options) => options.type}
    style={{ width: 600 }}
    onChange={addElement}
    renderInput={(params) => <TextField {...params} label={currentTitle} variant="outlined"/>}
    />


  </>
  )
};

export default AutocompleteSearchBar;