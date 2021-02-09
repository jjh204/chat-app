import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

/**
*@requires react
*@requires react-native
*/

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: '',
    };
  }

  render() {
    return (
      <ImageBackground source={require('../assets/BackgroundImage.png')} style={styles.image}>
        <Text style={styles.title}>Chat App</Text>
        <View style={styles.container}>
          {/** 
            * the text input field will set the users name
            * to the state to use in the chat screen 
          */}
          <TextInput
            style={styles.textbox}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            underlineColorAndroid="transparent"
            placeholder="Your Name"
          />
          <Text style={styles.colorText}>Choose Background Color:</Text>

          <View style={styles.colorChoices}>
            {/** 
             * touchableOpacity component allows the user to touch the
             * required color and set to the state to be used in chat screen 
            */}
            <TouchableOpacity
              accessible
              accessibilityLabel="Background Color 1"
              accessibilityHint="Lets you choose what color your background is in the chat screen"
              accessibilityRole="button"
              onPress={() => this.setState({ color: '#090c08' })}
              style={[styles.colorBtn, { backgroundColor: '#090c08' }]}
            />
            <TouchableOpacity
              accessible
              accessibilityLabel="Background Color 2"
              accessibilityHint="Lets you choose what color your background is in the chat screen"
              accessibilityRole="button"
              onPress={() => this.setState({ color: '#474056' })}
              style={[styles.colorBtn, { backgroundColor: '#474056' }]}
            />
            <TouchableOpacity
              accessible
              accessibilityLabel="Background Color 3"
              accessibilityHint="Lets you choose what color your background is in the chat screen"
              accessibilityRole="button"
              onPress={() => this.setState({ color: '#8a95a5' })}
              style={[styles.colorBtn, { backgroundColor: '#8a95a5' }]}
            />
            <TouchableOpacity
              accessible
              accessibilityLabel="Background Color 4"
              accessibilityHint="Lets you choose what color your background is in the chat screen"
              accessibilityRole="button"
              onPress={() => this.setState({ color: '#b9c6ae' })}
              style={[styles.colorBtn, { backgroundColor: '#b9c6ae' }]}
            />
          </View>
          {/** 
            * the 'button' sends both color and name to the chat screen state.
            * Then using touchableOpacity so that the 'button' can be styled as required 
          */}
          <TouchableOpacity
            accessible
            accessibilityLabel="Start Chatting"
            accessibilityHint="Click to navigate to the Chat screen"
            accessibilityRole="button"
            style={styles.chatButton}
            onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, color: this.state.color })}
          >
            <Text style={styles.btnText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

    );
  }
}

/**
 * styles sheet for styling the start screen
 */

const styles = StyleSheet.create({

  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },

  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '44%',
    width: '88%',
    marginBottom: 30,
  },

  title: {
    color: '#fff',
    fontSize: 45,
    fontWeight: '700',
    alignItems: 'center',
    marginTop: 100,
  },

  textbox: {
    fontSize: 16,
    fontWeight: '300',
    width: '88%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 15,
    opacity: 0.5,
    marginTop: 20,
    marginBottom: 30,
  },

  colorText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    alignSelf: 'flex-start',
    marginLeft: 30,
  },

  colorChoices: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },

  colorBtn: {
    height: 45,
    width: 45,
    borderRadius: 75,
    margin: 10,
  },

  chatButton: {
    width: '88%',
    marginBottom: 20,
    marginTop: 30,
    backgroundColor: '#757083',
    padding: 20,
  },

  btnText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '700',
  },

});
