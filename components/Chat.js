import React from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { View, Platform, KeyboardAvoidingView } from 'react-native';

export default class Chat extends React.Component {

  // adding messages into the state object of the app
  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }

  componentDidMount() {
    let name = this.props.route.params.name;
    // when mounting the component now setting the state with the gifted chat format for messaging
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello ' + name,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
            //images or videos can also be added
          },
        },
        {
          _id: 2,
          text: name + ' has entered the Chat Room',
          createdAt: new Date(),
          system: true,
        },
      ]
    })
  }

  // on send the message gets appended to the state messages so it can be displayed.
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  //renderbubble changes the color of the bubble background.
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }

  render() {
    // name and color being passed as props from the start screen
    let name = this.props.route.params.name;
    let color = this.props.route.params.color;

    // setting the users name as the title for chat screen - I believe this is causing a warning currently
    // cannot update component from inside the function body of a different component.
    this.props.navigation.setOptions({ title: name });

    return (
      <View style={{ flex: 1, backgroundColor: color }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    );
  }
}
