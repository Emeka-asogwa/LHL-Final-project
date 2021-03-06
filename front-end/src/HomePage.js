import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ProductHeroLayout from "./ProductHeroLayout";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';

const backgroundImage =
  'https://source.unsplash.com/5JwBbnyZzfc/';

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
    height: "100vh",
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(6),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
    fontWeight: 600,
  },
  h2: {
    fontWeight: 500,
  },
  more: {
    marginTop: theme.spacing(2),
  },
}));

export default function HomePage() {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("userID")) {
      history.push('/mutuallist');
    }
  }, []);
  
  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      <img style={{ display: 'none' }} src={backgroundImage} alt="background-img" />
      <Typography color="inherit" align="center" variant="h2" marked="center" className={classes.h2}>
        Too indecisive? Out of ideas?
      </Typography>
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
        Find a date spot that both you and your partner will love.
      </Typography>
      <Button
        color="primary"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
        href="/register"
      >
        Register
      </Button>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Plan your next date
      </Typography>
    </ProductHeroLayout>
  );
}