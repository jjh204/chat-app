import React from 'react';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

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
      isConnected: false,
      image: null,
      location: null
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

    this.referenceMessagesUser = null;
    this.referenceMessages = firebase.firestore().collection('messages');
  }
  componentDidMount() {
    let name = this.props.route.params.name;

    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        console.log('online');
        this.setState({
          isConnected: true
        });

        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          if (!user) {
            try {
              await firebase.auth().signInAnonymously();
            } catch (error) {
              console.log(error);
            }
          }
          this.setState({
            messages: [],
            user: {
              _id: user.uid,
              name: name
            },
            loggedInText:
              `${name} has entered the chat`,
          });
          this.referenceMessagesUser = firebase.firestore().collection('messages');
          this.unsubscribe = this.referenceMessages.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
        });
      } else {
        console.log('offline');
        this.setState({
          isConnected: false
        });
        this.getMessages();
      }
    });
  }

  componentWillUnmount() {
    // stop listening to authentication
    this.authUnsubscribe();
    // stop listening for changes
    this.unsubscribe();
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
        image: data.image || '',
        location: data.location
      });
    });
    this.setState({
      messages,
    });
  };

  // giving the criteria template to add new messages to the firestore. Generic template set from GiftedChat.
  addMessages = () => {
    const message = this.state.messages[0];
    this.referenceMessages.add({
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
      image: message.image || '',
      location: message.location || null,
      sent: true
    });
  };

  // getting the messages from local storage. Try and catch on async functions to catch errors.
  getMessages = async () => {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      // parse the JSON string back to an object to use in app.
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // creating function to save messages to local storage. Try and catch on async functions to catch errors.
  saveMessages = async () => {
    try {
      // stringify the JSON object so it can be saved in firestore as a string.
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  // function to allow messages to be deleted
  deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  // on send the message gets appended to the state messages so it can be displayed.
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }), () => {
        this.addMessages();
        this.saveMessages();
      });
  }

  //renderbubble changes the color of the bubble background.
  renderBubble(props) {
    let color = this.props.route.params.color;
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#dcd4d0'
          },
          right: {
            backgroundColor: color
          }
        }}
      />
    );
  }

  // prevents the toolbar from showing when user is offline
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return (<InputToolbar {...props} />);
    }
  }

  // render custom actions to provide access to camera and location in device
  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  }

  // rendering the maps location data into the bubble message
  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  render() {
    // name and color being passed as props from the start screen
    let name = this.props.route.params.name;

    // setting the users name as the title for chat screen - I believe this is causing a warning currently
    // cannot update component from inside the function body of a different component.
    this.props.navigation.setOptions({ title: 'Welcome ' + name + '!' });

    return (
      <View style={{ flex: 1 }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderActions={this.renderCustomActions.bind(this)}
          renderCustomView={this.renderCustomView.bind(this)}
          messages={this.state.messages}
          user={this.state.user}
          onSend={messages => this.onSend(messages)}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    );
  }
}