import React from 'react';
import PropTypes from 'prop-types';

class ContestPreview extends React.Component{
    handleClick = () => {
        const { onClick, _id } = this.props;
        onClick(_id);
    };

    render() {
        const { categoryName, contestName } = this.props;

        return (
            <div className="link ContestPreview" onClick={this.handleClick}>
                <div className="category-name">
                    {categoryName}
                </div>
                <div className="contest-name">
                    {contestName}
                </div>
            </div>
        )
    }
}

ContestPreview.propTypes = {
    _id: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    contestName: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default ContestPreview;