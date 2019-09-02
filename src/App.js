import React from 'react';
import axios from 'axios';
import Header from './Components/Header';
import ContestPreview from "./Components/ContestPreview";

class App extends React.Component {
    state = {
        pageHeader: 'Naming Contests',
        contests: []
    };

    componentDidMount() {
        axios.get('/api/contests')
            .then(resp => {
                this.setState({
                    contests: resp.data.contests
                })
            })
            .catch(console.error)
    }

    componentWillUnmount() {
        console.log('will Unmount')
    }

    render() {
        const { pageHeader, contests } = this.state;

        return (
            <div className="App">
                <Header message={pageHeader}/>
                <div>
                    {
                        contests.map(c => <ContestPreview key={c.id} contest={{...c}}/>)
                    }
                </div>
            </div>
        );
    }
}

export default App;