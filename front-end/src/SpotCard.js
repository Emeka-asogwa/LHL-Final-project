import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

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
  const { spot } = props;
  
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
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
      </CardActions>
    </Card>
  );
}
