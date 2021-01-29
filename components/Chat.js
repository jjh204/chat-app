import React from 'react';
import { View, Text } from 'react-native';

export default class Chat extends React.Component {
  render() {
    let name = this.props.route.params.name;
    let color = this.props.route.params.color;

    // I believe this is currently causing a warning to display 'cannot update component from inside function body of a different component'
    this.props.navigation.setOptions({ title: name });

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: color }}>
        <Text>Lets Start Chatting!</Text>
      </View>
    )
  }
}