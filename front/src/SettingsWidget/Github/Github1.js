import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
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
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";

function customerStyles(theme) {
  return makeStyles(() => ({
    root: {
      maxWidth: 500,
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
  // console.log(fieldsMap)
  return fieldsMap
}

class GithubWidget extends Component {
  constructor(props) {
    // console.log("ICI CONNARD!")
    // console.log(props.widget)
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
    fetch(process.env.REACT_APP_API_URL + '/widget/github/get/' + this.widget.ID.toString(), requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
              console.log(result)
              this.setState({
                  isLoaded: true,
                  items: result,
                });
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
    const {expanded, error, isLoaded, items, fields} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
          <Card className={classes.root}>
            <CardHeader
                title="Github User Infos"
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
              <Typography paragraph>
                <ul>
                  {fields.login && <li>Login: {items.login}</li>}
                  {fields.recovered && <li>recovered: {items.recovered}</li>}
                  {fields.name && <li>Name: {items.name}</li>}
                  {fields.email && <li>Email: {items.email}</li>}
                  {fields.html_url && <li>Url: {items.html_url}</li>}
                  {fields.total_private_repos && <li>Private Repos: {items.total_private_repos }</li>}
                  {fields.total_public_repos && <li>Public Repo: {items.total_public_repos}</li>}
                </ul>
              </Typography>
            </CardContent>
            {/*</Collapse>*/}
          </Card>
      );
    }
  }
}

export default function Github1(props) {
  const classes = useStyles();
  const authType = props.authType || "Private";
  const widgetType = props.widgetType || "UserInfos";

  const [open, setOpen] = React.useState(false);
  const [timer, setTimer] = React.useState('30');
  const [login, setLogin] = React.useState(true);
  const [name, setName] = React.useState(true);
  const [email, setEmail] = React.useState(true);
  const [html_url, setHTMLUrl] = React.useState(true);
  const [total_private_repos, setTotal_private_repos] = React.useState(true);
  const [total_public_repos, setTotal_public_repos] = React.useState(true);

  const FetchData = () => {
    const fields =
        (login ? 'login,' : '')
        + (name ? 'name,' : '')
        + (email ? 'email,' : '')
        + (html_url ? 'html_url,' : '')
        + (total_private_repos ? 'total_private_repos,' : '')
        + (total_public_repos ? 'total_public_repos' : '')
    FetchGithub(timer, authType, widgetType, fields)
    handleClose()
  }
  const pushGrid = (obj) => {
    props.fct(obj)
  }

  const FetchGithub = (timer, authType, widgetType, fields) => {
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
    const queryAuth = encodeURIComponent(authType)
    const queryWidget = encodeURIComponent(widgetType)
    const urlFetch = `${process.env.REACT_APP_API_URL}/widget/github/create?fields=${queryFields}&timer=${queryTimer}&authType=${queryAuth}&widgetType=${queryWidget}`
    fetch(urlFetch, requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
              pushGrid(<GithubWidget widget={result}/>)
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
          {widgetType}
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">Covid 19</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {widgetType}
            </DialogContentText>
            <form className={classes.form} noValidate>
              <FormControl className={classes.formControl}>
                <div>
                  <TextField
                      label="Timer" id="standard-size-small" defaultValue={timer}
                      onChange={(e) => setTimer(e.target.value)}
                      size="small"/>
                </div>
                <div>
                  <Checkbox
                      /* open={celcius} */
                      defaultChecked
                      color="primary"
                      inputProps={{'aria-label': 'secondary checkbox'}}
                      onClick={(e) => setLogin(e.target.checked ? !e.target.checked : e.target.checked)}
                  />
                  Login
                </div>
                <div>
                  <Checkbox
                      /* open={celcius} */
                      defaultChecked
                      color="primary"
                      inputProps={{'aria-label': 'secondary checkbox'}}
                      onClick={(e) => setName(e.target.checked ? !e.target.checked : e.target.checked)}
                  />
                  Name
                </div>
                <div>
                  <Checkbox
                      /* open={celcius} */
                      defaultChecked
                      color="primary"
                      inputProps={{'aria-label': 'secondary checkbox'}}
                      onClick={(e) => setEmail(e.target.checked ? !e.target.checked : e.target.checked)}
                  />
                  Email
                </div>
                <div>
                  <Checkbox
                      /* open={celcius} */
                      defaultChecked
                      color="primary"
                      inputProps={{'aria-label': 'secondary checkbox'}}
                      onClick={(e) => setHTMLUrl(e.target.checked ? !e.target.checked : e.target.checked)}
                  />
                  Url
                </div>
                <div>
                  <Checkbox
                      /* open={celcius} */
                      defaultChecked
                      color="primary"
                      inputProps={{'aria-label': 'secondary checkbox'}}
                      onClick={(e) => setTotal_private_repos(e.target.checked ? !e.target.checked : e.target.checked)}
                  />
                  Private Repo
                </div>
                <div>
                  <Checkbox
                      /* open={celcius} */
                      defaultChecked
                      color="primary"
                      inputProps={{'aria-label': 'secondary checkbox'}}
                      onClick={(e) => setTotal_public_repos(e.target.checked ? !e.target.checked : e.target.checked)}
                  />
                  Public Repo
                </div>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={FetchData} color="primary">
              Save
            </Button>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
  );
}