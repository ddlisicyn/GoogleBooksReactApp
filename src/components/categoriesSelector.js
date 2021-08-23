import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    padding: '2px 4px',
    background: 'white',
    borderRadius: '5px',
    minWidth: 100
  },
}));

export default function CategorySelector({onFinish}) {
  const classes = useStyles();
  const [category, setCategory] = useState('all');

  const handleChange = (event) => {
    setCategory(event.target.value);
    onFinish(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={category}
          onChange={handleChange}
        >
          <MenuItem value={'all'}>all</MenuItem>
          <MenuItem value={'art'}>art</MenuItem>
          <MenuItem value={'biography'}>biography</MenuItem>
          <MenuItem value={'computers'}>computers</MenuItem>
          <MenuItem value={'history'}>history</MenuItem>
          <MenuItem value={'medical'}>medical</MenuItem>
          <MenuItem value={'poetry'}>poetry</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}