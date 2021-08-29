import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from './config/axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50ch',
    },
  },
}));

export default function Start(props) {
  const classes = useStyles();
  const history = useHistory();
  
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    axios.get("/users").then(res => {
      console.log("Response has comeback!");
      console.log(res);
      setUsers(res.data);
    });
  }, []);

  useEffect(() => {
    setUser(getName(history.location.state?.userId));
  }, [users])

  function getName(id) {
    console.log(id);
    const user = users.filter(user => user.id === id)[0]
    return (user) ? user.name : "Default User";
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography component="h1" variant="h5">
        Welcome {user}!
      </Typography>
      <Typography component="h1" variant="h5">
        You currently have no date spots.
      </Typography>
      <Link href="/generatelist" variant="body2">
        Click here to get started.
      </Link>
    </Container>
  )
}
