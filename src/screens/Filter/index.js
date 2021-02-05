import {connect} from 'react-redux';
import ModMap from '../../modules/map';
import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter';
import FilterBrand from './FilterBrand';
import FilterCategory from './FilterCategory';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const Navigator = (iParams) => {
    const params = iParams.route ? iParams.route.params : iParams;
  return (
      <Stack.Navigator
          screenOptions={({ route, navigation }) => ({
            headerShown: false,
            gestureEnabled: true,
          })}
      >
          <>
            <Stack.Screen name="Filter" component={Filter} initialParams={params}/>
            <Stack.Screen name="FilterBrand" component={FilterBrand} initialParams={{userToken:iParams.userToken}}/>
            <Stack.Screen name="FilterCategory" component={FilterCategory} initialParams={{userToken:iParams.userToken}}/>
          </>
      </Stack.Navigator>
  )
}


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

const Connected = connect(stateToProps, dispatchToProps, null, { forwardRef: true })(Navigator);

export default forwardRef((props, ref) =>
    <Connected {...props} ref={ref} />
);

export {initialFilter} from './Filter';
