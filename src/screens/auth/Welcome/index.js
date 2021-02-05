import React, {forwardRef} from 'react';
import {connect} from 'react-redux';
import Component from './Welcome';
import PropTypes from 'prop-types';
import {login, loginFB, loginAP} from '../../../modules';

Component.propTypes = {
  loginFB: PropTypes.func.isRequired,
  loginAP: PropTypes.func.isRequired,
};

Component.defaultProps = {
};

const stateToProps = (state) => {
  return { };
};

const dispatchToProps = (dispatch) => {
  return {
    loginFB: () => dispatch(loginFB()),
    loginAP: () => dispatch(loginAP()),
  };
};

const Connected = connect(stateToProps, dispatchToProps, null, { forwardRef: true })(Component);
export default Connected;
// export default forwardRef((props, ref) =>
//   <Connected {...props} ref={ref} />
// );
