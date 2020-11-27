import React, {useCallback, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MyButton from './my_style_button.js'
import { useHistory } from 'react-router-dom';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit">
        Epitech Dashboard
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const redirectSuccess = useCallback(() => history.push('/dashboard'), [history]);
  const submitForm = () => handleSubmit(username, email, password1, password2, redirectSuccess);
  const handleOnClick = useCallback(() => history.push('/'), [history]);
  const redirectGithub = useCallback(() => history.push(process.env.REACT_APP_API_URL + '/auth/github'), [history]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="pseudo"
                variant="outlined"
                required
                fullWidth
                id="pseudo"
                label="Pseudo"
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setPassword1(e.target.value)}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Repeat Password"
                type="password"
                id="password"
                onChange={(e) => setPassword2(e.target.value)}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <MyButton
            type="submit"
            fullWidth
            variant="contained"
            color="blue"
            onClick={submitForm}
            className={classes.submit}
          >
            Sign Up
          </MyButton>
          <MyButton
            // type="submit"
            fullWidth
            variant="contained"
            color="blue"
            onClick={handleOnClick}
            className={classes.submit}
          >
            Back
          </MyButton>
          <MyButton
            // type="submit"
            fullWidth
            variant="contained"
            color="blue"
            // onClick={redirectGithub}
            href={process.env.REACT_APP_API_URL + '/auth/github'}
            className={classes.submit}
          >
            GITHUB
          </MyButton>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

async function handleSubmit(username, email, password1, password2, redirectSuccess) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            // 'Authorization': 'Bearer my-token',
            // 'My-Custom-Header': 'foobar'
        },
        // body: JSON.stringify({ title: 'React POST Request Example' })
    };
    fetch(process.env.REACT_APP_API_URL + '/auth/register'
        + '?Username=' + username
        + '&Email=' + email
        + '&Password=' + password1,
        requestOptions)
        .then(data => {
            if (data.status !== 201 && data.status !== 202)
                console.log("ERROR WITH LOGIN")
            else
                redirectSuccess();
        });
}

