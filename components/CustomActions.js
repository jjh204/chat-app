import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

/**
  *@requires prop-types
  *@requires react
  *@requires react-native
  *@requires expo-permissions
  *@requires expo-image-picker
  *@requires expo-location
  */

// importing firebase
const firebase = require('firebase');
require('firebase/firestore');

export default class CustomActions extends React.Component {

  /**
    * giving permission to select an image from the photo media library
    * @function pickImage
    * @async
    * @return {Promise<image>} selects an image from the users media library
    */

  pickImage = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      if (status === 'granted') {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).catch(error => console.log(error));

        if (!result.cancelled) {
          const imageUrl = await this.uploadImage(result.uri);
          this.props.onSend({ image: imageUrl })
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
    * giving permission to take a new photo
    * @function takePhoto
    * @async
    * @return {Promise<image>} takes a photo using the users camera
    */

  takePhoto = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.MEDIA_LIBRARY);
      if (status === 'granted') {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).catch((error) => console.log(error));

        if (!result.cancelled) {
          const imageUrlLink = await this.uploadImage(result.uri);
          this.props.onSend({ image: imageUrlLink });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
    * giving permission to get current location
    * @function getLocation
    * @async
    * @return {Promise<location>} provides geolocation from users device 
    */

  getLocation = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        if (location) {
          this.props.onSend({
            location: {
              longitude: location.coords.longitude,
              latitude: location.coords.latitude,
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
    * uploads sent image to Storage with XMLHttpRequest
    * @function uploadImage
    * @async
    * @param {string} uri
    * @return {Promise<string>} provides the new url for the stored image
    */

  uploadImage = async (uri) => {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });

      // this will allow the images to have unique names in storage
      const imageName = uri.split('/');
      const imageLength = imageName[imageName.length - 1];

      const ref = firebase.storage().ref().child(`images/${imageLength}`);
      const snapshot = await ref.put(blob);
      blob.close();
      return await snapshot.ref.getDownloadURL();
    } catch (error) {
      console.log(error);
    }
  };

  /**
    * Actions open and user can select the desired action. Cancel will close the options.
    * @function onActionPress
    * @async
    * provides the options for the user to select using gitedchat template
    */

  onActionPress = () => {
    const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        try {
          switch (buttonIndex) {
            case 0:
              console.log('user wants to pick an image');
              return this.pickImage();
            case 1:
              console.log('user wants to take a photo');
              return this.takePhoto();
            case 2:
              console.log('user wants to get their location');
              return this.getLocation();
            default:
          }
        } catch (error) {
          console.log(error);
        }
      },
    );
  };

  render() {
    return (
      <TouchableOpacity
        style={[styles.container]}
        onPress={this.onActionPress}
        accessible={true}
        accessibilityLabel="Actions"
        accessibilityHint="Send an image, take a Photo or send current location"
      >
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>

    );
  }
}

/**
 * styles sheet for styling the custom actions 
 */

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};
