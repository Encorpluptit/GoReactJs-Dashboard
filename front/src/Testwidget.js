import React, {Component} from 'react';
import UserAuth from "./Auth";
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
import {makeStyles} from "@material-ui/core/styles";


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

// const customerStyles = makeStyles((theme) => ({
//     root: {
//         maxWidth: 345,
//     },
//     expand: {
//         transform: 'rotate(0deg)',
//         marginLeft: 'auto',
//         transition: theme.transitions.create('transform', {
//             duration: theme.transitions.duration.shortest,
//         }),
//     },
//     expandOpen: {
//         transform: 'rotate(180deg)',
//     },
// }));

export default class CovidWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            error: null,
            isLoaded: false,
            items: [],
            infos: null,
            // timer: parseInt(props.startTimeInSeconds, 10) || 0,
            timer: parseInt(props.timer, 10) || 0,
        };
        this.handleExpandClick = this.handleExpandClick.bind(this);
    }

    // tick() {
    //     this.setState(state => ({
    //         seconds: state.seconds + 1
    //     }));
    // }
    //
    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }

    handleExpandClick() {
        // this.state.expanded = !this.state.expanded
        // this.setState(this.state.expanded= !state.expanded);
        this.setState(state => ({
            expanded: !state.expanded
        }));
    };

    componentDidMount() {
        // this.interval = setInterval(() => this.tick(), 1000);
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + UserAuth.getToken(),
            },
        };
        fetch(process.env.REACT_APP_API_URL + '/test', requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        // infos: result,
                        items: result.data.covid19Stats,
                        lastChecked: result.data.lastChecked,
                    });
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

    render() {
        const classes = customerStyles(dark);
        const {expanded, error, isLoaded, items, lastChecked} = this.state;
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
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            This impressive paella is a perfect party dish and a fun meal to cook together with your
                            guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
                        <Timer timer={5}/>
                    </CardContent>
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
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Last checked: {lastChecked}</Typography>
                            <Typography paragraph>
                                <ul>
                                    {items.map(item => (
                                        // <Typography paragraph>
                                            <li key={item.keyId}>
                                                {item.country}
                                            </li>
                                        // </Typography>
                                    ))}
                                </ul>
                            </Typography>
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
    }
}

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {seconds: 0};
        this.timer = props.timer || 1;
    }

    tick() {
        // console.log("Refreshing Component")
        this.setState(state => ({
            seconds: state.seconds + 1
        }));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000 * this.timer);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                Seconds: {this.state.seconds}
            </div>
        );
    }
}


class TestWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            infos: null
        };
    }

    componentDidMount() {
        // fetchInfos()
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
        fetch(process.env.REACT_APP_API_URL + '/test', requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        // infos: result,
                        items: result,
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                    console.log(error)
                }
            )
    }

    // "code":"AF"
    // "confirmed":35727
    // "country":"Afghanistan"
    // "critical":31
    // "deaths":1190
    // "lastChange":"2020-07-22T08:41:33+02:00"
    // "lastUpdate":"2020-07-22T20:15:03+02:00"
    // "latitude":33.93911
    // "longitude":67.709953
    // "recovered":23924
    render() {
        const {error, isLoaded, infos, items} = this.state;
        console.log(infos)
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                // <ul > {infos.country} </ul>
                <ul>
                    {items.map(item => (
                        <li key={item.id} title={item.country}>
                            lolol
                            {/*{item.country}*/}
                        </li>
                        // <li key={item.id}>
                        //     {item.name} {item.price}
                        // </li>
                    ))}
                </ul>
            );
        }
    }
}


async function fetchInfos() {
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
    // fetch(process.env.REACT_APP_API_URL + '/widget', requestOptions)
    //     .then(res => res.json())
    //     .then(
    //         (result) => {
    //             this.setState({
    //                 isLoaded: true,
    //                 items: result.items
    //             });
    //         },
    //         // Note: it's important to handle errors here
    //         // instead of a catch() block so that we don't swallow
    //         // exceptions from actual bugs in components.
    //         (error) => {
    //             this.setState({
    //                 isLoaded: true,
    //                 error
    //             });
    //         }
    //     )

    // fetch(process.env.REACT_APP_API_URL + '/widgets', requestOptions)
    //     .then(data => {
    //         console.log(data.status)
    //         if (data.status !== 201 && data.status !== 202)
    //             console.log("ERROR WITH LOGIN")
    //         else
    //             redirectSuccess();
    //     });
}
