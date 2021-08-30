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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    paddingLeft: "25%",
    paddingRight: "25%",
    marginTop: "5%",
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
}));

function getSteps() {
  return [
    "Provide your partner's email",
    "Choose date spots in your area",
    "Create a list of date spots",
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Enter your partner's email so that we can find the date spots you both want to visit.`;
    case 1:
      return "Enter your location to find date spots near you. For each spot, you can click the green button to add it to your list, or the red button if you do not want it.";
    case 2:
      return `Now that you've picked your date spots, let's see which spots both you and your partner agree on!`;
    default:
      return "Unknown step";
  }
}

export default function GenerateList(props) {
  const classes = useStyles();
  const { spots } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [partner, setPartner] = useState("");
  const [location, setLocation] = useState("");
  const steps = getSteps();
  const [filteredSpots, setFilteredSpots] = useState(spots);
  const history = useHistory();
  const userId = history.location.state?.userId;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
    setTimeout(() => localStorage.clear(), 3000);
  }

  useEffect(() => {
    setFilteredSpots(
      spots.filter((spot) =>
        spot.location.toLowerCase().includes(location.toLowerCase())
      )
    );
  }, [location]);

  useEffect(() => {
    const step = localStorage.getItem("activeStep");
    step ? setActiveStep(parseInt(step)) : setActiveStep(0);
  }, []);

  useEffect(() => {
    localStorage.setItem("activeStep", activeStep.toString());
  }, [activeStep]);

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
        </Container>
      );
    }
    return form;
  }

  return (
    <div className={classes.root}>
      <body>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
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
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1
                        ? "Generate List"
                        : "Next"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Container component="main" maxWidth="xs">
              <Typography component="h1" variant="h5">
                Generating your list ...
              </Typography>
              <CircularProgress />
              {loadingList()}
            </Container>
          </Paper>
        )}
      </body>
    </div>
  );
}
