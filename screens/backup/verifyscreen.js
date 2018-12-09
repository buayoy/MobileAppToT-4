import React, { Component } from 'react';
import {
  Picker,Alert,Linking, AppRegistry, Platform, StyleSheet, Text,
  TouchableHighlight, TouchableOpacity, TouchableNativeFeedback,
  TouchableWithoutFeedback, View ,AsyncStorage,TextInput,ScrollView
} from 'react-native';
import ValidationComponent from 'react-native-form-validator';

import { FormLabel, FormInput, FormValidationMessage, Button ,Card } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DatePicker from 'react-native-datepicker'
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../components/logo/index'


export default class Verifyscreen extends Component {
    constructor(props){

        super(props);
        this.mCredentail = {credentail :{user:this.phonenumber , pass:this.citizenID }}
        this.state={
    
          // This is our Default number value
          NumberHolder : 1 ,
          citizenID:'',
          phonenumber:'',
          text:'',
          loading: true,
          verify:'',
          email: '',
    password: '',
        }
      }
 
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
 async getProfile(){
     //get access_token
        const value = await AsyncStorage.getItem('token')
        const token = JSON.parse(value)
        const access_token= token.access_token
      
    //   alert(JSON.stringify(access_token))
       //get Profile
       const response = await axios.get('https://jerawut.auth0.com/userinfo',{
        headers:{
            Authorization: "Bearer "+access_token
        }
    });
    AsyncStorage.setItem('profile',JSON.stringify(response.data));
    console.log(response.data)
  }
  _Login=async()=>{
      try{
        const response = await axios.post('https://jerawut.auth0.com/oauth/token',{
            grant_type: 'password',
            username: this.state.email,
            password: this.state.password,
            audience: 'https://jerawut.auth0.com/api/v2/',
            scope: 'openid',
            client_id: 'iMYXFZWu9GptbyQvuxcKzbjkcMh7Jm7l',
        });
        AsyncStorage.setItem('token',JSON.stringify(response.data));
        // console.log(response.data)
        this.getProfile();
        this.props.navigation.navigate('Home');
        // alert(response.data)
        }catch(error){
          console.log(error);
      }
  }
  _Verify=async()=>{
      try{
       
        if(this.state.phonenumber.length == 10 && this.state.citizenID.length == 13){
        const response = await axios.post('http://localhost:8000/api/otp3/insert',{

        });
        
        AsyncStorage.setItem('text',JSON.stringify(response.data));

        let RandomNumber = Math.floor(Math.random() * 9999) + 1 ;
        this.setState({
        text : RandomNumber
        })
        
        const url = await axios.post('http://sms2.totbb.net/sms/tshell_sms_1.php?sender=MDES&phonenumber='+this.state.phonenumber+'&text='+this.state.text+'&lang=en')
          
        
        
        //AsyncStorage.setItem(JSON.stringify(response.data));
      //  alert(this.state.text)
        // this.props.navigation.navigate('Otp2',{ otp: response.data });
  }else if(this.state.phonenumber.length == 10 && this.state.citizenID.length < 13){
    Alert.alert('กรอกเลขบัตรประจำตัวประชาชนให้ครบถ้วน')
  }else if(this.state.phonenumber.length < 10 && this.state.citizenID.length == 13){
    Alert.alert('กรอกเบอร์โทรศัพท์ให้ครบถ้วน')
  }else if(this.state.phonenumber.length < 10 && this.state.citizenID.length < 13){
    Alert.alert('กรอกข้อมูลให้ครบถ้วน')
  }
      }catch{

      }
  
  }
  _Register = () => {
      this.props.navigation.navigate('Register')
      
  }
 _Verify2=async()=>{
   try{
  if(this.state.verify == this.state.text){
    const {phonenumber,citizenID} = this.state
    const response = await axios.post('http://localhost:8000/api/otp4/insert',{
            otp_PhoneNumber:this.state.phonenumber,
            otp_Text:this.state.text,
            otp_CitizenID:this.state.citizenID,
            loading :true
        });
        let obj={
          phone:this.state.phonenumber,
          citizen:this.state.citizenID
        }
        AsyncStorage.setItem('user',JSON.stringify(obj))
        let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user)
      // Alert.alert(parsed.phone + parsed.citizen)
        // AsyncStorage.setItem('dataPhone',JSON.stringify(response.data));
    // Alert.alert(response.data)    
    this.setState({refreshing: true});
    this.props.navigation.navigate('Home', {credentail:{phone: phonenumber , citizen:citizenID}})
    // Alert.alert(`Phone Number : ${phonenumber} CitizenID :${citizenID}`)
    // await AsyncStorage.setItem({credentail2:{phone: phonenumber , citizen:citizenID}})

  }else{
    Alert.alert('กรอกรหัส OTP ไม่ถูกต้อง')
  }
  
}catch(error){
  console.log(error)
}

}

