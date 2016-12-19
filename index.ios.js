import {AudioRecorder as RNAudioRecorder, AudioUtils as RNAudioUtils} from 'react-native-audio';

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
      currentTime: 0.0,
      stoppedRecording: false,
      stoppedPlaying: false,
      playing: false,
      finished: false
    }
  }

  componentDidMount() {
    let audioPath = RNAudioUtils.DocumentDirectoryPath + '/test.aac';

    this.prepareRecordingPath(audioPath);

    RNAudioRecorder.onProgress = (data) => {
      this.setState({ currentTime: Math.floor(data.currentTime) });
    };

    RNAudioRecorder.onFinished = (data) => {
      this.setState({ finished: data.finished });
      console.log(`Finished recording: ${data.finished}`);
    };
  }


  prepareRecordingPath(audioPath) {
    RNAudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      AudioEncodingBitRate: 32000
    });
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
