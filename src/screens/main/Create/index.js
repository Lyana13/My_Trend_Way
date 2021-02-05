import React, {forwardRef} from 'react';
import Create from './Create';
import Publish from './Publish';
import {connect} from 'react-redux';
import ModMap from '../../../modules/map';
import {createStackNavigator} from '@react-navigation/stack';
import {isLoading} from '../../../modules/loading';


const Stack = createStackNavigator();

const Navigator = (iParams) => {
    return (
        <Stack.Navigator
            screenOptions={({ route, navigation }) => ({
                headerShown: false,
                gestureEnabled: true,
            })}
        >
            <Stack.Screen name="CreateLook" component={Create} initialParams={iParams}/>
            <Stack.Screen name="PublishLook" component={Publish} initialParams={iParams}/>
        </Stack.Navigator>
    )
}

// export default Navigator;

const stateToProps = (state) => ({
    userToken: state[ ModMap.User ].userToken,
});

const dispatchToProps = (dispatch) => ({
    isLoading: (iValue) => dispatch(isLoading(iValue)),
});

// const mergeProps = (stateProps, dispatchProps, ownProps) => {
//     // const _itemId = ownProps.navigation.state.params.itemId;
//     return ownProps;//Object.assign({}, ownProps, {data: stateProps.data[_itemId]}, dispatchProps);
// };

const Connected = connect(stateToProps, dispatchToProps, null, { forwardRef: true })(Navigator);

export default forwardRef((props, ref) =>
    <Connected {...props} ref={ref} />
);