checkID(id)
{
if(id.length != 13) return false;
for(i=0, sum=0; i < 12; i++)
sum += parseFloat(id.charAt(i))*(13-i); if((11-sum%11)%10!=parseFloat(id.charAt(12)))
return false; return true;
}

checkForm()
{ if(!checkID(document.form1.txtID.value))
alert('รหัสประชาชนไม่ถูกต้อง');
else alert('รหัสประชาชนถูกต้อง เชิญผ่านได้');
}


  render() {
    
    return (
      <View style={styles.container}>
        <ScrollView>
      <View style={{justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
      <Icon  name="ios-person-add" size={80} color="#006600"  />
      <Text style={{fontWeight:'bold', fontSize:30 ,color:'#006600',marginTop:-15,marginBottom:20}}>สมัครสมาชิก</Text>
      </View>
      <View style={{flex:1}}>
      {
        this.state.text ? (
          
          <View>
           <Card containerStyle={{padding: 0 ,borderRadius:7 , marginBottom:10 ,borderColor:'#7CFC00'}} >
          <Text style={{fontSize:20,color:'#006600',marginLeft:10,marginBottom:10 ,marginTop:10}}>ข้อมูลส่วนตัว</Text>
          <Text style={{fontSize:14,color:'#006600',marginLeft:10,marginBottom:2}}>เลขบัตรประจำตัวประชาชน: {this.state.citizenID}</Text>
          <Text style={{fontSize:14,color:'#006600',marginLeft:10}}>กรอกรหัส OTP ของหมายเลข: {this.state.phonenumber}</Text>
           <TextInput
           autoCapitalize={'none'}
           autoCorrect={false}
           style={styles.input}
            ref={verify => this.verify = verify}
            placeholder={'กรอกรหัส OTP ของ '+this.state.phonenumber}
            onChangeText={
              verify => this.setState({ verify })
            }
            
            // keyboardType='email-address'
          />
          <View style={{ flexDirection: 'column',justifyContent: 'space-around',marginBottom:20}}>
         <Button
           backgroundColor='#006600'
           // buttonStyle={{ marginTop: 30 }}
           buttonStyle={{ marginTop: 30 ,borderRadius:10  }}
          //  large
           title={'ยืนยันรหัส OTP '}
          onPress={this._Verify2}
          
           //source={{uri:this.props.navigation.getParam('http://sms2.totbb.net/sms/tshell_sms_1.php?sender=MDES&'+this.state.phonenumber+'=0912312344&'+this.state.text+'lang=en','')}}
         />

         <Button
           backgroundColor='#006600'
           
          //  color='#006600'
           // buttonStyle={{ marginTop: 30 }}
           buttonStyle={{ marginTop: 30 ,borderRadius:10 , borderWidth: 1 ,borderColor:'#7CFC00' }}          //  large
           title={'ขอรหัสยืนยัน OTP อีกครั้ง'}
           backgroundColor='#FFFFFF'
           color="#006600"
          onPress={this._Verify3}
           //source={{uri:this.props.navigation.getParam('http://sms2.totbb.net/sms/tshell_sms_1.php?sender=MDES&'+this.state.phonenumber+'=0912312344&'+this.state.text+'lang=en','')}}
         />
         </View>
         </Card>
         </View>
        
        ):(
          <KeyboardAwareScrollView>
            <Card containerStyle={{padding: 0 ,borderRadius:7 , marginBottom:10,borderColor:'#7CFC00'}} >
          <Text style={styles.labelStyle}>เลขประจำตัวประชาชน</Text>
          <TextInput
            
            ref={citizenID => this.citizenID = citizenID}
            // keyboardType={'email-address'}
            autoCapitalize={'none'}
            autoCorrect={false}
            style={styles.input}
            maxLength = {13}
            placeholder='กรอกเลขบัตรประจำตัวประชาชน'
            onChangeText={
                citizenID => this.setState({ citizenID })
            }
            // keyboardType='email-address'
          />
            
          <Text style={styles.labelStyle}>เบอร์โทรศัพท์</Text>
          <TextInput
           
            ref={phonenumber => (this.phonenumber = phonenumber)}
            //keyboardType={'email-address'}
            autoCapitalize={'none'}
            autoCorrect={false}
            maxLength = {10}
            style={{height: 50,
              width: '90%',
              marginTop: 10,
              marginLeft:18,
              padding: 4,
              borderRadius: 5,
              fontSize: 18,
              color:'#006600',
              borderWidth: 1,
              borderColor: '#48bbec33'}}
            placeholder="กรอกเบอร์โทรศัพท์"
            onChangeText={phonenumber => this.setState({ phonenumber })}
            // secureTextEntry={true}
          />
          
          
           <View style={{ flexDirection:'row' ,flex:1 ,justifyContent:'center' ,marginBottom:20}}>
          <Button
            backgroundColor='#006600'
            buttonStyle={{ marginTop: 30 ,borderRadius:10 ,width:110 , }}
            // large
            title='ยืนยัน'
            onPress={  this._Verify }
           
            
            //source={{uri:this.props.navigation.getParam('http://sms2.totbb.net/sms/tshell_sms_1.php?sender=MDES&'+this.state.phonenumber+'=0912312344&'+this.state.text+'lang=en','')}}
          /><Button
          backgroundColor='#006600'
          buttonStyle={{ marginTop: 30 ,borderRadius:10,width:110 , borderWidth: 1 ,borderColor:'#7CFC00' }}
          // large
          title='ยกเลิก'
          backgroundColor='#FFFFFF'
          color="#006600"
          onPress={()=> this.props.navigation.goBack()}
         
          
          //source={{uri:this.props.navigation.getParam('http://sms2.totbb.net/sms/tshell_sms_1.php?sender=MDES&'+this.state.phonenumber+'=0912312344&'+this.state.text+'lang=en','')}}
        />
         </View>
         </Card>
        </KeyboardAwareScrollView>
        
        )}
        <View style={{ flexDirection: 'row',justifyContent: 'space-around',}}>
          
          
        </View>
        </View>
      </ScrollView>
      </View>
    )
      
    
    ;
  }
}



// create a component
export class AddProfile extends Component {
  
  render() {
    var params = this.props.navigation.getParam("credentail")
    const {user,pass} = params

    return (
      <View style={stylesAddProfile.container}>
    <Text> AddProfilePage </Text>
    <Text>Phone Number : {user} CitizenID :{pass}</Text>
      </View>
    );
  }
}

// define your styles
const stylesAddProfile = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});




const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 10,
    // marginLeft: 10,
    backgroundColor: '#FFFFFF',
  },
  input: {
    height: 50,
    width: '90%',
    marginTop: 10,
    marginLeft:18,
    // marginBottom:10,
    padding: 4,
    borderRadius: 5,
    fontSize: 18,
    color:'#006600',
    borderWidth: 1,
    borderColor: '#48bbec33'
},
labelStyle:{
  fontSize:18,
  color:'#006600',
  marginLeft:20,
  marginTop:10
}
});