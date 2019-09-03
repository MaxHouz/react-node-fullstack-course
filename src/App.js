import React from 'react';
import PropTypes from 'prop-types';

import Header from './Components/Header';
import Contest from './Components/Contest';
import ContestList from "./Components/ContestList";
import * as api from './api';

const pushState = (obj, url) => {
    window.history.pushState(obj, '', url);
};

const onPopState = handler => {
    window.onpopstate = handler;
};

class App extends React.Component {
    static propTypes = {
        initialData: PropTypes.object.isRequired
    };

    state = this.props.initialData;

    componentDidMount() {
        onPopState(event => {
            this.setState({
                currentContestId: (event.state || {}).currentContestId
            })
        });
    }

    componentWillUnmount() {
        onPopState(null);
    }

    fetchContest = (contestId) => {
        api.fetchContest(contestId)
            .then(contest => {
                this.setState({
                    currentContestId: contest._id,
                    contests: {
                        ...this.state.contests,
                        [contest._id]: contest
                    }
                });
            });

        pushState(
            { currentContestId: contestId },
            `/contest/${contestId}`
        );
    };

    fetchContestList = () => {
        api.fetchContestList()
            .then(contests => {
                this.setState({
                    currentContestId: null,
                    contests
                });
            });

        pushState(
            { currentContestId: null },
            `/`
        );
    };

    fetchNames = (nameIds) => {
        if (nameIds.length === 0) {
            return;
        }
        api.fetchNames(nameIds)
            .then(names => {
                this.setState({
                    names
                })
            })
    };

    pageHeader() {
        const { contests, currentContestId } = this.state;

        if (currentContestId) {
            return contests[currentContestId].contestName;
        }
        return 'Naming Contests';
    }

    lookupName = (nameId) => {
        if (!this.state.names || !this.state.names[nameId]) {
            return {
                name: 'Loading...'
            };
        }
        return this.state.names[nameId];
    };

    currentContent() {
        const { contests, currentContestId } = this.state;

        if (currentContestId) {
            return <Contest
                    contestListClick={this.fetchContestList}
                    fetchNames={this.fetchNames}
                    lookupName={this.lookupName}
                    {...contests[currentContestId]}/>
        } else {
            return <ContestList
                onContestClick={this.fetchContest}
                contests={contests}/>
        }
    };

    render() {
        return (
            <div className="App">
                <Header message={this.pageHeader()}/>
                {this.currentContent()}
            </div>
        );
    }
}

export default App;