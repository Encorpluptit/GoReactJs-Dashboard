import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="https://w.bookcdn.com/weather/picture/4_54374_1_3_137AE9_160_ffffff_333333_08488D_1_ffffff_333333_0_6.png?scode=124&domid=581&anc_id=27348"
        title="Meteo"
      />
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Widget Meteo
        </Typography>
      </CardContent>
    </Card>
  );
}