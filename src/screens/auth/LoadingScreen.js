import React, {memo} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {indent, colors, fontSizes, fontNames, fontWeights} from '../../styles';

function LoadingScreen(props) {
  // const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState();
  //
  // console.log('L O A D I N G  :  ' + JSON.stringify(props));
  //
  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  //
  //   props.navigation.navigate(user ? 'App' : 'Auth');
  // }
  //
  // useEffect(() => {
  //   return user().onAuthStateChanged(onAuthStateChanged);
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loading</Text>
      <ActivityIndicator size="large" color={colors.mainText} />
    </View>
  );
}

export default memo(LoadingScreen);

/*
export default class LoadingScreen extends React.Component<Props> {
  componentDidMount() {
    // firebase.user().onAuthStateChanged(user => {
    //   console.log('7777')
    // })

    // firebase
    //   .user()
    //   .signInAnonymously()
    //   .then(credential => {
    //     if (credential) {
    //       console.log('default app user : ', JSON.stringify(credential.user));
    //     }
    //   });

    firebase.user().onAuthStateChanged(user => {
      console.log( `U S E R  L O G I N  : ${JSON.stringify(user)}` );
      this.props.navigation.navigate(user ? 'App' : 'Auth');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>LoadingScreen</Text>
        <ActivityIndicator size="large" color={Colors.white} />
      </View>
    );
  }
}
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.appBg,
  },
  title: {
    fontFamily: fontNames.bold,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.mainTitle,
    color: colors.mainText,
    marginBottom: indent,
  },
});
