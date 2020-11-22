import React, { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import './login.css';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const handleOnClick = useCallback(() => history.push('/dashboard'), [history]);
  const handleOnClick1 = useCallback(() => history.push('/register'), [history]);

  return (
    <form className={classes.root} noValidate autoComplete="off" class="center-middle">
      <div>
        <TextField
          id="standard-user-input"
          label="user"
          type="user"
          autoComplete="current-user"
        />
        </div>
        <div>
        <TextField
          id="standard-password-input"
          label="password"
          autoComplete="current-password"
        />
        </div>
        <div>
          <Button variant="outlined" color="primary" onClick={handleOnClick}> Login </Button>
          <Button variant="outlined" color="primary" onClick={handleOnClick1}> Register </Button>        
        </div>
    </form>
  );
}