// import React, {useCallback, useState} from 'react';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import {makeStyles} from '@material-ui/core/styles';
// import {useHistory} from 'react-router-dom';
//
// const useStyles = makeStyles((theme) => ({
//     root: {
//         '& .MuiTextField-root': {
//             margin: theme.spacing(1),
//             width: '25ch',
//         },
//     },
// }));
//
//
// // async function handleSubmit(event) {
// //   event.preventDefault();
// //
// //   try {
// //     // await Auth.signIn(email, password);
// //     alert("Logged in");
// //   } catch (e) {
// //     alert(e.message);
// //   }
// // }
//
// async function handleSubmit(username, email, password1, password2, redirectSuccess) {
//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//             // 'Authorization': 'Bearer my-token',
//             // 'My-Custom-Header': 'foobar'
//         },
//         // body: JSON.stringify({ title: 'React POST Request Example' })
//     };
//     fetch(process.env.REACT_APP_API_URL + '/auth/register'
//         + '?Username=' + username
//         + '&Email=' + email
//         + '&Password=' + password1,
//         requestOptions)
//         // .then(response => console.log(response))
//         // .then(response => response.json())
//         .then(data => {
//             if (data.status !== 201 && data.status !== 202)
//                 console.log("ERROR WITH LOGIN")
//             else
//                 redirectSuccess();
//         });
// }
//
//
// // class RegisterPage extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       username: '',
// //       email: '',
// //       password: '',
// //       error: '',
// //     };
// //
// //     this.handlePassChange = this.handlePassChange.bind(this);
// //     this.handleUserChange = this.handleUserChange.bind(this);
// //     this.handleSubmit = this.handleSubmit.bind(this);
// //     this.dismissError = this.dismissError.bind(this);
// //   }
// //
// //   dismissError() {
// //     this.setState({error: ''});
// //   }
// //
// //   handleSubmit(evt) {
// //     evt.preventDefault();
// //
// //     if (!this.state.username) {
// //       return this.setState({error: 'Username is required'});
// //     }
// //
// //     if (!this.state.password) {
// //       return this.setState({error: 'Password is required'});
// //     }
// //
// //     return this.setState({error: ''});
// //   }
// //
// //   render() {
// //     return (
// //         <div className="Login">
// //           <form onSubmit={this.handleSubmit}>
// //             {
// //               this.state.error &&
// //               <h3 data-test="error" onClick={this.dismissError}>
// //                 <button onClick={this.dismissError}>✖</button>
// //                 {this.state.error}
// //               </h3>
// //             }
// //             <label>User Name</label>
// //             <input type="text" data-test="username" value={this.state.username} onChange={this.handleUserChange} />
// //
// //             <label>Password</label>
// //             <input type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} />
// //
// //             <input type="submit" value="Log In" data-test="submit" />
// //           </form>
// //         </div>
// //     );
// //     return (
// //         <form className={classes.root} noValidate autoComplete="off" axis="vertical" class="center-middle">
// //           <div>
// //             <TextField
// //                 required
// //                 id="outlined-required"
// //                 label="Required"
// //                 value={this.state.username}
// //                 defaultValue="Hello World"
// //                 variant="outlined"
// //             />
// //           </div>
// //           <div>
// //             <TextField
// //                 required
// //                 id="outlined-required"
// //                 label="Required"
// //                 value={this.state.email}
// //                 defaultValue="Hello World"
// //                 variant="outlined"
// //             />
// //           </div>
// //           <div>
// //             <TextField
// //                 id="outlined-password-input"
// //                 label="Password"
// //                 type="password"
// //                 autoComplete="current-password"
// //                 variant="outlined"
// //             />
// //           </div>
// //           <div>
// //             <TextField
// //                 id="outlined-password-input"
// //                 label="Password"
// //                 type="password"
// //                 autoComplete="current-password"
// //                 variant="outlined"
// //             />
// //           </div>
// //           <div>
// //             <Button variant="outlined" color="primary" onClick={handleOnClick}>Register </Button>
// //             <Button variant="outlined" color="primary" onClick={handleOnClick}>Back </Button>
// //           </div>
// //         </form>
// //     );
// //
// //   }
// // }
// //
// // export default RegisterPage;
//
//
// export default function Register() {
//     const classes = useStyles();
//     const history = useHistory();
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password1, setPassword1] = useState('');
//     const [password2, setPassword2] = useState('');
//     const redirectSuccess = useCallback(() => history.push('/dashboard'), [history]);
//     const handleOnClick = () => handleSubmit(username, email, password1, password2, redirectSuccess)
//     const handleOnClick1 = useCallback(() => history.push('/'), [history]);
//
//     return (
//         <form className={classes.root} noValidate autoComplete="off" axis="vertical" class="center-middle">
//             <div>
//                 <TextField
//                     required
//                     id="outlined-required"
//                     label="Username"
//                     autoComplete="Your Username"
//                     // defaultValue="Hello World"
//                     variant="outlined"
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <TextField
//                     id="outlined-password-input"
//                     label="Email"
//                     // type="email"
//                     autoComplete="Your Email"
//                     variant="outlined"
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <TextField
//                     id="outlined-password-input"
//                     label="Password"
//                     type="password"
//                     autoComplete="current-password"
//                     variant="outlined"
//                     onChange={(e) => setPassword1(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <TextField
//                     id="outlined-password-input"
//                     label="Password"
//                     type="password"
//                     autoComplete="current-password"
//                     variant="outlined"
//                     onChange={(e) => setPassword2(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <Button variant="outlined" color="primary" onClick={handleOnClick}>Register </Button>
//                 <Button variant="outlined" color="primary" onClick={handleOnClick}>Back </Button>
//             </div>
//         </form>
//     );
// }
// =======
