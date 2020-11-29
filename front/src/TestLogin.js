import React, {useCallback, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles, styled} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';
import './login.css';
import UserAuth from "./Auth";
import CovidWidget from "./Testwidget";


const MyButton = styled(({color, ...other}) => <Button {...other} />)({
    background: (props) =>
        props.color === 'red'
            ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
            : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: (props) =>
        props.color === 'red'
            ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
            : '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: 8,
});

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

export default function TestLogin() {
    const classes = useStyles();
    const history = useHistory();
    const submitForm = () => handleSubmit(redirectSuccess);
    const redirectSuccess = useCallback(() => history.push('/dashboard'), [history]);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    TestLogin
                </Typography>
                <CovidWidget timer={30} covType={"Country"} fields={"recovered,deaths,lastReported,lastChecked"}/>
                <MyButton
                    // type="submit"
                    fullWidth
                    variant="contained"
                    color="blue"
                    onClick={submitForm}
                    className={classes.submit}
                >
                    Google
                </MyButton>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    );
}

async function handleSubmit(redirectSuccess) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + UserAuth.getToken(),
            // 'My-Custom-Header': 'foobar'
        },
        // body: JSON.stringify({ title: 'React POST Request Example' })
    };
    fetch(process.env.REACT_APP_API_URL + '/widgets', requestOptions)
        .then(data => {
            console.log(data.status)
            if (data.status !== 201 && data.status !== 202)
                console.log("ERROR WITH LOGIN")
            else
                redirectSuccess();
        });
}

// import React, {Component} from 'react'
// import queryString from 'query-string';
// import {useHistory, useLocation} from 'react-router-dom';
//
//
// function useQuery() {
//     return new URLSearchParams(useLocation().search);
// }

// function LoginSuccess() {
//     const history = useHistory();
//     // const redirectSuccess = useCallback(() => history.push('/dashboard'), [history]);
//     // console.log(window.location.search);
//     // Output: '?id=1&type=cornPizza'
//     const parsed = queryString.parse(window.location.search);
//     // console.log(parsed);
//     // console.log(parsed["user_id"]);
//     // console.log(parsed["token"]);
//     let query = useQuery();
//     console.log(query.get("token"));
//     UserAuth.setToken(parsed["token"]);
//     console.log(UserAuth.getToken());
//     // Output: {id: "1", type: "cornPizza"}
//     // console.log(location.hash);
//     // redirectSuccess()
//     history.push('/dashboard')
// }

// class LoginSuccess extends Component {
//     // constructor(){
//     //     super();
//     constructor(props) {
//         super(props);
//         const parsed = queryString.parse(window.location.search);
//         UserAuth.setToken(parsed["token"]);
//     }
//
//     componentDidMount(){
//         // this.history = useHistory()
//         useHistory().push('/dashboard');
//     }
//
//     render() {
//         return (
//             <div>
//             </div>
//         );
//         // return <Redirect push to="/dashboard"/>
//     }
// }

// class LoginSuccess extends React.Component {
//     render() {
//         let query = useQuery();
//         console.log(window.location.search);
//         // Output: '?id=1&type=cornPizza'
//         const parsed = queryString.parse(window.location.search);
//         console.log(parsed);
//         console.log(parsed["user_id"]);
//         console.log(parsed["token"]);
//         console.log(query.get("token"));
//         UserAuth.setToken()
//         // Output: {id: "1", type: "cornPizza"}
//         // console.log(location.hash);
//
//         return (
//             <div>
//                 <h4>This is Category Component.</h4>
//             </div>
//         )
//     }
// }

// export default LoginSuccess;