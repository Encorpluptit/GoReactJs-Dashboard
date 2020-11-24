import React from 'react';
import TextField from '@material-ui/core/TextField';
import * as util from "util";
import * as dns from "dns";

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

export default function About() {
    // let lolz = null;
    // const headers = {'Content-Type': 'application/json', 'credentials': 'same-origin'}
    // const headers = {'Content-Type': 'application/json', 'credentials': 'same-origin'}
    // const headers = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
    const headers = {
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
        // body: JSON.stringify(data) // body data type must match "Content-Type" header
        // body: data // body data type must match "Content-Type" header
    }
    // fetch('https://api.npms.io/v2/search?q=react', {headers})
    // fetch('http://server/about.json', {headers})
    // fetch('http://server_dev:6666/about.json', {headers})
    // fetch('http://server_dev:7000/about.json')
    // fetch('http://server_dev:7000/about.json', headers)
    // const lookup = util.promisify(dns.lookup);
    //
    // try {
    //     let result = lookup('server_dev')
    //     console.log(result)
    // } catch (error) {
    //     console.error(error)
    // }
    // const lookup = util.promisify(dns.lookup);
    //
    // try {
    //     let result = lookup('server_dev:80')
    //     console.log(result)
    // } catch (error) {
    //     console.error(error)
    // }
    fetch('http://127.0.0.1:8080/about.json', headers).then(response => response.json()).then(data => console.log(data));
    // fetch('server_dev/about.json', headers).then(response => response.json()).then(data => console.log(data));
    // fetch('http://'+result + '/about.json', headers).then(response => response.json()).then(data => console.log(data));
    // .then(data => this.setState({totalReactPackages: data.total}));

    console.log("LOL MDR\nLOL MDR\n")
    return (
        <div>
            <TextField
                id="standard-user-input"
                label="user"
                type="user"
                autoComplete="current-user"
            />
        </div>
    );
}
export {About};