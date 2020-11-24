import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {dark} from "@material-ui/core/styles/createPalette";

// class GetRequestSetHeaders extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             totalReactPackages: null
//         };
//     }
//
//     componentDidMount() {
//         // GET request using fetch with set headers
//         const headers = { 'Content-Type': 'application/json' }
//         fetch('https://api.npms.io/v2/search?q=react', { headers })
//             .then(response => response.json())
//             .then(data => this.setState({ totalReactPackages: data.total }));
//     }
//
//     render() {
//         const { totalReactPackages } = this.state;
//         return (
//             <div className="card text-center m-3">
//                 <h5 className="card-header">GET Request with Set Headers</h5>
//                 <div className="card-body">
//                     Total react packages: {totalReactPackages}
//                 </div>
//             </div>
//         );
//     }
// }


const useStyles = makeStyles((theme) => ({
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

function RecipeReviewCard() {
    const classes = useStyles(dark);
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            {/*<CardMedia*/}
            {/*    className={classes.media}*/}
            {/*    image="/static/images/cards/paella.jpg"*/}
            {/*    title="Paella dish"*/}
            {/*/>*/}
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {/*<IconButton aria-label="add to favorites">*/}
                {/*    <FavoriteIcon />*/}
                {/*</IconButton>*/}
                {/*<IconButton aria-label="share">*/}
                {/*    <ShareIcon />*/}
                {/*</IconButton>*/}
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                        minutes.
                    </Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                        heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                        browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                        and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                        pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                        without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                        medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                        again without stirring, until mussels have opened and rice is just tender, 5 to 7
                        minutes more. (Discard any mussels that don’t open.)
                    </Typography>
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}

const divStyle = {
    textAlign: 'blue',
    // backgroundImage: 'url(' + imgUrl + ')',
};

class ServerInfos extends Component {
}


const Customer = ({ customer }) => {

    return (
        // <div style="text-align: center;">
        <div style={{ textAlign: "center" }}>
        {/*<div style='text-align: "center"'>*/}
           <h1>Contact List</h1>
            <h5>{customer.host}</h5>
            {/*<h5>{customer.host}</h5>*/}
            {/*{customer.map((cust) => (*/}
            {/*    <div class="card">*/}
            {/*        <div class="card-body">*/}
            {/*            <h5 class="card-title">{cust.host}</h5>*/}
            {/*            <h6 class="card-subtitle mb-2 text-muted">Card Subtitle</h6>*/}
            {/*            <p class="card-text">Card Text</p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*))}*/}
        </div>
    )
};

class About extends Component {
    headers = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, *cors, same-origin
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        // credentials: 'include', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Access-Control-Allow-Origin': '*'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            server_info: {
                customer: {}
            },
            // name: '',
            // id: '',
            // notes: ''
        };
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + '/about.json', this.headers)
            .then(response => response.json())
            .then((data) => {
                this.setState({server_info: data})
                console.warn(data)
            })
            .catch(console.log);
        // fetch(process.env.REACT_APP_API_URL + '/about.json', this.headers)
        //     .then(response => response.json())
        //     .then(data => console.log(data))
        //     .catch(console.log);
        // fetch('http://jsonplaceholder.typicode.com/users')
        //     .then(res => res.json())
        //     .then((data) => {
        //         this.setState({contacts: data})
        //     })
        //     .catch(console.log)
    }

    render() {
        return (
            <div ref={this.myRef}>
                <Customer customer={this.state.server_info.customer}/>
                <RecipeReviewCard />
                <TextField
                    id="standard-user-input"
                    label="user"
                    type="user"
                    autoComplete="current-user"
                />
            </div>
        );
    }
}

// export default function About() {
//     let lolz = null;
//     const headers = {
//         method: 'GET', // *GET, POST, PUT, DELETE, etc.
//         // mode: 'cors', // no-cors, *cors, same-origin
//         mode: 'cors', // no-cors, *cors, same-origin
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         // credentials: 'same-origin', // include, *same-origin, omit
//         // credentials: 'include', // include, *same-origin, omit
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//             // 'Access-Control-Allow-Origin': '*'
//         },
//         redirect: 'follow', // manual, *follow, error
//         referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     }
//     function handlecreate(type, x, y, props) {
//         fetch(process.env.REACT_APP_API_URL + '/about.json', headers).then(response => response.json()).then(data => console.log(data));
//         console.log(lolz)
//     }
//     return (
//         <div>
//             <TextField
//                 id="standard-user-input"
//                 label="user"
//                 type="user"
//                 autoComplete="current-user"
//             />
//         </div>
//     );
// }
export default About;
