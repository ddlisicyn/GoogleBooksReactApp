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

export default function SortSelector({onFinish}) {
  const classes = useStyles();
  const [sort, setSort] = useState('newest');

  const handleChange = (event) => {
    setSort(event.target.value);
    onFinish(sort);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={sort}
          onChange={handleChange}
        >
          <MenuItem value={'relevance'}>relevance</MenuItem>
          <MenuItem value={'newest'}>newest</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}