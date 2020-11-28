import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';
import queryString from 'query-string';
import UserAuth from "./Auth";

class LoginSuccess extends Component {
    constructor(props) {
        super(props);
        const parsed = queryString.parse(window.location.search);
        UserAuth.setToken(parsed["token"]);
        console.log(UserAuth.getToken());
    }

    componentDidMount(){
        this.props.history.push('/dashboard');
    }

    render() {
        return (
            <div>
            </div>
        );
    }

}

export default withRouter(LoginSuccess);
