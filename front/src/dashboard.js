import React, { useCallback } from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter, useHistory } from 'react-router-dom';
import './dashboard.css';
import WidgetGithub from './SettingsWidget/settingsGithub.js';
import WidgetGmail from './SettingsWidget/settingsGmail.js';
import WidgetWeather from './SettingsWidget/settingsWeather.js';
import { withStyles } from '@material-ui/core/styles';
import GridLayout from 'react-grid-layout';
import SimpleCard from './card.js';
import UserAuth from "./Auth";
import CovidSettings from "./SettingsWidget/settingsCovid";
import WidgetCoinranking from './SettingsWidget/settingCoinranking.js';
import NewsSettings from "./SettingsWidget/settingsNews";

const drawerWidth = 240;

const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
});

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gridCard: [],
    };
    this.pushWidgetTest = this.pushWidgetTest.bind(this)
    this.logOut = this.logOut.bind(this)
  }


  logOut = () => {
    const { history } = this.props;
    UserAuth.clear()
    if(history) history.push('/');
  }

  pushWidgetTest = (obj) => {
    this.setState(state => {
      const gridCard = state.gridCard.concat(obj);
      return {
        gridCard,
      };
    });
  }

  render() {
    const { classes, history } = this.props;
    const layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2},
      {i: 'b', x: 5, y: 0, w: 1, h: 2},
      {i: 'c', x: 10, y: 0, w: 1, h: 2}
    ];
    /* const handleOnClick = useCallback(() => history.push('/'), [history]); */

    if (UserAuth.getToken() === "") {
      history.push("/");
      return;
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
          <WidgetWeather fct={this.pushWidgetTest}/>
          <WidgetGmail/>
          <WidgetGithub/>
          <WidgetCoinranking/>
          <CovidSettings fct={this.pushWidgetTest}/>
          <NewsSettings fct={this.pushWidgetTest}/>
          <Button variant="contained" color="primary" onClick={this.logOut}>Logout</Button>
        </Drawer>
        <main className={classes.content}>
          <GridLayout className="layout" layout={layout} cols={6} rowHeight={50} width={1200}>
            <div key="a">{this.state.gridCard}</div>
          </GridLayout>
          <div className={classes.toolbar} />
        </main>
      </div>
    )
  }
}

export default withRouter(withStyles(useStyles)(Dashboard))





/* const drawerWidth = 240;

const rootStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

const appBarStyle = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));

const appBarShiftStyle = makeStyles((theme) => ({
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const menuButtonStyle = makeStyles((theme) => ({
  menuButton: {
    marginRight: 36,
  },
}));

const hideStyle = makeStyles((theme) => ({
  hide: {
    display: 'none',
  },
}));

const drawerStyle = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
}));

const drawerOpenStyle = makeStyles((theme) => ({
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const drawerCloseStyle = makeStyles((theme) => ({
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
}));

const contentStyle = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


const themeStyle = useTheme((direction) => ({

}));
 */


/*

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      /* classes: useStyles(), */
      /* theme: useTheme(), */
      /* useTheme: history, */
/*       open: false,
    };
  } */

  /* [open, setOpen] = React.useState(false); */
  /* handleOnClick = useCallback(() => history.push('/'), [history]) */

/*  handleDrawerOpen = () => {
    this.setState({open: true});
    /* setOpen(true); */
  /* }; */

  /* handleDrawerClose = () => {
    this.setState({open: false});
    /* setOpen(false); */
  /* }; */
  /* render() {
    return (
      <div className={rootStyle}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx({appBarStyle}, {
            [{appBarShiftStyle}]: this.state.open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx({menuButtonStyle}, {
                [{hideStyle}]: this.state.open,
              })}
            >
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx({drawerStyle}, {
          })}
          classes={{
            paper: clsx({
            }),
          }}
        >
          <div className={this.state.classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {themeStyle === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <WidgetWeather class="center-div"></WidgetWeather>
          <WidgetGmail></WidgetGmail>
          <WidgetGithub></WidgetGithub>
          <Button variant="contained" color="primary" onClick={handleOnClick}>Logout</Button>
        </Drawer>
        <main className={contentStyle}>
          <GridDashboard/>
        </main>
      </div>
    );
  }
} */


