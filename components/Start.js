import React from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';

export default class Start extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: ''
    };
  }

  render() {
    return (
      <ImageBackground source={require('../assets/BackgroundImage.png')} style={styles.image}>
        <Text style={styles.title}>Chat App</Text>
        <View style={styles.container}>
          {/* the text input field will set the users name to the state to use in the chat screen */}
          <TextInput
            style={styles.textbox}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            underlineColorAndroid="transparent"
            placeholder='Your Name' />
          <Text style={styles.colorText}>Choose Background Color:</Text>
          <View style={styles.colorChoices}>
            {/* touchableOpacity component allows the user to touch the required color and set to the state to be used in chat screen */}
            <TouchableOpacity
              onPress={() => this.setState({ color: '#090c08' })}
              style={[styles.colors, styles.color1]}
            />
            <TouchableOpacity
              onPress={() => this.setState({ color: '#474056' })}
              style={[styles.colors, styles.color2]}
            />
            <TouchableOpacity
              onPress={() => this.setState({ color: '#8a95a5' })}
              style={[styles.colors, styles.color3]}
            />
            <TouchableOpacity
              onPress={() => this.setState({ color: '#b9c6ae' })}
              style={[styles.colors, styles.color4]}
            />
          </View>
          {/* finally the 'button' sends both color and name to the chat screen state. Then using touchableOpacity so that the 'button' can be styled as required */}
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, color: this.state.color })}>
            <Text style={styles.btnText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({

  image: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '88%',
    height: '44%',
    marginBottom: 30
  },

  title: {
    flex: 1,
    color: '#fff',
    fontSize: 45,
    fontWeight: '700',
    alignItems: 'center',
    marginTop: 100
  },

  textbox: {
    fontSize: 16,
    fontWeight: '300',
    width: '88%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 15,
    opacity: 50,
    marginTop: 20,
    marginBottom: 30
  },

  colorText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 50,
    alignSelf: 'flex-start',
    marginLeft: 30
  },

  colorChoices: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },

  colors: {
    height: 40,
    width: 40,
    borderRadius: 75,
    margin: 10
  },

  color1: {
    backgroundColor: '#090c08'
  },

  color2: {
    backgroundColor: '#474056'
  },

  color3: {
    backgroundColor: '#8a95a5'
  },

  color4: {
    backgroundColor: '#b9c6ae'
  },

  chatButton: {
    flex: 1,
    width: '88%',
    marginBottom: 30,
    backgroundColor: '#757083',
    padding: 20,
  },

  btnText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '700'
  }

});