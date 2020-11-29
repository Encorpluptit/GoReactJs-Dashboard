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
import Checkbox from '@material-ui/core/Checkbox';
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

class WeatherWidget extends Component {
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
            newsType: props.widget.type,
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
        fetch(process.env.REACT_APP_API_URL + '/widget/weather/get/' + this.widget.ID.toString(), requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result,
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
                        title="News Trending"
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
                            {items.name}
                            <ul>
                                {fields.temp && <li>Temperature: {items.main.temp}°</li>}
                                {fields.temp_min && <li>Min Temperature: {items.main.temp_min}°</li>}
                                {fields.temp_max && <li>Max Temperature: {items.main.temp_max}°</li>}
                                {fields.feels_like && <li>Feel's Like Temperature: {items.main.feels_like}°</li>}
                                {fields.humidity && <li>Humidity: {items.main.humidity}%</li>}
                                {fields.pressure && <li>Pressure: {items.main.pressure} Bars</li>}
                                {fields.speed && <li>speed: {items.wind.speed} m/h</li>}
                            </ul>
                        </Typography>
                    </CardContent>
                    {/*</Collapse>*/}
                </Card>
            );
        }
    }
}


export default function WeatherWidgetCore(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [timer, setTimer] = React.useState('30');
    const [city, setCity] = React.useState('Paris');

    const [weathDesc, setWeathDesc] = React.useState(true);
    const [temp, setTemp] = React.useState(true);
    const [tempMin, setTempMin] = React.useState(true);
    const [tempMax, setTempMax] = React.useState(true);
    const [tempFeel, setFeel] = React.useState(true);
    const [pressure, setPressure] = React.useState(true);
    const [humidity, setHumidity] = React.useState(true);
    const [wind, setWind] = React.useState(true);
    const weatherType = props.weatherType || "City";


    const FetchData = () => {
        const fields =
            (weathDesc ? 'description,' : '')
            + (temp ? 'temp,' : '')
            + (tempMin ? 'temp_min,' : '')
            + (tempMax ? 'temp_max,' : '')
            + (tempFeel ? 'feels_like,' : '')
            + (humidity ? 'humidity,' : '')
            + (pressure ? 'pressure,' : '')
            + (wind ? 'speed' : '')
        FetchWeather(timer, city, weatherType, fields)
        handleClose()
    }
    const pushGrid = (obj) => {
        props.fct(obj)
    }

    const FetchWeather = (timer, city, weatherType, fields) => {
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
        const queryCity = encodeURIComponent(city)
        const queryType = encodeURIComponent(weatherType)
        const urlFetch = `${process.env.REACT_APP_API_URL}/widget/weather/create?type=${queryType}&fields=${queryFields}&timer=${queryTimer}&city=${queryCity}`
        fetch(urlFetch, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    pushGrid(<WeatherWidget widget={result}/>)
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
                Widget 1
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">Weather Widget Configuration</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Configure your widget
                    </DialogContentText>
                    <form className={classes.form} noValidate>
                        <FormControl className={classes.formControl}>
                            <div>
                                <TextField label="City" id="standard-size-small" defaultValue={city} size="small"
                                           onChange={(e) => setCity(e.target.value)}/>
                                <TextField
                                    label="Timer" id="standard-size-small" defaultValue={timer}
                                    onChange={(e) => setTimer(e.target.value)}
                                    size="small"/>
                            </div>
                            <div>
                                <Checkbox
                                    defaultChecked
                                    color="primary"
                                    inputProps={{'aria-label': 'secondary checkbox'}}
                                    onClick={(e) => setWeathDesc(e.target.checked ? !e.target.checked : e.target.checked)}
                                />
                                Weather Description
                            </div>
                            <div>
                                <Checkbox
                                    defaultChecked
                                    color="primary"
                                    inputProps={{'aria-label': 'secondary checkbox'}}
                                    onClick={(e) => setTemp(e.target.checked ? !e.target.checked : e.target.checked)}
                                />
                                Temperature
                            </div>
                            <div>
                                <Checkbox
                                    defaultChecked
                                    color="primary"
                                    inputProps={{'aria-label': 'secondary checkbox'}}
                                    onClick={(e) => setTempMin(e.target.checked ? !e.target.checked : e.target.checked)}
                                />
                                Temperature Min
                            </div>
                            <div>
                                <Checkbox
                                    defaultChecked
                                    color="primary"
                                    inputProps={{'aria-label': 'secondary checkbox'}}
                                    onClick={(e) => setTempMax(e.target.checked ? !e.target.checked : e.target.checked)}
                                />
                                Temperature Max
                            </div>
                            <div>
                                <Checkbox
                                    defaultChecked
                                    color="primary"
                                    inputProps={{'aria-label': 'secondary checkbox'}}
                                    onClick={(e) => setFeel(e.target.checked ? !e.target.checked : e.target.checked)}
                                />
                                Feels Like Temperature
                            </div>
                            <div>
                                <Checkbox
                                    defaultChecked
                                    color="primary"
                                    inputProps={{'aria-label': 'secondary checkbox'}}
                                    onClick={(e) => setPressure(e.target.checked ? !e.target.checked : e.target.checked)}
                                />
                                Pressure
                            </div>
                            <div>
                                <Checkbox
                                    defaultChecked
                                    color="primary"
                                    inputProps={{'aria-label': 'secondary checkbox'}}
                                    onClick={(e) => setHumidity(e.target.checked ? !e.target.checked : e.target.checked)}
                                />
                                Humidity
                            </div>
                            <div>
                                <Checkbox
                                    defaultChecked
                                    color="primary"
                                    inputProps={{'aria-label': 'secondary checkbox'}}
                                    onClick={(e) => setWind(e.target.checked ? !e.target.checked : e.target.checked)}
                                />
                                Pressure
                            </div>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={FetchData} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}