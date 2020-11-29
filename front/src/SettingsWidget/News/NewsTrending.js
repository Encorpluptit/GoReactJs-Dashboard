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
import UserAuth from "../../Auth";
import {dark} from "@material-ui/core/styles/createPalette";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from '@material-ui/core/Checkbox';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";


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

class NewsWidget extends Component {
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
        fetch(process.env.REACT_APP_API_URL + '/widget/news/get/' + this.widget.ID.toString(), requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.data.results,
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
                            <ul>
                                {items.map(item => (
                                    <li>
                                        {item.title}
                                        <Typography paragraph>
                                            <ul>
                                                {fields.author && <li>Author: {item.author}</li>}
                                                {fields.date && <li>Date: {item.date}</li>}
                                                {fields.source_name && <li>Source Name: {item.source_name}</li>}
                                                {fields.url && <li><a href={item.url}>Url: </a></li>}
                                            </ul>
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        </Typography>
                    </CardContent>
                    {/*</Collapse>*/}
                </Card>
            );
        }
    }
}

export default function NewsWidgetCore(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [timer, setTimer] = React.useState('');
    const [topic, setTopic] = React.useState('');
    const [author, setAuthor] = React.useState(true);
    const [date, setDate] = React.useState(true);
    const [sourceName, setSourceName] = React.useState(true);
    const [newsUrl, setNewsUrl] = React.useState(true);
    const newsType = props.newsType || "Trending";
    const FetchData = () => {
        const fields =
            (author ? 'author,' : '')
            + (date ? 'date,' : '')
            + (sourceName ? 'source_name,' : '')
            + (newsUrl ? 'url' : '')
        FetchNews(timer, topic, newsType, fields)
        handleClose()
    }
    const pushGrid = (obj) => {
        props.fct(obj)
    }

    const FetchNews = (timer, topic, covType, fields) => {
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
        const queryTopic = encodeURIComponent(topic)
        const queryType = encodeURIComponent(covType)
        const urlFetch = `${process.env.REACT_APP_API_URL}/widget/news/create?type=${queryType}&fields=${queryFields}&timer=${queryTimer}&topic=${queryTopic}`
        fetch(urlFetch, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    pushGrid(<NewsWidget widget={result}/>)
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
                {newsType}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">News</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {newsType}
                    </DialogContentText>
                    <form className={classes.form} noValidate>
                        <FormControl className={classes.formControl}>
                            <div>
                                <TextField
                                    label="Timer" id="standard-size-small" defaultValue="30"
                                    onChange={(e) => setTimer(e.target.value)}
                                    size="small"/>
                                {newsType === "Search" && <TextField
                                    label="Topic" id="standard-size-small" defaultValue=""
                                    onChange={(e) => setTopic(e.target.value)}
                                    size="small"/>}
                            </div>
                            <div>
                                <Checkbox
                                    /* open={celcius} */
                                    defaultChecked
                                    color="primary"
                                    inputProps={{'aria-label': 'secondary checkbox'}}
                                    onClick={(e) => setAuthor(e.target.checked ? !e.target.checked : e.target.checked)}
                                />
                                Author
                            </div>
                            <div>
                                <Checkbox
                                    /* open={celcius} */
                                    defaultChecked
                                    color="primary"
                                    inputProps={{'aria-label': 'secondary checkbox'}}
                                    onClick={(e) => setDate(e.target.checked ? !e.target.checked : e.target.checked)}
                                />
                                Date
                            </div>
                            <div>
                                <Checkbox
                                    /* open={celcius} */
                                    defaultChecked
                                    color="primary"
                                    inputProps={{'aria-label': 'secondary checkbox'}}
                                    onClick={(e) => setSourceName(e.target.checked ? !e.target.checked : e.target.checked)}
                                />
                                News Source Name
                            </div>
                            <div>
                                <Checkbox
                                    /* open={celcius} */
                                    defaultChecked
                                    color="primary"
                                    inputProps={{'aria-label': 'secondary checkbox'}}
                                    onClick={(e) => setNewsUrl(e.target.checked ? !e.target.checked : e.target.checked)}
                                />
                                News Url
                            </div>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={FetchData} color="primary">
                        Save
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
