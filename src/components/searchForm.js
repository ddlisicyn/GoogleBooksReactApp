import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    minWidth: 280,
    width: 800
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  }
}));

export default function SearchForm({onFinish}) {
  const classes = useStyles();
  const [request, setRequest] = useState('');

  const handleChange = (event) => {
    setRequest(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    onFinish(request);
  };

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search any book"
        inputProps={{ 'aria-label': 'Search any book' }}
        onChange={handleChange}
      />
      <IconButton 
       type="submit" 
       className={classes.iconButton} 
       aria-label="search"
       onClick={handleClick}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}