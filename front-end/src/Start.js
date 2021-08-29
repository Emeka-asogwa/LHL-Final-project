import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

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
  const { users } = props;

  function getName(id) {
    console.log(id);
    return users.filter(user => user.id === id)[0].name;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography component="h1" variant="h5">
        Welcome {getName(history.location.state.userId)}!
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
