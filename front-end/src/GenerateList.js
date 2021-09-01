import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import SpotCard from "./SpotCard";
import { Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from './config/axios';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    width: "100%",
    // justifyContent: "center",
    // paddingLeft: "25%",
    // paddingRight: "25%",
    // marginTop: "5%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function getSteps() {
  return ["Provide your partner's email", 'Choose date spots in your area', 'Add your own date spot', 'Create a list of date spots'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Enter your partner's email so that we can find the date spots you both want to visit.`;
    case 1:
      return "Enter your location to find date spots near you. For each spot, you can click the green button to add it to your list, or the red button if you do not want it.";
    case 2:
      return `Already got a place in mind? Enter the details of you own date spot below.`;
    case 3:
      return `Now that you've picked your date spots, let's see which spots both you and your partner agree on!`;
    default:
      return "Unknown step";
  }
}

export default function GenerateList(props) {
  const classes = useStyles();
  const { spots } = props;
  const [activeStep, setActiveStep] = useState(localStorage.getItem('activeStep') || 0);
  const [partner, setPartner] = useState('');
  const [location, setLocation] = useState(localStorage.getItem('location') || '');
  const steps = getSteps();
  const [filteredSpots, setFilteredSpots] = useState(spots);
  const history = useHistory();
  const userId = parseInt(localStorage.getItem("userID"));
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => {
    return step === 2;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [spotLocation, setSpotLocation] = useState('');
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function handleOnChange(e) {
    setLocation(e.target.value);
  }

  function loadingList() {
    setTimeout(() => history.push("/mutuallist"), 3000);
    setTimeout(() => {
      localStorage.removeItem('activeStep');
      localStorage.removeItem('location');
    }, 3000);
  }

  useEffect(() => {
    const step = localStorage.getItem('activeStep');
    const input = localStorage.getItem('location');
    (step) ? setActiveStep(parseInt(step)) : setActiveStep(0);
    (input) ? setLocation(input) : setLocation('');
  }, []);

  useEffect(() => {
    setFilteredSpots(spots.filter(spot => spot.location.toLowerCase().includes(location.toLowerCase())));
    localStorage.setItem('location', location);
  }, [location]);
  
  useEffect(() => {
    localStorage.setItem("activeStep", activeStep.toString());
  }, [activeStep]);

  function handleSubmit(e) {
    e.preventDefault();
    const newSpot = { title, description, spotLocation, url, imageUrl };
    axios.post("/spots", newSpot)
    .then(res => {
      console.log(res);
    });
  } 

  function getStepForm(index) {
    let form;
    if (index === 0) {
      form = (
        <Container component="main" className={classes.resetContainer}>
          <TextField
            id="standard-basic"
            label="Partner"
            placeholder="Enter your partner's email"
            value={partner}
            onChange={(e) => setPartner(e.target.value)}
          />
        </Container>
      );
    } else if (index === 1) {
      form = (
        <Container component="main" className={classes.resetContainer}>
          <TextField
            id="standard-basic"
            label="Location"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => handleOnChange(e)}
          />
          <Grid
            container
            spacing={2}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            {filteredSpots.map((spot) => (
              <SpotCard spot={spot} partner={partner} />
            ))}
          </Grid>
        </Container> )
    } else if (index === 2) {
      form = <form className={classes.form} noValidate onSubmit={(e) => { handleSubmit(e) }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                name="title"
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                autoFocus
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="location"
                label="Location"
                name="location"
                value={spotLocation}
                onChange={e => setSpotLocation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Description"
                multiline
                name="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="url"
                label="URL"
                name="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="image_url"
                label="Image URL"
                id="image_url"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </Grid>
        </form>
    }
    return form;
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
        
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
                {getStepForm(index)}
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    {isStepOptional(activeStep) && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSkip}
                        className={classes.button}
                      >
                        Skip
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Generate List' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Container component="main" maxWidth="xs" align = "center" justify = "center" alignItems = "center">
            <Typography component="h1" variant="h5">
              Generating your list ...
            </Typography>
            <CircularProgress/>
            {loadingList()}
          </Container>
        </Paper>
      )}
    </div>
  );
}
