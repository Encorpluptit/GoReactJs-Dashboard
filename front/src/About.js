import React from 'react';
import TextField from '@material-ui/core/TextField';

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
    const headers = {'Content-Type': 'application/json'}
    // fetch('https://api.npms.io/v2/search?q=react', {headers})
    // fetch('http://server/about.json', {headers})
    fetch('http://Dashboard_server-dev/about.json', {headers})
        .then(response => response.json())
        // .then(data => this.setState({totalReactPackages: data.total}));
        .then(data => console.error(data)).then();
    console.log("LOL MDR\n")
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