import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  CameraRoll,
  Button,
  ScrollView
} from 'react-native';
import Amplify, { Analytics, Storage } from 'aws-amplify';
import { S3Album } from 'aws-amplify-react-native';

export default class Profile extends Component {
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

  _handleButtonPress = () => {
      CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
      })
      .then(r => {
        this.setState({ photos: r.edges });
      })
      .catch((err) => {
        console.log('error loading images', err);
      });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile Component</Text>
        <Text>Pick a file</Text>
        <Button
          title='Load Images'
          onPress={this._handleButtonPress}
          />
        <ScrollView>
          {this.state.photos.map((p, i) => {
            return (
              <Image
                key={i}
                style={{ width: 300, height: 100 }}
                source={{ uri: p.node.image.uri }}
              />
            );
          })}
        </ScrollView>
      </View>
    )
  }
}
