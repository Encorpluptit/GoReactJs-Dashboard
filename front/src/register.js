import React, { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


export default function Register() {
  const classes = useStyles();
  const history = useHistory();
  const handleOnClick = useCallback(() => history.push('/'), [history]);

  return (
    <form className={classes.root} noValidate autoComplete="off" axis="vertical" class="center-middle">
      <div>
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
        />
        </div>
        <div>
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
        />
        </div>
        <div>
        <Button variant="outlined" color="primary" onClick={handleOnClick}>Register </Button>
        <Button variant="outlined" color="primary" onClick={handleOnClick}>Back </Button>
      </div>
    </form>
  );
}