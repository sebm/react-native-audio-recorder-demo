/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class AudioRecorder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
    }
  }

  buttonTitle() {
    return (this.state.isRecording) ? 'Stop Recording' : 'Start Recording'
  }

  onPress () {

    this.setState({
      isRecording: !this.state.isRecording
    });

  }

  render() {

    return (
      <View style={styles.container}>
        <Button
          onPress={this.onPress.bind(this)}
          title={this.buttonTitle.bind(this)()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AudioRecorder', () => AudioRecorder);
