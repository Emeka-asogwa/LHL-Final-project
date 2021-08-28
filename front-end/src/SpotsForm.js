import React, { useState } from 'react';
import axios from './config/axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SpotCard from './SpotCard';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50ch',
    },
  },
}));

export default function SpotsForm(props) {
  const classes = useStyles();
  const [location, setLocation] = useState('');
  const { spots } = props;
  const [filteredSpots, setFilteredSpots] = useState(spots);

  /*function handleSubmit(e) {
    e.preventDefault();
    setFilteredSpots(spots.filter(spot => spot.location.toLowerCase().includes(location.toLowerCase())));
  }*/

  function handleOnChange(e) {
    setLocation(e.target.value);
    setFilteredSpots(spots.filter(spot => spot.location.toLowerCase().includes(location.toLowerCase())));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form className={classes.root} noValidate>
        <TextField 
          id="standard-basic"
          label="Partner"
          placeholder="Enter your partner's email"
        />
        <TextField 
          id="standard-basic"
          label="Location"
          placeholder="Enter your location"
          value={location}
          onChange={e => handleOnChange(e)}
        />
        {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Next
          </Button> */}
      </form>
      <div>
        {filteredSpots.map(spot => (<SpotCard spot={spot} />))}
      </div>
    </Container>
  )
}
