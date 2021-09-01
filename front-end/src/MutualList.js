import React, { useState, useEffect } from "react";
// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";
import "./datetime.css";
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
import axios from './config/axios';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Input } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 650,
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    marginTop: "2%",
    // marginLeft: "2%",
    // paddingLeft: "25%",
    // paddingRight: "25%",
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
    display: "inline-flex",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  dialog: {
    position: 'absolute',
    right: 50,
    top: 100,
    width: 500,
  },
}));

export default function MutualList(props) {
  const classes = useStyles();
  const [secondary, setSecondary] = React.useState(true);
  const [checked, setChecked] = React.useState([1]);
  const { spots } = props;
  const [mutualSpots, setMutualSpots] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios.get("/user_spots/mutual").then((res) => {
      console.log("Response has comeback!");
      console.log(res);
      setMutualSpots(res.data);
    });
  }, []);

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

  function getMutualSpots() {
    console.log(
      mutualSpots.map((spot) => spots.filter((s) => s.id === spot.spot_id)[0])
    );
    return mutualSpots.map(
      (spot) => spots.filter((s) => s.id === spot.spot_id)[0]
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant="h6" className={classes.title}>
            You and your partner both chose:
          </Typography>
          <div className={classes.demo}>
            <List className={classes.root}>
              {getMutualSpots().map((value) => {
                const labelId = `checkbox-list-secondary-label-${value.id}`;
                return (
                  <>
                  <ListItem key={value.id} button onClick={handleClickOpen}>
                    <ListItemAvatar>
                      <Avatar alt={value.title} src={value.image_url} />
                    </ListItemAvatar>
                    <ListItemText
                      id={labelId}
                      primary={value.title}
                      secondary={secondary ? value.description : null}
                    />
                    {/* <ListItemSecondaryAction>
                      <Checkbox
                        edge="end"
                        onChange={handleToggle(value)}
                        checked={checked.indexOf(value) !== -1}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemSecondaryAction> */}
                  </ListItem>
                  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" classes={{ paper: classes.dialog }}>
                    <DialogTitle id="form-dialog-title">Add Details</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        To select this as your date spot, please choose a time and add activities!
                      </DialogContentText>
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
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Activities"
                        type="activities"
                        multiline
                        style = {{width: 400}}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={handleClose} variant="contained" color="primary">
                        Set Date Spot
                      </Button>
                    </DialogActions>
                  </Dialog>
                  </>
                );
              })}
            </List>
          </div>
        </Grid>
        {/* <Grid item xs={12} md={6}>
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
        </Grid> */}
      </Grid>
      <Button
        variant="outlined"
        startIcon={<AddCircleIcon color="primary" />}
        href="/generatelist"
      >
        Add more spots
      </Button>
      {/* <Button type="submit" variant="contained" color="primary">
        Chooose your date spot
      </Button> */}
      <Button type="submit" variant="contained" color="secondary">
        Pick a random date spot
      </Button>
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Past Date Spots</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This area will have details about past date spots.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
      
    </div>
  );
}
