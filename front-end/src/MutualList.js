import React, { useState, useEffect } from "react";
// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";
import "./datetime.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import TextField from "@material-ui/core/TextField";
import axios from "./config/axios";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SpotListItem from "./SpotListItem";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // maxWidth: 752,
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    // marginTop: "5%",
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
}));

export default function MutualList(props) {
  const classes = useStyles();
  const [card, setCard] = React.useState();
  const [secondary, setSecondary] = React.useState(true);
  const [checked, setChecked] = React.useState([1]);
  const { spots } = props;
  const [mutualSpots, setMutualSpots] = useState([]);

  useEffect(() => {
    axios.get("/user_spots/mutual").then((res) => {
      console.log("Response has comeback!");
      console.log(res);
      setMutualSpots(res.data);
    });
  }, []);
  const handleClick = (value) => () => {
    setCard(value);
  };

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
      <Grid container component="main" spacing={2}>
        <CssBaseline />

        <Grid item xs={4} sm={4} md={4}>
          <Typography variant="h6" className={classes.title}>
            You and your partner both chose:
          </Typography>
          <div className={classes.demo}>
            <List className={classes.root}>
              {getMutualSpots().map((value) => {
                const labelId = `checkbox-list-secondary-label-${value.id}`;
                return (
                  <ListItem key={value.id} onClick={handleClick(value)} button>
                    <ListItemAvatar>
                      <Avatar alt={value.title} src={value.image_url} />
                    </ListItemAvatar>
                    <ListItemText
                      id={labelId}
                      primary={value.title}
                      secondary={secondary ? value.description : null}
                    />
                    <ListItemSecondaryAction>
                      <Checkbox
                        edge="end"
                        onChange={handleToggle(value)}
                        checked={checked.indexOf(value) !== -1}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </Grid>
        <Grid item xs={8} sm={8} md={8}>
          {card && <SpotListItem location={{ spot: card }} />}
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
      <Button type="submit" variant="contained" color="primary">
        Chooose your date spot
      </Button>
      <Button type="submit" variant="contained" color="secondary">
        Pick a random date spot
      </Button>
      <Accordion>
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
      </Accordion>
    </div>
  );
}
