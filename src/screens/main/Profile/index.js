import {connect} from 'react-redux';
import ModMap from '../../../modules/map';
import Profile from './Profile';
import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {getItem, setMapTarget, setScrollOffset} from '../../../modules';

Profile.propTypes = {
    userToken : PropTypes.string,
};

const stateToProps = (state) => ({
    userToken: state[ ModMap.User ].userToken,
});

const dispatchToProps = (dispatch) => ({
    // getItem: (iID, iType) => dispatch(getItem(iID, iType)),
});

// const mergeProps = (stateProps, dispatchProps, ownProps) => {
//     // const _itemId = ownProps.navigation.state.params.itemId;
//     return ownProps;//Object.assign({}, ownProps, {data: stateProps.data[_itemId]}, dispatchProps);
// };

const Connected = connect(stateToProps, dispatchToProps, null, { forwardRef: true })(Profile);

export default forwardRef((props, ref) =>
    <Connected {...props} ref={ref} />
);
