import React, { useState } from 'react';
import axios from './config/axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SpotCard from './SpotCard';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      display: "flex",
      margin: theme.spacing(3),
      width: '50ch',
    },
  },
  button: {    
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    width:'50ch',
  },
}));

export default function SpotsForm(props) {
  const classes = useStyles();
  const { spots } = props;
  const [location, setLocation] = useState('');
  const [partner, setPartner] = useState('');
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
    <Container component="main">
      <CssBaseline />
      <form className={classes.root} noValidate>
        <TextField 
          id="standard-basic"
          label="Partner"
          placeholder="Enter your partner's email"
          value={partner}
          onChange={e => setPartner(e.target.value)}
        />
        <TextField 
          id="standard-basic"
          label="Location"
          placeholder="Enter your location"
          value={location}
          onChange={e => handleOnChange(e)}
        />
      </form>
      <Grid container spacing={2} alignItems={'center'} justifyContent={'space-evenly'}>
        {filteredSpots.map(spot => (<SpotCard spot={spot} />))}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.button}
          href="/loading"
        >
          Generate List
        </Button>
      </Grid>
    </Container>
  )
}
