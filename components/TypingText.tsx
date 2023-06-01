import React, { Component } from 'react';
import TypeWriter from 'react-native-typewriter';

class TypingText extends Component {
  render() {
    return (
      <TypeWriter typing={1} initialDelay={0} maxDelay={0} minDelay={0}>
        Hello World! asd asd asd asd asd ad asd asdasdas asd ada sd asd
      </TypeWriter>
    );
  }
}

export default TypingText;
