import React, { Component } from 'react';
import { Alert, Platform, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker'

import axios from 'axios';

export default class RegisterScreen extends Component {

    state = {
        fullname: '',
        email: '',
        password: '',
        dob: '',
    }

    static navigationOptions = {
        title: 'ลงทะเบียน',
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

    _Register = async () => {
        const response = await axios.post('https://codingthailand.com/api/insert_user4.php', {
            fullname: this.state.fullname,
            email: this.state.email,
            password: this.state.password,
            dob: this.state.dob
        });

        if (response.data.status === 'ok') {
            // Alert.alert('ผลการทำงาน', response.data.message, [{ text: 'ตกลง' }]);
        } else {
            // Alert.alert('ผลการทำงาน', response.data.message, [{ text: 'ตกลง' }]);
        }

    }


    render() {
        return (

            <View style={styles.container}>
                <KeyboardAwareScrollView>
                    <FormLabel>ชื่อ - สกุล</FormLabel>
                    <FormInput
                        inputStyle={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}
                        ref={fullname => this.fullname = fullname}
                        placeholder='กรอกชื่อนามสกุลของท่าน'
                        onChangeText={
                            fullname => this.setState({ fullname })
                        }
                    />

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

                    <FormLabel>วันเดือนปีเกิด</FormLabel>
                    <DatePicker
                        style={{ width: 400 }}
                        date={this.state.dob}
                        mode="date"
                        androidMode="spinner"
                        placeholder="เลือกวันเกิด"
                        format="YYYY-MM-DD"
                        //minDate="2016-05-01"
                        //maxDate="2016-06-01"
                        confirmBtnText="ยืนยัน"
                        cancelBtnText="ยกเลิก"
                        customStyles={{
                            dateIcon: {
                                marginLeft: 0,
                                marginTop: 20
                            },
                            dateInput: {
                                marginLeft: 15,
                                marginTop: 20
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(dob) => { this.setState({ dob: dob }) }}
                    />

                    <View>
                        <Button
                            backgroundColor='#00802b'
                            buttonStyle={{ marginTop: 30 }}
                            icon={{ name: 'person', type: 'font-person' }}
                            title='ลงทะเบียน'
                            onPress={this._Register}
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