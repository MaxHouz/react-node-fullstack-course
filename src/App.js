import React from 'react';
import Header from './Components/Header';

class App extends React.Component {
    state = {
        pageHeader: 'Naming Contests'
    };

    componentDidMount() {
        console.log('did Mount');
    }

    componentWillUnmount() {
        console.log('will Unmount')
    }

    render() {
        const { pageHeader } = this.state;

        return (
            <div className="App">
                <Header message={pageHeader}/>
                <div>
                    ...
                </div>
            </div>
        );
    }
}

export default App;