import {connect} from 'react-redux';
import ModMap from '../../../../modules/map';
import Explore from './Explore';
import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {getItem, setMapTarget, setScrollOffset} from '../../../../modules';

Explore.propTypes = {
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

const Connected = connect(stateToProps, dispatchToProps, null, { forwardRef: true })(Explore);

export default forwardRef((props, ref) =>
    <Connected {...props} ref={ref} />
);
