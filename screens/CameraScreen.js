import React, { Component } from 'react';
import { Alert, Platform, StyleSheet, Text, View, TouchableHighlight,AsyncStorage, Image } from 'react-native';
import { Button } from 'react-native-elements'
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';

export default class CameraScreen extends Component {

    static navigationOptions = {
        title: 'Coming Soon',
        headerStyle: {
            backgroundColor: '#00802b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            flex: 1
        },
    };

    state = {
        image: {}
    }

    async uploadPhoto() {
        const response = await axios.post('http://npcrapi.netpracharat.com/api/problem/upload_image', {
            imageData: this.state.image.uri
        });
        // Alert.alert(response.data.message);
    }

    _TakePhoto = () => {
        ImagePicker.openCamera({ // openPicker = chose from gallery
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(image => {
            this.setState({
                image: {
                    uri: `data:${image.mime};base64,` + image.data,
                    size: image.size
                }
            });
            // console.log(image);
            // alert(JSON.stringify(image));
            this.uploadPhoto();
        });
    }
    Logout(){
        AsyncStorage.removeItem('user')
        AsyncStorage.removeItem('phone')
        AsyncStorage.removeItem('type')
        // this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Home' })], 0)
      }

    render() {
        return (

            <View style={styles.container}>
                   <Text style={styles.welcome}>Coming Soon</Text>
              
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 5,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'red',
    },
});