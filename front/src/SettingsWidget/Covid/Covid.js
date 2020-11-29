import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import UserAuth from "../../Auth";
import {dark} from "@material-ui/core/styles/createPalette";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";


function customerStyles(theme) {
  return makeStyles(() => ({
    root: {
      maxWidth: 345,
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }));
}

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

function fieldsToMap(fields) {
  const array = fields.split(',')
  let fieldsMap = []
  for (let i = 0; i < array.length; i++) {
    fieldsMap[array[i]] = true
  }
  console.log(fieldsMap)
  return fieldsMap
}

class CovidWidget extends Component {
  constructor(props) {
    console.log("ICI CONNARD!")
    console.log(props.widget)
    super(props);
    this.widget = props.widget
    this.state = {
      expanded: false,
      error: null,
      isLoaded: false,
      items: [],
      infos: null,
      covType: props.widget.type,
      timer: props.widget.timer || 30,
      fields: fieldsToMap(props.widget.fields)
    };
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.fetchDatas = this.fetchDatas.bind(this);
  }

  handleExpandClick() {
    this.setState(state => ({
      expanded: !state.expanded
    }));
  };

  fetchDatas() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + UserAuth.getToken(),
      },
    };
    fetch(process.env.REACT_APP_API_URL + '/widget/covid/get/' + this.widget.ID.toString(), requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
              if (this.widget.type === "Stat") {
                this.setState({
                  isLoaded: true,
                  // infos: result,
                  items: result.data.covid19Stats,
                  lastChecked: result.data.lastChecked,
                });
              } else {
                console.log("DATAS")
                console.log(result.data)
                this.setState({
                  isLoaded: true,
                  items: [result.data],
                  lastChecked: result.data.lastChecked,
                });
              }
              console.log(result.data)
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
              console.log(error)
            }
        )
  }

  componentDidMount() {
    this.interval = setInterval(() => this.fetchDatas(), 1000 * this.state.timer);
    this.fetchDatas()
  }

  render() {
    const classes = customerStyles(dark);
    const {expanded, error, isLoaded, items, lastChecked, fields} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
          <Card className={classes.root}>
            <CardHeader
                title="Covid Country Data"
                subheader="September 14, 2016"
            />
            <CardActions disableSpacing>
              <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={this.handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
              >
                <ExpandMoreIcon/>
              </IconButton>
            </CardActions>
            {/*<Collapse in={expanded} timeout="auto" unmountOnExit>*/}
              <CardContent>
                <Typography paragraph>Last checked: {lastChecked}</Typography>
                <Typography paragraph>
                  <ul>
                    {items.map(item => (
                        <li key={item.keyId}>
                          {item.country}
                          <Typography paragraph>
                            <ul>
                              {fields.confirmed && <li>confirmed: {item.confirmed}</li>}
                              {fields.deaths && <li>deaths: {item.deaths}</li>}
                              {fields.recovered && <li>recovered: {item.recovered}</li>}
                              {fields.lastChecked && <li>Last checked: {item.lastChecked}</li>}
                              {fields.lastReported && <li>Last reported: {item.lastReported}</li>}
                            </ul>
                          </Typography>
                        </li>
                    ))}
                  </ul>
                </Typography>
              </CardContent>
            {/*</Collapse>*/}
          </Card>
      );
    }
  }
}

export default function CovidTotal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [timer] = React.useState('30');
  const [country] = React.useState('France');
  const [fields] = React.useState('recovered,deaths,lastReported,lastChecked');
  const FetchData = () => FetchCovid(timer, country, covType, fields)
  const covType = "Total";
  const pushGrid = (obj) => {
    props.fct(obj)
  }

  const FetchCovid = (timer, country, covType, fields) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + UserAuth.getToken(),
      },
    };
    const queryFields = encodeURIComponent(fields)
    const queryTimer = encodeURIComponent(parseInt(timer, 10) || 30)
    const queryCountry = encodeURIComponent(country)
    const queryType = encodeURIComponent(covType)
    const urlFetch = `${process.env.REACT_APP_API_URL}/widget/covid/create?type=${queryType}&fields=${queryFields}&timer=${queryTimer}&country=${queryCountry}`
    fetch(urlFetch, requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
              pushGrid(<CovidWidget widget={result}/>)
            },
            (error) => {
              console.log(error)
            }
        );
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Widget 1
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Covid 19 Stats</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can do that
          </DialogContentText>
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
            <div>
              <TextField label="Total Numbers" id="standard-size-small" defaultValue="Small" size="small" />
            </div>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
          <Button onClick={FetchData} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}