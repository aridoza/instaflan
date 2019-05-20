import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet
} from 'react-native';

export default class Home extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Welcome to InstaFlan!</Text>
        <Button
          title='About'
          onPress={() => this.props.navigation.navigate('About')}
        />
      </View>
    )
  }
}
