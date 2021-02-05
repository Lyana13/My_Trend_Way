import React, {forwardRef} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {registration} from '../../../modules';
import {createStackNavigator} from '@react-navigation/stack';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

// Component.propTypes = {
//   registration: PropTypes.func.isRequired,
// };
//
// Component.defaultProps = {
// };
//
// const stateToProps = (state) => {
//   return { };
// };
//
// const dispatchToProps = (dispatch) => {
//   return {
//     registration: (iEmail, iPass) => dispatch(registration(iEmail, iPass)),
//   };
// };
//
// const Connected = connect(stateToProps, dispatchToProps, null, { forwardRef: true })(Component);
// export default Connected;

const Stack = createStackNavigator();

const SignUpNavigator = (data) => {
  console.log('!!! MAIN NAVI : ' + JSON.stringify(data));
  return (
      <Stack.Navigator
          screenOptions={({ route, navigation }) => ({
            headerShown: false,
            gestureEnabled: true,
          })}
      >
          <>
            <Stack.Screen name="Step1" component={Step1}/>
            <Stack.Screen name="Step2" component={Step2}/>
            <Stack.Screen name="Step3" component={Step3} />
            <Stack.Screen name="Step4" component={Step4} />
            <Stack.Screen name="Step5" component={Step5} />
          </>
      </Stack.Navigator>
  )
}

const Connected = connect(state => ({ value: state }), null, null, { forwardRef: true })(SignUpNavigator);
export default Connected;
