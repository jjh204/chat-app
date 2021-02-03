import React from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { View, Platform, KeyboardAvoidingView } from 'react-native';

// importing firebase 
const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {

  // adding messages into the state object of the app
  constructor() {
    super();
    this.state = {
      messages: [],
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
    };

    if (!firebase.apps.length) {
      firebase.initializeApp({
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        apiKey: "AIzaSyBAjJV7pyzndJxUJRWQVBghu3YeDsW0YoQ",
        authDomain: "testing-firebase-7aa71.firebaseapp.com",
        projectId: "testing-firebase-7aa71",
        storageBucket: "testing-firebase-7aa71.appspot.com",
        messagingSenderId: "565067941195",
        appId: "1:565067941195:web:7fbcd2bf477c6fc53d54ce",
        //measurementId: "G-32S5NMH3RR"
      });
    }

    // this.referenceMessagesUser = null;
    this.referenceMessages = firebase.firestore().collection('messages');
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // this is to loop through the  data collection
    querySnapshot.forEach((doc) => {
      // calls a snapshot of data currently in collection
      const data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text.toString(),
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
      });
    });
    this.setState({
      messages,
    });
  };

  addMessages = () => {
    const message = this.state.messages[0];
    this.referenceMessages.add({
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
      sent: true,
    });
  };

  // on send the message gets appended to the state messages so it can be displayed.
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => { this.addMessages(); },
    );
  }

  componentDidMount() {
    let name = this.props.route.params.name;

    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }

      //update user state with currently active user data
      this.setState({
        user: {
          _id: user.uid,
          name: name,
        },
        messages: [],
      });

      // create a reference to the active user's documents
      this.referenceMessagesUser = firebase.firestore().collection('messages');
      // listen for collection changes for current user 
      this.unsubscribeMessagesUser = this.referenceMessagesUser.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
    });
  }

  componentWillUnmount() {
    // stop listening to authentication
    this.authUnsubscribe();
    // stop listening for changes
    this.unsubscribe();
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
          user={this.state.user}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    );
  }
}