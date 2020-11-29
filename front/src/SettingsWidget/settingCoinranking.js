import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Coinranking1 from './Coinranking/Coinranking1.js'
import Coinranking2 from './Coinranking/Coinranking2.js'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));


export default function WidgetCoinranking(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Coinranking</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Coinranking1 fct={props.fct}>Coinranking 1</Coinranking1>
          <Coinranking2>Coinranking 2</Coinranking2>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}