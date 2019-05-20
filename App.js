import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from './components/Home';
import About from './components/About';

import Amplify, { Analytics, Storage } from 'aws-amplify';
import awsmobile from './aws-exports';
import { withAuthenticator, S3Album } from 'aws-amplify-react-native';
Amplify.configure(awsmobile);
Storage.configure({ level: 'private' })

const AppNavigator = createStackNavigator({
  Taco: Home,
  About: About
},
{
  initialRoute: 'Taco'
})

const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  uploadFile = (evt) => {
    const file = evt.target.files[0];
    const name = file.name;

    Storage.put(name, file).then(() => {
      this.setState({ file: name })
    })
  }

  componentDidMount() {
    Analytics.record('Amplify_CLI');
  }

  render() {
    return <AppContainer />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withAuthenticator(App,
  {signUpConfig: {
    hiddenDefaults: ['phone_number']
  }},
  { includeGreetings: true }
);
