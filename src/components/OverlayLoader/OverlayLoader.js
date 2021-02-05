import React from 'react';
import type {Props} from 'react-native/Libraries/Components/View/View';
import {Modal, ActivityIndicator, View, Text} from 'react-native';
import styles from './style';

class OverlayLoader extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const {visible, children, indicatorSize, color, message, messageFontSize} = this.props;
    const messageStyle = { color: color, fontSize: messageFontSize };

    return visible ? (
        <View style={[styles.container]}>
          <View style={[styles.innerContainer]}>
          {
            typeof children !== 'undefined'
              ? children
              : <>
                <ActivityIndicator
                    style={[styles.indicator]}
                    size={indicatorSize}
                    color={color}
                />
                <Text style={[styles.message, messageStyle]}>
                    {message}
                </Text>
              </>
          }
          </View>
        </View>
    )
    : null;
  }
}

export default OverlayLoader;

// {/*<Modal*/}
// {/*  onRequestClose={() => {}}*/}
// {/*  animationType={'fade'}*/}
// {/*  transparent={true}*/}
// {/*  visible={visible}*/}
// {/*  supportedOrientations={['portrait', 'landscape']}*/}
// {/*  onOrientationChange={*/}
// {/*    evt => this.setState({currentOrientation: evt.nativeEvent.orientation})*/}
// {/*  }*/}
// {/*>*/}
// {/*</Modal>*/}
