import React, { Component } from 'react';
import { Alert, Platform, StyleSheet, Text, View, TouchableHighlight, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker'

import axios from 'axios';

export default class LoginScreen extends Component {

    state = {
        fullname: '',
        email: '',
        password: '',
        dob: '',
    }

    static navigationOptions = {
        title: 'เข้าระบบ',
        headerStyle: {
            backgroundColor: '#00802b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            // textAlign: 'center',
            flex: 1
        },
    };

    async getProfile() {
        // get access_token
        const value = await AsyncStorage.getItem('token');
        const token = JSON.parse(value);
        const access_token = token.access_token;

        // get profile
        const response = await axios.get('https://jaksawatza.auth0.com/userinfo',{
            headers: {
                Authorization: 'Bearer ' + access_token
            }
        });

        AsyncStorage.setItem('profile', JSON.stringify(response.data));
        // console.log(response.data);


    }

    _Login = async () => {

        try {
            const response = await axios.post('https://jaksawatza.auth0.com/oauth/token', {
                "grant_type": "password",
                "username": this.state.email,
                "password": this.state.password,
                "audience": "https://jaksawatza.auth0.com/api/v2/",
                "scope": "openid",
                "client_id": "YoJR91F6wtpPKj8SLg7vFjBRWubU0bBM",
                // "client_secret": "YOUR_CLIENT_SECRET"
            });

            // console.log(response.data);
            AsyncStorage.setItem('token', JSON.stringify(response.data));
            this.getProfile();
            this.props.navigation.navigate('Home');

        } catch (error) {
            console.log('Error is', error);
        }
    }


    render() {
        return (

            <View style={styles.container}>
                <KeyboardAwareScrollView>

                    <FormLabel>อีเมลล์</FormLabel>
                    <FormInput
                        inputStyle={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}
                        ref={email => this.email = email}
                        placeholder='กรอกอีเมลล์ของท่าน'
                        onChangeText={
                            email => this.setState({ email })
                        }
                        keyboardType='email-address'
                    />

                    <FormLabel>รหัสผ่าน</FormLabel>
                    <FormInput
                        inputStyle={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}
                        ref={password => this.password = password}
                        placeholder='กรอกรหัสผ่าน'
                        onChangeText={
                            password => this.setState({ password })
                        }
                        secureTextEntry={true}
                    />

                    <View>
                        <Button
                            backgroundColor='#00802b'
                            buttonStyle={{ marginTop: 30 }}
                            icon={{ name: 'person', type: 'font-person' }}
                            title='เข้าสู่ระบบ'
                            onPress={this._Login}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: '#F5FCFF',
    },
});