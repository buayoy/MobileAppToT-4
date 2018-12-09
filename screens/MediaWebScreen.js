import React, { Component } from 'react';
import { Alert, Platform, StyleSheet, Text, View, TouchableHighlight, ScrollView , WebView} from 'react-native';
import { Card, ListItem, Button, } from 'react-native-elements'
import axios from 'axios';



export default class MediaWebScreen extends Component {

    state = {
        data: []
    }

    static navigationOptions = ({navigation}) =>  ({
        title: navigation.getParam('title' , ''),
        headerStyle:{
            backgroundColor: '#00802b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            // textAlign: 'center',
            flex: 1
        },
        
    });
    

    async getData(id) {
        // alert(id);
        const response = await axios.get('http://npcrapi.netpracharat.com/api/media/detail/'+id);

        
        this.setState({ data: response.data });
        alert(JSON.stringify(this.state.data));
    }

    componentDidMount() {
        const id = this.props.navigation.getParam('id', 0);
        this.getData(id);
    }

    render() {
        return (

           <WebView
        source={{uri: this.props.navigation.getParam('url', this.state.data.link)}}
        style={{marginTop: 0}}
        useWebkit={true}
      />
        );
    }
    }

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'red',
  },
});