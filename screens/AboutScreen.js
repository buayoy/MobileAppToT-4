/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class AboutScreen extends Component {
  static navigationOptions = {
    title: 'เกี่ยวกับเรา' ,
    headerStyle: {
      backgroundColor: '#00802b' ,
      textAlign: 'center' ,
    },
    headerTintColor: '#fff' ,
    headerTitleStyle: {
      fontWeight: 'bold' ,
    },
  };
 

  render() {
    return (
      <View style={styles.container}>
       
        <Text Style={styles.container}>
        <Icon name="ios-person" size={30} color="#4F8EF7" />เกี่ยวกับเรา</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'red',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
});
