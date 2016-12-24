import { AudioRecorder as RNAudioRecorder, AudioUtils as RNAudioUtils } from 'react-native-audio';

import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Sound = require('react-native-sound');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default class AudioRecorder extends Component {

  static prepareRecordingPath = (audioPath) => {
    RNAudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000,
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      currentTime: 0.0,
      stoppedRecording: false,
      stoppedPlaying: false,
      playing: false,
      finished: false,
      audioPath: `${RNAudioUtils.DocumentDirectoryPath}/test.aac`,
    };
  }

  componentDidMount() {
    AudioRecorder.prepareRecordingPath(this.state.audioPath);

    RNAudioRecorder.onProgress = (data) => {
      this.setState({ currentTime: data.currentTime });
    };

    RNAudioRecorder.onFinished = (data) => {
      this.setState({ finished: data.finished });
      Alert.alert(`Finished recording: ${data.finished}`);
    };
  }

  buttonTitle = () => {
    if (this.state.isRecording) {
      return 'Stop Recording';
    }

    return 'Start Recording';
  };

  _play = () => {
    this._stop();

    const sound = new Sound(this.state.audioPath, '', (error) => {
      if (error) {
        Alert.alert(`failed to load the sound ${error}`);
      }
    });

    setTimeout(() => {
      sound.play((success) => {
        if (success) {
          Alert.alert('successfully finished playing');
        } else {
          Alert.alert('playback failed due to audio decoding errors');
        }
      });
    }, 500);
  }

  _record = () => {
    if (this.state.stoppedRecording) {
      AudioRecorder.prepareRecordingPath(this.state.audioPath);
    }

    RNAudioRecorder.startRecording();

    this.setState({ isRecording: true });
  }

  _stop = () => {
    if (this.state.isRecording) {
      RNAudioRecorder.stopRecording();
      this.setState({ stoppedRecording: true, isRecording: false });
    }
  };

  _onPressRecord = () => {
    if (!this.state.isRecording) {
      this._record();
    } else {
      this._stop();
    }
  };

  _renderPlayButton = () => (
    <Button
      title="play"
      onPress={this._play}
    />
  )

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={this._onPressRecord}
          title={this.buttonTitle()}
        />
        <Text>{this.state.currentTime.toFixed(3)}</Text>
        {this._renderPlayButton()}
      </View>
    );
  }
}

AppRegistry.registerComponent('AudioRecorder', () => AudioRecorder);
