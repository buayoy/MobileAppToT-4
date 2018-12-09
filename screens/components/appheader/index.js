//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList,Image } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage,Header, Button ,Card } from 'react-native-elements'
import Logo from '../logo/index'

// create a component
export default class AppHeader extends Component {
    
    static navigationOptions = {
        
        headerTitle: <Logo/>,
        headerStyle: {
          backgroundColor: '#006600',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };
    render() {
        return (
           <Header
  placement="left"
  leftComponent={{ icon: 'menu', color: '#fff' }}
  centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
  rightComponent={{ icon: 'home', color: '#fff' }}
/>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#105B2F',
    },
    title:{
        fontSize:40
    },
    FlatListStyle:{ paddingLeft: 28, paddingRight: 28 }

});

//make this component available to the app
