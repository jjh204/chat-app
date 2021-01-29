import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Chat extends React.Component {
  render() {
    let name = this.props.route.params.name;
    let color = this.props.route.params.color;
    this.props.navigation.setOptions({ title: name });

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: color }}>
        <Text>Lets Start Chatting!</Text>
      </View>
    )
  }
}