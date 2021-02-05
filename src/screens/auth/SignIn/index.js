import React, {forwardRef} from 'react';
import {connect} from 'react-redux';
import Component from './SingIn';
import PropTypes from 'prop-types';
import {login, loginFB, loginAP} from '../../../modules';

Component.propTypes = {
  login: PropTypes.func.isRequired,
};

Component.defaultProps = {
};

const stateToProps = (state) => {
  return { };
};

const dispatchToProps = (dispatch) => {
  return {
    login: (iEmail, iPass) => dispatch(login(iEmail, iPass)),
  };
};

const Connected = connect(stateToProps, dispatchToProps, null, { forwardRef: true })(Component);
export default Connected;
// export default forwardRef((props, ref) =>
//   <Connected {...props} ref={ref} />
// );
