import React, { Component } from 'react';

import {
  Alert, AppRegistry, Platform, StyleSheet, Text,
  TouchableHighlight, TouchableOpacity, TouchableNativeFeedback,
  TouchableWithoutFeedback, View 
} from 'react-native';

import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DatePicker from 'react-native-datepicker'
import axios from 'axios';


export default class RegisterScreen extends Component {

  state = {
    fullname: '',
    email: '',
    password: '',
    dob: ''
  }
  static navigationOptions = {
    title: 'เข้าสู่ระบบ',
    headerStyle: {
      backgroundColor: '#006600',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  _Register = async () => {
      const response = await axios.post('https://codingthailand.com/api/insert_user4.php',{
        fullname: this.state.fullname,
        email: this.state.email,
        password: this.state.password,
        dob: this.state.dob
      });

      if(response.data.status === 'ok'){
        Alert.alert('ผลการทำงาน',response.data.message,[{text:'ตกลง'}]);
      }else{
        Alert.alert('ผลการทำงาน',response.data.message,[{text:'ตกลง'}]);

      }
  }

  render() {
    return (
      <View style={styles.container}>


        <KeyboardAwareScrollView>
          <FormLabel>ชื่อ-สกุล</FormLabel>
          <FormInput
            inputStyle={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}
            ref={fullname => (this.fullname = fullname)}
            placeholder='กรอกชื่อนามสกุล'
            onChangeText={
              fullname => this.setState({ fullname })
            }
          />
          <FormLabel>อีเมล</FormLabel>
          <FormInput
            inputStyle={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}
            ref={email => this.email = email}
            placeholder='กรอก Email ของท่าน'
            onChangeText={
              email => this.setState({ email })
            }
            keyboardType='email-address'
          />

          <FormLabel>พาสเวิร์ด</FormLabel>
          <FormInput
            inputStyle={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}
            ref={password => (this.password = password)}
            placeholder='กรอกชื่อพาสเวิร์ด'
            onChangeText={password => this.setState({ password })}
            secureTextEntry={true}
          />

          <FormLabel>วันเกิด</FormLabel>
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
                marginTop:20
              },
              dateInput: {
                marginLeft: 15,
                marginTop:20
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(dob) => { this.setState({ dob: dob }) }}
          />
        </KeyboardAwareScrollView>

        <View>
          <Button
            backgroundColor='#006600'
            buttonStyle={{ marginTop: 30 }}
            large
            title='ลงทะเบียน'
            onPress={ this._Register }

          />
        </View>

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
  }
});