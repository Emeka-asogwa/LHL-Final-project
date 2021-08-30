import React from "react";
// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";
import "./datetime.css"
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    backgroundColor: theme.palette.background.paper,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  label: {
    cursor: "pointer",
    paddingLeft: "0",
    color: "rgba(0, 0, 0, 0.26)",
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    display: "inline-flex"
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function MutualList(){
  const classes = useStyles();
  const [secondary, setSecondary] = React.useState(true);
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            You and your partner both chose:
          </Typography>
          <div className={classes.demo}>
          <List dense className={classes.root}>
            {[0, 1, 2, 3].map((value) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <ListItem key={value} button>
                  <ListItemAvatar>
                    <Avatar
                      alt={"placeholder-image"}
                      src={"https://source.unsplash.com/random"}
                    />
                  </ListItemAvatar>
                  <ListItemText 
                    id={labelId}
                    primary={`Line item ${value + 1}`} 
                    secondary={secondary ? 'Secondary text' : null}
                  />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(value)}
                      checked={checked.indexOf(value) !== -1}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel className={classes.label}>
            Choose a date and time for your date night:
          </InputLabel>
          <br />
          <FormControl maxWidth="xs">
            <Datetime
              inputProps={{ placeholder: "Date & Time" }}
            />
          </FormControl>
          <form className={classes.container} noValidate>
            <TextField
              id="datetime-local"
              label="Date & Time"
              type="datetime-local"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        Chooose your date spot
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
      >
        Pick a random date spot
      </Button>
      <Button
        variant="outlined"
        startIcon={<AddCircleIcon color="primary"/>}
      >
        Add more spots
      </Button>
    </div>
  );
}