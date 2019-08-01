import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StepIcon from '@material-ui/core/StepIcon';
import { generateModel, getModelData, trainModel, canNext } from './modelState'
import {EnhancedTable} from './DataTable'
import ReactDOM from 'react-dom';

import './styles.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
  },
  label: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
  },
  stepper: {
    borderColor: theme.palette.secondary.main,
  },
  instructions: {
    size: '50',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  iconContainer: { // define styles for icon container
    transform: 'scale(2)',
    marginRight: theme.spacing(2),
    color: 'GREEN',
  }
}));

function getSteps() {
  return ['Select Target', 'Train Model', 'View Results'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return '';
    case 1:
      return '';
    case 2:
      return '';
    default:
      return '';
  }
}

export default function HorizontalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  function isStepOptional(step) {
    return step === 1;
  }

  function isStepSkipped(step) {
    return skipped.has(step);
  }

  function handleNext() {


    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);

  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleSkip() {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  }

  function handleReset() {
    setActiveStep(0);
  }

  function handleButton(){
    var step = steps[activeStep].split(' ')[0];
    if(step === 'Select'){
      try{
        generateModel(); 
        setTimeout(() => {
          if (canNext()== true){
            handleNext();
          }
        },1000)
      }
      catch(err){
        alert(err);
      }
    }else{
      alert('Target not found in dataset.');
    }
    if(step === 'Train'){
      trainModel();
    }

  }

  // function showModelTable(){
  //   if(steps[activeStep] === 'Train'){
  //     return(EnhancedTable())
  //   }
  // }

  return (
    <div className={classes.root}>
      <Stepper className={classes.stepper} activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel classes={{ iconContainer: classes.iconContainer }} className={classes.label} {...labelProps}>
                <h6 className='center'>{label}</h6>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div align='center'>
            <Typography align='center' className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
            <div>
              <div align='center'>
                {/* <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button> */}

                <Button
                  variant="contained"
                  color="secondary"
                  onClick = {(event) => { handleButton();}}
                  className={classes.button}
                >
                  {steps[activeStep].split(' ')[0]}
                </Button>
                {EnhancedTable()}
                <div id = 'table'></div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}