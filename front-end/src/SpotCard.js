import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Grid, IconButton } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { useHistory } from "react-router-dom";
import axios from './config/axios';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function SpotCard(props) {
  const classes = useStyles();
  const { spot, partner, noButtons } = props;
  const history = useHistory();
  const [show, setShow] = useState(true);
  
  function handleClick(selected) {
    console.log("clicked");
    const user_spot = { partner_id: partner, selected, user_id: parseInt(localStorage.getItem("userID")), spot_id: spot.id };
    axios.post("/couple_spots", user_spot)
    .then(res => {
      console.log(res);
      setShow(prev => !prev)
    });
  }

  return (
    <>
      {show && <Grid item xs={4} sm={6} md={4}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={spot.image_url}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {spot.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {spot.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link to={{pathname: `/spots/detail`, spot}} style={{ textDecoration: 'none' }}>
              <Button size="small" color="primary">
                More Info
              </Button>
            </Link>
            {!noButtons &&
            <>
            <IconButton onClick={() => { handleClick(false) }}>
              <CancelIcon color="error" fontSize='medium'/>
            </IconButton>
            <IconButton onClick={() => { handleClick(true) }}>
              <CheckCircleIcon style={{ color: 'green' }} fontSize='medium'/>
            </IconButton>
            </>}
          </CardActions>
        </Card>
      </Grid>}
    </>
  );
}
