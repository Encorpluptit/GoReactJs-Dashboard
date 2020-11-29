import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WeatherWidgetCore from './Weather/Weather1.js'
import Weather2 from './Weather/Weather2.js'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function WidgetWeather(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Weather</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <WeatherWidgetCore fct={props.fct} weatherType={"City"}>City</WeatherWidgetCore>
          {/*<Weather2>Widget 2</Weather2>*/}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}