import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Weather1 from './Weather/Weather1.js'
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

// {"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":741,"main":"Fog","description":"fog","icon":"50n"}],"base":"stations","main":{"temp":284.04,"pressure":1011,"humidity":93,"tempmin":280.93,"tempmax":287.04},"visibility":10000,"wind":{"speed":1.5},"clouds":{"all":20},"dt":1570234102,"sys":{"type":1,"id":1417,"message":0.0102,"country":"GB","sunrise":1570255614,"sunset":1570296659},"timezone":3600,"id":2643743,"name":"London","cod":200}
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
          <Weather1 fct={props.fct}>Widget 1</Weather1>
          <Weather2>Widget 2</Weather2>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}