import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const AutocompleteSearchBar = ({content, title, data}) =>{
  const [currentTitle,setCurrentTitle] = useState(title);
  const [currentValues, setCurrentValues] = useState(content);
  const [elements, setElements] = useState([]);

  const addElement = (event, values) => {
    setElements(values)
    data(values)
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
    renderInput={(params) => <TextField required {...params} label={currentTitle} variant="outlined"/>}
    />


  </>
  )
};

export default AutocompleteSearchBar;