import React, {forwardRef} from 'react';
import {connect} from 'react-redux';
import OverlayLoader from './OverlayLoader';
import {colors, fontSizes} from '../../styles';
import PropTypes from 'prop-types';

OverlayLoader.propTypes = {
  visible: PropTypes.bool.isRequired,
  color: PropTypes.string,
  indicatorSize: PropTypes.string,
  messageFontSize: PropTypes.number,
  message: PropTypes.string,
};

OverlayLoader.defaultProps = {
  visible: false,
  color: colors.mainText,
  indicatorSize: 'small',
  messageFontSize: fontSizes.heading,
  message: 'Loading...',
};

const stateToProps = (state) => {
  return {
    visible: state.isLoading,
  };
};

const dispatchToProps = (dispatch) => {
  return {}
};

const Connected = connect(stateToProps, dispatchToProps, null, { forwardRef: true })(OverlayLoader);

export default forwardRef((props, ref) =>
  <Connected {...props} ref={ref} />
);
