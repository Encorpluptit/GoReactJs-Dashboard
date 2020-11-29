import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Github1 from './Github/Github1.js'
import Github2 from './Github/Github2.js'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));


export default function WidgetGithub(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Github</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Github1 fct={props.fct} authType={"Private"} widgetType={"UserInfos"}>Widget 1</Github1>
          {/*<Github2>Widget 2</Github2>*/}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}