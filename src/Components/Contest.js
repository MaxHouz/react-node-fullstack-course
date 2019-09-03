import React from 'react';
import PropTypes from 'prop-types';

class Contest extends React.Component {
    componentDidMount() {
        const { fetchNames, nameIds } = this.props;
        fetchNames(nameIds);
    }

    handleSubmit = (event) => {
        const { _id, addName } = this.props;
        const { newNameInput } = this.refs;
        event.preventDefault();
        addName(newNameInput.value, _id);
        newNameInput.value = '';
    };

    render() {
        const { contestListClick, nameIds, lookupName, description } = this.props;

        return (
            <div className="Contest">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Contest Description</h3>
                    </div>
                    <div className="panel-body">
                        <div className="contest-description">
                            {description}
                        </div>
                    </div>
                </div>

                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Proposed Names</h3>
                    </div>
                    <div className="panel-body">
                        <ul className="list-group">
                            {
                                nameIds.map(nameId => (
                                    <li key={nameId} className="list-group-item">{lookupName(nameId).name}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className="panel panel-info">
                    <div className="panel-heading">
                        <h3 className="panel-title">Propose a New Name</h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="input-group">
                                <input
                                    type="text"
                                    ref="newNameInput"
                                    placeholder="New Name Here..."
                                    className="form-control" />
                                <span className="input-group-btn">
                                    <button
                                        type="submit"
                                        className="btn btn-info">
                                        Submit
                                    </button>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="home-link link"
                     onClick={contestListClick}>
                    Contest List
                </div>
            </div>
        )
    }
}

Contest.propTypes = {
    _id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    contestListClick: PropTypes.func.isRequired,
    fetchNames: PropTypes.func.isRequired,
    nameIds: PropTypes.array.isRequired,
    lookupName: PropTypes.func.isRequired,
    addName: PropTypes.func.isRequired
};

export default Contest;