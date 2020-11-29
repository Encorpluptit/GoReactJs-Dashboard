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

function fieldsToMap(fields) {
    const array = fields.split(',')
    let fieldsMap = []
    for (let i = 0; i < array.length; i++) {
        fieldsMap[array[i]] = true
    }
    console.log(fieldsMap)
    return fieldsMap
}

export default class CovidWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            error: null,
            isLoaded: false,
            items: [],
            infos: null,
            covType: props.CovType,
            timer: props.timer || 30,
            fields: fieldsToMap(props.fields)
            // fields: props.fields.split(',')
        };
        this.handleExpandClick = this.handleExpandClick.bind(this);
        this.fetchDatas = this.fetchDatas.bind(this);
        this.requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + UserAuth.getToken(),
            },
        };
    }

    handleExpandClick() {
        this.setState(state => ({
            expanded: !state.expanded
        }));
    };

    fetchDatas() {
        console.log(this.requestOptions)
        fetch(process.env.REACT_APP_API_URL + '/test', this.requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    if (this.state.covType === "Stat") {
                        this.setState({
                            isLoaded: true,
                            // infos: result,
                            items: result.data.covid19Stats,
                            lastChecked: result.data.lastChecked,
                        });
                    } else {
                        this.setState({
                            isLoaded: true,
                            // infos: result,
                            items: result.data,
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
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
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
