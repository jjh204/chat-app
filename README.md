## CHAT-APP

This project is designed to provides users with a chat interface including the ability to share images, location and view previous messages when offline.
It is designed specifically for mobile devices using:
* React Native 
* with GiftedChat

<div align="center">
<img align="left" width="250" height="500" src="/images/homepage.jpg">
<img align="right" width="250" height="500" src="/images/chatscreen.jpg">
</div>

## Installation

To run the app you will need to install expo using the following comand:

### `npm install expo-cli -g`

## Project Dependencies

You will need to install the following dependancies. 

```react-native-community/async-storage
   react-native-community/masked-view
   react-native-community/netinfo
   react-navigation/native
   react-navigation/stack
   expo
   expo-image-picker
   expo-location
   expo-permissions
   expo-status-bar
   firebase
   navigation
   prop-types
   react
   react-dom
   react-native
   react-native-gesture-handler
   react-native-gifted-chat
   react-native-maps
   react-native-reanimated
   react-native-safe-area-context
   react-native-screens
   react-native-web
```

You can do so by opening the project root folder and running the command:

### `npm install`

To start the app you can do so by running:

### `expo start`

## Device Emulator

In order to interact with the app on a mobile device you can either download an emulator such as [Android Studio](https://developer.android.com/studio/) and follow the instructions to install or use the app EXPO GO directly on your own mobile.  

## Firebase AsyncStorage

You will also need to create a firebase account to store any message data.
To do so you can follow the below steps:

1. Navigate to the [Firebase website](https://firebase.google.com/?hl=en)
2. Sign in using a google account
3. Select 'Go to console' and 'add project'
4. Once your project is created, select 'Create database' in the Cloud Firestore Section.
5. Select 'start in test mode'
6. Select 'start collection'
7. Name your collection 'messages' and select 'auto id' 
8. Enable 'Anonymous Authentication' in the 'Authentication -> set up sign-in method' settings 
9. You will need to navigate to 'Project Settings -> General -> Your Apps' to generate the firebase config
10. Copy the code generated in to the Chat.js file firebase configuration to connect the app to the database.

## Project Kanban Board

<<<<<<< HEAD
Take a look at the project Kanban board and tasks by following the link below:
=======
>>>>>>> 5970c028fdb8cd1602e5ed3d9dd0f798f6c9d4fb
[Kanban board](https://trello.com/b/qy5mGnB0/chat-app)
