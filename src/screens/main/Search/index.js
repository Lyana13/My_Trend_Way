import {connect} from 'react-redux';
import ModMap from '../../../modules/map';
import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {getItem, setMapTarget, setScrollOffset} from '../../../modules';
import Explore from './Explore';
import ItemsList from './ItemsList';
import BrandsList from './BrandsList';
import {createStackNavigator} from '@react-navigation/stack';




const Stack = createStackNavigator();

const Navigator = (data) => {
    // console.log('!!! NAVI SEARCH : ' + JSON.stringify(data));
  return (
      <Stack.Navigator
          screenOptions={({ route, navigation }) => ({
            headerShown: false,
            gestureEnabled: true,
          })}
      >
          <>
            <Stack.Screen name="Explore" component={Explore}/>
            <Stack.Screen name="ItemsList" component={ItemsList}/>
            <Stack.Screen name="BrandsList" component={BrandsList}/>
          </>
      </Stack.Navigator>
  )
}

const Connected = connect(state => ({ value: state }), null, null, { forwardRef: true })(Navigator);
export default Connected;




// Explore.propTypes = {
//     userToken : PropTypes.string,
// };
//
// const stateToProps = (state) => {
//     return {
//         userToken: state[ ModMap.User ].userToken,
//     };
// };
//
// const dispatchToProps = (dispatch) => {
//     return {
//         // getItem: (iID, iType) => dispatch(getItem(iID, iType)),
//     };
// };
//
// // const mergeProps = (stateProps, dispatchProps, ownProps) => {
// //     // const _itemId = ownProps.navigation.state.params.itemId;
// //     return ownProps;//Object.assign({}, ownProps, {data: stateProps.data[_itemId]}, dispatchProps);
// // };
//
// const Connected = connect(stateToProps, dispatchToProps, null, { forwardRef: true })(Explore);
//
// export default forwardRef((props, ref) =>
//     <Connected {...props} ref={ref} />
// );
