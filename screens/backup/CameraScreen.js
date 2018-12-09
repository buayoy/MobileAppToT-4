import React, { Component } from 'react';
import { Alert, Platform, StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import { Button } from 'react-native-elements'
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';

export default class CameraScreen extends Component {

    static navigationOptions = {
        title: 'กล้อง',
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
        const response = await axios.post('https://codingthailand.com/api/upload_image.php', {
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

    render() {
        return (

            <View style={styles.container}>

                <Button
                    backgroundColor='#00802b'
                    buttonStyle={{ marginTop: 30 }}
                    icon={{ name: 'camera', type: 'font-camera' }}
                    title='ถ่ายรูป'
                    onPress={this._TakePhoto}
                />
                <View>
                    <Text style={{ marginLeft: 10, fontSize: 18 }}>
                        {
                            this.state.image.size && 'ขนาดไฟล์ : ' + this.state.image.size + ' bytes'
                        }
                    </Text>
                </View>
                <View>
                    <Image source={{ uri: this.state.image.uri }}
                        style={{ width: 300, height: 400, marginLeft: 10 }} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'space-between',
        // alignItems: 'center',
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