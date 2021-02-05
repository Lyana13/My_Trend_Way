import React, {forwardRef} from 'react';
import {connect} from 'react-redux';
import BrandsList from './BrandsList';
import Explore from '../Explore/Explore';
import PropTypes from 'prop-types';
import ModMap from '../../../../modules/map';

BrandsList.propTypes = {
    userToken : PropTypes.string,
};

const stateToProps = (state) => {
    return {
        userToken: state[ ModMap.User ].userToken,
    };
};

const dispatchToProps = (dispatch) => {
    return {
        // getItem: (iID, iType) => dispatch(getItem(iID, iType)),
    };
};

// const mergeProps = (stateProps, dispatchProps, ownProps) => {
//     // const _itemId = ownProps.navigation.state.params.itemId;
//     return ownProps;//Object.assign({}, ownProps, {data: stateProps.data[_itemId]}, dispatchProps);
// };

const Connected = connect(stateToProps, dispatchToProps, null, { forwardRef: true })(BrandsList);

export default forwardRef((props, ref) =>
    <Connected {...props} ref={ref} />
);

// const Connected = connect(state => ({ value: state }), null, null, { forwardRef: true })(ItemsList);
// export default Connected;
