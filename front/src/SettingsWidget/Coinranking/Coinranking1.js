import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Dashboard from '../../dashboard.js'
import SimpleCard from "../../card";


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


export default function Coinranking1(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const pushGrid = () => props.fct(<SimpleCard></SimpleCard>)
  const [timer, setTimer] = React.useState('');

  const [TotalCoins, setCoins] = React.useState(false);
  const [TotalMarkets, setMarkets] = React.useState(false);
  const [TotalExchanges, setExchanges] = React.useState(false);
  const [TotalMarketCap, setMarketCap] = React.useState(false);
  const [Total24hVolume, setTotal24hVolume] = React.useState(false);

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
        <DialogTitle id="max-width-dialog-title">Coinranking Widget Configuration</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Configure your widget
          </DialogContentText>
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
            <div>
              <TextField label="City" id="standard-size-small" defaultValue="City" size="small" />
              <TextField
                label="Timer" id="standard-size-small" defaultValue="30"
                onChange={(e) => setTimer(e.target.value)}
                size="small"/>
            </div>
            <div>
            <Checkbox
              /* open={celcius} */
              defaultChecked
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              onClick={(e) => setCoins(e.target.checked ? !e.target.checked : e.target.checked)}
            />
            TotalCoins
            </div>
            <div>
            <Checkbox
              /* open={fahreneit} */
              defaultChecked
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              onClick={(e) => setMarkets(e.target.checked ? !e.target.checked : e.target.checked)}
            />
            TotalMarkets
            <Checkbox
              /* open={fahreneit} */
              defaultChecked
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              onClick={(e) => setExchanges(e.target.checked ? !e.target.checked : e.target.checked)}
            />
            TotalExchanges
            <Checkbox
              /* open={fahreneit} */
              defaultChecked
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              onClick={(e) => setMarketCap(e.target.checked ? !e.target.checked : e.target.checked)}
            />
            TotalMarketCap
            <Checkbox
              /* open={fahreneit} */
              defaultChecked
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              onClick={(e) => setTotal24hVolume(e.target.checked ? !e.target.checked : e.target.checked)}
            />
            Total24hVolume
            </div>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={pushGrid} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}