import React, { Component } from 'react';
import {
  Image, Alert, StyleSheet, Text,
  View, AsyncStorage, TextInput, NativeModules,ActivityIndicator
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

// import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';
import { FormLabel, Button, Card } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../components/logo/index'
import { Dropdown } from 'react-native-material-dropdown';
import RNRestart from "react-native-restart";

import { NavigationActions } from 'react-navigation';

var ImagePicker = NativeModules.ImageCropPicker;



const width = '100%';
const IoniconsHeaderButton = passMeFurther => (
  <HeaderButton {...passMeFurther} IconComponent={Icon} iconSize={30} color="white" />

);
export default class Verifyscreen extends Component {
  constructor(props){

      super(props);
      // this.mCredentail = {credentail :{phone2:this.state.phonenumber , citizen2:this.state.citizenID }}
      this.state={
          lastRefresh: Date(Date.now()).toString(),
      
      
      
        // This is our Default number value
        NumberHolder : 1 ,
        citizenID:'',
        phonenumber:'',
        text:'',
        loading: true,
        verify:'',
        email: '',
        summod11:'',
        password: '',
      }
      this.refreshScreen = this.refreshScreen.bind(this)
    
      
    }

    static navigationOptions  = ({navigation}) => {
      // const { params = {} } = navigation.state;
      // const params = navigation.getParam('checklogin')
      // this.state.user
      // alert(params)
      return {
        headerTitle: <Logo/>,
        headerRight: (
          <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
            {/* <Item title="register" iconName="ios-add-circle-outline" onPress={() => navigation.navigate('Createnewcm')} /> */}
          </HeaderButtons>
      ),
       
            
        headerStyle: {
            backgroundColor: '#006600',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            flex:1
          },
        }
      };
      componentWillMount(){
          this.refreshScreen();
      }

    //   _Verify=async()=>{
    //     try{
    //       if(this.state.phonenumber.length == 10 && this.state.citizenID.length == 13){
    //            const response = await axios.post('http://npcrapi.netpracharat.com/api/otp4/insert',{
    //              otp_PhoneNumber:this.state.phonenumber
    //          });
    //                  AsyncStorage.setItem('text',JSON.stringify(response.data));
                     
    //                  let RandomNumber = Math.floor(1000+Math.random() * 8999) + 1 ;
    //                  this.setState({
    //                  text : RandomNumber
    //                  })
    //                  //  Alert.alert(JSON.stringify(this.state.text))
    //                  const url = await axios.post('http://sms2.totbb.net/sms/tshell_sms_1.php?sender=MDES&phonenumber='+this.state.phonenumber+'&text='+this.state.text+'&lang=en')
    //       }else if(this.state.phonenumber.length == 10 && this.state.citizenID.length < 13){
    //       Alert.alert('กรอกเลขบัตรประจำตัวประชาชนให้ครบถ้วน')
    //       }else if(this.state.phonenumber.length < 10 && this.state.citizenID.length == 13){
    //       Alert.alert('กรอกหมายเลขโทรศัพท์มือถือให้ครบถ้วน')
    //       }else if(this.state.phonenumber.length < 10 && this.state.citizenID.length < 13){
    //       Alert.alert('กรอกข้อมูลให้ครบถ้วน')
    //       }
  
    //     }catch{
  
    //     }
    
    // }
_Verify=async()=>{
    try{
      var xiiis = this.state.citizenID
        xiiis = xiiis.substring( 0 ,xiiis.length -12);


        var xiis = this.state.citizenID
        xiis = xiis.substring(1,xiis.length -11);


        var xis = this.state.citizenID
        xis = xis.substring(2,xis.length -10);


        var xs = this.state.citizenID
        xs = xs.substring(3,xs.length -9);


        var x = this.state.citizenID
        x = x.substring(4,x.length -8);


        var ix = this.state.citizenID
        ix = ix.substring(5,ix.length -7);

        var iix = this.state.citizenID
        iix = iix.substring(6,iix.length -6);


        var iiix = this.state.citizenID
        iiix = iiix.substring(7,iiix.length -5);

        var vi = this.state.citizenID
        vi = vi.substring(8,vi.length -4);


        var v = this.state.citizenID
        v = v.substring(9,v.length -3);

        var iv = this.state.citizenID
        iv = iv.substring(10,iv.length -2);


        var iii = this.state.citizenID
        iii = iii.substring(11,iii.length -1);

        var ii = this.state.citizenID
        ii = ii.substring(12,ii.length );
        // alert(ii)
        let sumcitizen = ((xiiis * 13) + (xiis*12) + (xis*11) + (xs*10)+ (x*9) + (ix*8) + (iix * 7) + (iiix * 6) + (vi*5)+(v*4) +(iv*3) +(iii*2))%11
       
      //  let summod11 = 11- sumcitizen
        // alert(summod11)
        // alert(summod11)
        
      if(this.state.phonenumber.length == 10 && this.state.citizenID.length == 13){

        const response = await axios.post('http://npcrapi.netpracharat.com/api/saveuser/checkphone?save_phone='+this.state.phonenumber,{
      });
          if(response.data.message == 'notsame'){
      //Alert.alert('หมายเลขโทรศัพท์มือถือนี้ใช้งานได้')
      // this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Home' })], 0)
      // AsyncStorage.removeItem('text')
      this.props.navigation.navigate('AddProfile', {credentail:{phone2:this.state.phonenumber , citizen2:this.state.citizenID}})
      
      // this.props.navigation.reset([NavigationActions.navigate('AddProfile', {credentail:{phone2:this.state.phonenumber , citizen2:this.state.citizenID}})], 0)
        }else{
      // Alert.alert("เบอร์โทรศัพท์ซ้ำในระบบ")
      Alert.alert('หมายเลขโทรศัพท์มือถือ '+this.state.phonenumber+' ถูกใช้ไปแล้ว')
      this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Home' })], 0)
        }

       
      
      }else if(this.state.phonenumber.length == 10 && this.state.citizenID.length < 13){
      Alert.alert('กรอกเลขบัตรประจำตัวประชาชนให้ครบถ้วน')
      }else if(this.state.phonenumber.length < 10 && this.state.citizenID.length == 13){
      Alert.alert('กรอกหมายเลขโทรศัพท์มือถือให้ครบถ้วน')
      }else if(this.state.phonenumber.length < 10 && this.state.citizenID.length < 13){
      Alert.alert('กรอกข้อมูลให้ครบถ้วน')
      }

    }catch{

    }

}
_Verify3=async()=>{
  const response = await axios.post('http://npcrapi.netpracharat.com/api/otp3/insert',{
      otp_PhoneNumber:this.state.phonenumber
  });
  let RandomNumber = Math.floor(1000+Math.random() * 8999) + 1 ;
  this.setState({
  text : RandomNumber
  })
  const url = await axios.post('http://sms2.totbb.net/sms/tshell_sms_1.php?sender=MDES&phonenumber='+this.state.phonenumber+'&text='+this.state.text+'&lang=en')


}


componentDidMount(){
  this.refreshScreen();
}
_Verify2=async()=>{
 try{

  const response = await axios.post('http://npcrapi.netpracharat.com/api/saveuser/checkphone?save_phone='+this.state.phonenumber,{
});
  if(response.data.message == 'notsame'){
      //Alert.alert('หมายเลขโทรศัพท์มือถือนี้ใช้งานได้')
      // this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Home' })], 0)
      AsyncStorage.removeItem('text')
      this.props.navigation.navigate('AddProfile', {credentail:{phone2:this.state.phonenumber , citizen2:this.state.citizenID}})
      
      // this.props.navigation.reset([NavigationActions.navigate('AddProfile', {credentail:{phone2:this.state.phonenumber , citizen2:this.state.citizenID}})], 0)
  }else{
      // Alert.alert("เบอร์โทรศัพท์ซ้ำในระบบ")
      Alert.alert('หมายเลขโทรศัพท์มือถือ '+this.state.phonenumber+' ถูกใช้ไปแล้ว')
      this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Home' })], 0)
  }




}catch(error){
console.log(error)
}

}


refreshScreen() {
  this.setState({ lastRefresh: Date(Date.now()).toString() })
}
render() {
  
  return (
  
    <View style={styles.container}>
    <View style={{justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
    <Icon  style={{borderWidth:0 , borderColor:"black"}} name="ios-person-add" size={80} color="#006600"  />
    <Text style={{fontWeight:'bold', fontSize:30 ,color:'#006600',marginTop:-15,marginBottom:20 ,fontFamily: "Prompt-Light" }}>สมัครสมาชิก</Text>
    </View>
    <View style={{flex:1}}>
    
        
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
          keyboardType='numeric'
        />
          
        <Text style={styles.labelStyle}>หมายเลขโทรศัพท์มือถือ</Text>
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
            fontFamily: "Prompt-Light",
            borderWidth: 1,
            borderColor: '#48bbec33'}}
          placeholder="กรอกหมายเลขโทรศัพท์มือถือ"
          onChangeText={phonenumber => this.setState({ phonenumber })}
          keyboardType='numeric'
          // secureTextEntry={true}
        />
        
        
         <View style={{ flexDirection:'row' ,flex:1 ,justifyContent:'center' ,marginBottom:20}}>
        <Button
          backgroundColor='#006600'
          buttonStyle={{ marginTop: 30 ,borderRadius:10 ,width:110  }}
          // large
          title='ยืนยัน'
          fontFamily= "Prompt-Light"
          onPress={  this._Verify }
         
          
          //source={{uri:this.props.navigation.getParam('http://sms2.totbb.net/sms/tshell_sms_1.php?sender=MDES&'+this.state.phonenumber+'=0912312344&'+this.state.text+'lang=en','')}}
        /><Button
        backgroundColor='#006600'
        buttonStyle={{ marginTop: 30 ,borderRadius:10,width:110 , borderWidth: 1 ,borderColor:'#7CFC00' }}
        // large
        title='ยกเลิก'
        fontFamily= "Prompt-Light"
        backgroundColor='#FFFFFF'
        color="#006600"
        onPress={()=> this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Home' })], 0)}
       
        
        //source={{uri:this.props.navigation.getParam('http://sms2.totbb.net/sms/tshell_sms_1.php?sender=MDES&'+this.state.phonenumber+'=0912312344&'+this.state.text+'lang=en','')}}
      />
       </View>
       </Card>
      </KeyboardAwareScrollView>
      
      
      <View style={{ flexDirection: 'row',justifyContent: 'space-around',}}>
        
        
      </View>
      </View>
    </View>


  )
    
  
  ;
}
}

export class Login2screen extends Component {
  constructor(props){

      super(props);
      // this.mCredentail = {credentail :{phone2:this.state.phonenumber , citizen2:this.state.citizenID }}
      this.state={
          lastRefresh: Date(Date.now()).toString(),
            NumberHolder : 1 ,
            citizenID:'',
            phonenumber:'',
            userid:'',
            type:'',
            name:'',
            lastname:'',
            text:'',
            loading: false,
            verify:'',
            email: '',
            dev:'0000',
            password: '',
      }
      this.refreshScreen = this.refreshScreen.bind(this)
    
      
    }

    static navigationOptions  = ({navigation}) => {
     
      return {
        headerTitle: <Logo/>,
        // headerLeft: ( <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}
        //   >
       
        //   </HeaderButtons>
        // ),
        
            
        headerStyle: {
            backgroundColor: '#006600',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            flex:1
          },
        }
      };
      componentWillMount(){
          this.refreshScreen();
      }


checklogincount=async()=>{
  const responsestatus = await axios.post('http://npcrapi.netpracharat.com/api/otp3/checkphone',{
          otp_PhoneNumber:this.state.phonenumber
          });
          if(responsestatus.data.message == 'notsame'){
            const response = await axios.post('http://npcrapi.netpracharat.com/api/otp3/insert2',{
              otp_PhoneNumber:this.state.phonenumber
    
            });
          }
}
_Verify=async()=>{
    try{
      

     if(this.state.phonenumber.length == 10){
          this.setState({loading:true})
          const responsestatus = await axios.post('http://npcrapi.netpracharat.com/api/saveuser/checkphone',{
            save_phone:this.state.phonenumber
          });
          if(responsestatus.data.message == 'same'){
            await this.setState({userid :responsestatus.data.id })
            await this.setState({type :responsestatus.data.type })
            await this.setState({name :responsestatus.data.name })
            await this.setState({lastname :responsestatus.data.lastname })
            // alert(JSON.stringify(responsestatus.data.id+responsestatus.data.type+responsestatus.data.name+responsestatus.data.lastname))
      const response = await axios.post('http://npcrapi.netpracharat.com/api/otp3/insert',{
        otp_PhoneNumber:this.state.phonenumber

      });
      this.checklogincount()
  
  let obj={
    name:this.state.name,
    lastname:this.state.lastname
  }
  // alert(this.state.type + this.state.name + this.state.userid + this.state.phonenumber + this.state.lastname)
  await AsyncStorage.setItem('user',JSON.stringify(obj))
  await AsyncStorage.setItem('phone',JSON.stringify(this.state.phonenumber))
  await AsyncStorage.setItem('userid',JSON.stringify(this.state.userid))
  await AsyncStorage.setItem('type',JSON.stringify(this.state.type))
  this.setState({loading:false})

    // RNRestart.Restart()
    Alert.alert('ลงชื่อเข้าใช้สำเร็จ', '', [{ text: 'ตกลง',onPress:()=> RNRestart.Restart()}]);
  }else if(responsestatus.data.message == 'notsame'){
      Alert.alert("ไม่มีหมายเลขโทรศัพท์มือถือ "+ this.state.phonenumber +" อยู่ในระบบ กรุณาสมัครสมาชิกก่อนลงชื่อเข้าใช้")
  }
      
      //AsyncStorage.setItem(JSON.stringify(response.data));
  //    alert(this.state.text)
      // this.props.navigation.navigate('Otp2',{ otp: response.data });
}else if(this.state.phonenumber.length < 10){
  Alert.alert('กรอกหมายเลขโทรศัพท์มือถือให้ครบถ้วน')
}
    }catch{

    }

}

_Register = () => {
    this.props.navigation.navigate('Register')
    
}
componentDidMount(){
  this.refreshScreen();
}
_Verify2=async()=>{
 try{
 
    
    
  const response = await axios.get('http://npcrapi.netpracharat.com/api/saveuser/getuserdetail/'+this.state.phonenumber);
  
  let obj={
    name:this.state.name,
    lastname:this.state.lastname
  }
  // alert(this.state.type + this.state.name + this.state.userid + this.state.phonenumber + this.state.lastname)
  await AsyncStorage.setItem('user',JSON.stringify(obj))
  await AsyncStorage.setItem('phone',JSON.stringify(this.state.phonenumber))
  await AsyncStorage.setItem('userid',JSON.stringify(this.state.userid))
  await AsyncStorage.setItem('type',JSON.stringify(this.state.type))
    // RNRestart.Restart()
    Alert.alert('ลงชื่อเข้าใช้สำเร็จ', '', [{ text: 'ตกลง',onPress:()=> RNRestart.Restart()}]);

  // this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Home' })], 0);


}catch(error){
console.log(error)
}

}


refreshScreen() {
  this.setState({ lastRefresh: Date(Date.now()).toString() })
}
render() {
  
  return (
    
    
      this.state.loading ? (
        <ActivityIndicator size="large" color="#006600" />
      ) : (
    <View style={styles.container}>
    
    <View style={{justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
    <Icon  style={{borderWidth:0 , borderColor:"black"}} name="ios-person-add" size={80} color="#006600"  />
    <Text style={{fontWeight:'bold', fontSize:30 ,color:'#006600',marginTop:-15,marginBottom:20 ,fontFamily: "Prompt-Light" }}>ลงชื่อเข้าใช้</Text>
    </View>
    <View style={{flex:1}}>
   
        <KeyboardAwareScrollView>
          <Card containerStyle={{padding: 0 ,borderRadius:7 , marginBottom:10,borderColor:'#7CFC00'}} >
        {/* <Text style={styles.labelStyle}>เลขประจำตัวประชาชน</Text>
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
          keyboardType='numeric'
        /> */}
          
        <Text style={styles.labelStyle}>หมายเลขโทรศัพท์มือถือ</Text>
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
            fontFamily: "Prompt-Light",
            borderWidth: 1,
            borderColor: '#48bbec33'}}
          placeholder="กรอกหมายเลขโทรศัพท์มือถือ"
          onChangeText={phonenumber => this.setState({ phonenumber })}
          keyboardType='numeric'
          // secureTextEntry={true}
        />
        
        
         <View style={{ flexDirection:'row' ,flex:1 ,justifyContent:'center' ,marginBottom:20}}>
        <Button
          backgroundColor='#006600'
          buttonStyle={{ marginTop: 30 ,borderRadius:10 ,width:110  }}
          // large
          title='ยืนยัน'
          fontFamily= "Prompt-Light"
          onPress={  this._Verify }
         
          
          //source={{uri:this.props.navigation.getParam('http://sms2.totbb.net/sms/tshell_sms_1.php?sender=MDES&'+this.state.phonenumber+'=0912312344&'+this.state.text+'lang=en','')}}
        /><Button
        backgroundColor='#006600'
        buttonStyle={{ marginTop: 30 ,borderRadius:10,width:110 , borderWidth: 1 ,borderColor:'#7CFC00' }}
        // large
        title='ยกเลิก'
        fontFamily= "Prompt-Light"
        backgroundColor='#FFFFFF'
        color="#006600"
          onPress={()=>this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Home' })], 0)}
       
        
        //source={{uri:this.props.navigation.getParam('http://sms2.totbb.net/sms/tshell_sms_1.php?sender=MDES&'+this.state.phonenumber+'=0912312344&'+this.state.text+'lang=en','')}}
      />
       </View>
       </Card>
       
      </KeyboardAwareScrollView>
      
      
      <View style={{ flexDirection: 'row',justifyContent: 'space-around',}}>
        
        
      </View>
      </View>
    </View>)


  )
    
  
  ;
}
}

// create a component
export class AddProfile extends Component {


  static navigationOptions = ({ navigation }) => {
    // const { params = {} } = navigation.state;
    // const params = navigation.getParam('checklogin')
    // this.state.user
    // alert(params)
    return {
      headerTitle: <Logo />,
      headerLeft: (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        </HeaderButtons>
      ),


      headerStyle: {
        backgroundColor: '#006600',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1
      },
    }
  };

  state = {

    problemname: '',
    problemdetail: '',
    province: '',
    district: '',
    subdistrict: '',
    village: '',
    getprovince: [{}],
    getdistrict: [{}],
    getsubdistrict: [{}],
    getvillage: [{}],
    hide: false,
    user: {},
    phone: this.props.navigation.state.params.credentail.phone2,
    citizen: this.props.navigation.state.params.credentail.citizen2,
    name: '',
    lastname: '',
    imageSource: null,
    userrole: '',
    type: 'admin',
    email: ''
  }

  _Postproblem = async () => {
    const response = await axios.post('http://npcrapi.netpracharat.com/api/saveuser/post', {
      problemname: this.state.problemname,
      problemdetail: this.state.problemdetail,
      province: this.state.province,
      district: this.state.district,
      subdistrict: this.state.subdistrict,
      village: this.state.village,
    });

    if (response.data.status === 'ok') {
      Alert.alert('ผลการทำงาน', response.data.message, [{ text: 'ตกลง' }]);
    } else {
      Alert.alert('ผลการทำงาน', response.data.message, [{ text: 'ตกลง' }]);
    }

  }
  async showData() {
    var Phone = await AsyncStorage.getItem("phone");
    await this.setState({ phone: Phone });
    var Citizen = await AsyncStorage.getItem("citizen");
    await this.setState({ citizen: Citizen });
    // Alert.alert( this.state.phone + this.state.citizen );

  }

  async checkroleadmin() {
    const response = await axios.post('http://npcrapi.netpracharat.com/api/saveuser/checkadmin', {
      save_phone: this.state.phone,
    });
    // var userRole = response.data.type
    if (response.data.phone > 0) {
      Alert.alert("หมายเลขโทรศัพท์ถูกใช้ไปแล้ว")
      // let obj={
      //     name : response.data.name,  
      //     lastname : response.data.lastname
      // }
      // //start add value to asyncstorage
      // AsyncStorage.setItem('user',JSON.stringify(obj));
      // AsyncStorage.setItem('phone',JSON.stringify(this.state.phone));
      // //end add value//
      // this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Home' })], 0);

    } else {
      this.getData();
    }
  }

  async getData() {
    const response = await axios.get('http://npcrapi.netpracharat.com/api/getprovince');
    this.setState({ getprovince: response.data });
    //  alert(JSON.stringify(response.data));
  }

  async getDistrict(itemValue) {
    const response = await axios.get('http://npcrapi.netpracharat.com/api/getdistrict/' + itemValue);
    this.setState({
      province: itemValue,
      getdistrict: response.data
    });
    // Alert.alert(itemValue);  
  }

  async getSubDistrict(itemValue) {
    const response = await axios.get('http://npcrapi.netpracharat.com/api/getsubdistrict/' + itemValue);
    this.setState({
      district: itemValue,
      getsubdistrict: response.data
    });
    // Alert.alert(itemValue);
  }

  async getVillage(itemValue) {
    const response = await axios.get('http://npcrapi.netpracharat.com/api/getvillage/' + itemValue);
    this.setState({
      subdistrict: itemValue,
      getvillage: response.data
    });
    // Alert.alert(itemValue);
  }

  _SaveUser = async () => {
    
    if( this.state.name.length == ''){
      Alert.alert('กรุณากรอกชื่อจริงของท่าน')
    }else if(this.state.lastname.length == ''){
     Alert.alert('กรุณากรอกนามสกุลของท่าน')
    }else if(this.state.province.length == ''){
     Alert.alert('กรุณาเลือกจังหวัด')
    }else if(this.state.district.length == ''){
     Alert.alert('กรุณาเลือกอำเภอ')
    }else if(this.state.subdistrict.length == ''){
     Alert.alert('กรุณาเลือกตำบล')
    }else if(this.state.village.length == ''){
     Alert.alert('กรุณาเลือกหมู่บ้าน')
    }else if(this.state.imageSource == null){
     Alert.alert('กรุณาเลือกรูปภาพโปรไฟล์')
    }else{
        const {name,subdistrict,village,district,province,lastname,citizen} = this.state
      const response =  await axios.post('http://npcrapi.netpracharat.com/api/saveuser/postonmobile', {
        save_name: this.state.name,
        save_phone: this.state.phone,
        save_citizen:this.state.citizen,
        save_lastname:this.state.lastname,
        province: this.state.province,
        district: this.state.district,
        headlines:this.state.imageSource.uri,
        subdistrict: this.state.subdistrict,
        village: this.state.village,
        type:this.state.type,
        email:this.state.email,
        headlines:this.state.imageSource.uri

        // status: 'ยังไม่ดำเนินการ',
    });
    
    Alert.alert(
      'สมัครสมาชิกเรียบร้อยแล้ว','',
      [
        {text: 'ตกลง', onPress: () => this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Home' })], 0)},
        
      ],
      { cancelable: false }
    )    
    

 //  Alert.alert(this.state.name+this.state.phone+this.state.citizen+this.state.lastname+this.state.province+this.state.district+this.state.subdistrict+this.state.village)
 //  Alert.alert(response)}
   
   }



}


  getparam() {
    var params = this.props.navigation.getParam("credentail")
    const { phone, citizen } = params
  }
  componentDidMount() {
    this.checkroleadmin();
    this.getData();
    // this.showData();
    this.getparam();

  }
  async showVerifyData() {

  }
  async uploadPhoto(citizen_id) {
    // citizen_id = 2222222222222;
    // alert(citizen_id)
    // alert('In uploadPhoto ... uri = '+this.state.imageSource.uri);
    //alert('In uploadPhoto ... uri');

    const response = await axios.post('http://npcrapi.netpracharat.com/api/saveuser/upload_image?citizen_id=' + citizen_id, {
      // problem_id: problem_id,
      imageData: this.state.imageSource.uri

    });
    let imageurl1 = response.data.filename
    AsyncStorage.setItem('imageurl', JSON.stringify(imageurl1))
    Alert.alert(response.data.filename);

    // Alert.alert(JSON.stringify(citizen_id));
  }

  _SelectCameraRoll = () => {

    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
      includeExif: true,
    }).then(image => {
      console.log('received base64 image');
      this.setState({
        imageSource: { uri: 'data:image/jpeg;base64,' + image.data }
      });
    })
    /*
      const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
              skipBackup: true
          }
      };
      ImageSelecter.showImagePicker(options, (response) => {
          console.log('Response = ', response);

          if (response.didCancel) {
              console.log('User cancelled image picker');
          } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
          } else {
              // alert('response image ....')
              // const source = { uri: `data:${response.data.mime};base64,` + response.data };
              // let source = { uri: response.uri };
              this.setState({
                  imageSource: {
                      uri: 'data:image/jpeg;base64,' + response.data,
                  }
              });
              //alert(this.state.imageSource.uri);
              //this.uploadPhoto(this.state.citizen);
          }
      });
      */
  };
  render() {
    return (

      <View style={styles.container}>

        <Text style={styles.welcome}><Icon name="ios-person" size={40} color='#00802b' />เพิ่มข้อมูลส่วนตัว</Text>
        {/* <Text style={styles.welcome}><Icon name="ios-megaphone" size={40} color='#00802b' /></Text> */}
        <View style={styles.lineStylew1} />
        <View style={styles.lineStylew2} />
        {this.state.neme ? (
          <KeyboardAwareScrollView>

            {/* <View style = {styles.lineStylew3} /> */}
            <FormLabel labelStyle={{ fontSize: 20, margin: 5 }} >
              2. เลือกจังหวัด
                </FormLabel>
            <Dropdown
              containerStyle={{ margin: 15, marginBottom: -10, marginTop: -10, borderColor: 'grey', borderTop: 1, borderRadius: 5, fontFamily: "Prompt-Light" }}
              label=''
              ref={province => this.province = province}
              data={this.state.getprovince}
              onChangeText={
                // province => this.setState({ province });
                (itemValue, itemIndex) => this.getDistrict(itemValue)
              }
            />
            <View style={this.state.hide ? { position: 'absolute', top: -200 } : {}}>
              <FormLabel labelStyle={{ fontSize: 20, margin: 5 }} >
                3. เลือกอำเภอ
                </FormLabel>
              <Dropdown
                containerStyle={{ margin: 15, marginBottom: -10, marginTop: -10, borderColor: 'grey', borderTop: 1, borderRadius: 5 }}
                label=''
                ref={district => this.district = district}
                data={this.state.getdistrict}
                onChangeText={
                  (itemValue, itemIndex) => this.getSubDistrict(itemValue)
                }
              />
              <FormLabel labelStyle={{ fontSize: 20, margin: 5 }} >
                4. เลือกตำบล
                </FormLabel>
              <Dropdown
                containerStyle={{ margin: 15, marginBottom: -10, marginTop: -10, borderColor: 'grey', borderTop: 1, borderRadius: 5 }}
                label=''
                ref={subdistrict => this.subdistrict = subdistrict}
                data={this.state.getsubdistrict}
                onChangeText={
                  (itemValue, itemIndex) => this.getVillage(itemValue)
                }
              />
              <FormLabel labelStyle={{ fontSize: 20, margin: 5 }} >
                5. เลือกหมู่บ้าน
                </FormLabel>
              <Dropdown
                containerStyle={{ margin: 15, marginBottom: -10, marginTop: -10, borderColor: 'grey', borderTop: 1, borderRadius: 5 }}
                label=''
                ref={village => this.village = village}
                data={this.state.getvillage}
                onChangeText={
                  village => this.setState({ village })
                }
              />
            </View>
            <View style={styles.lineStylew3} />

            {/* <FormLabel labelStyle ={{ fontSize: 20, margin: 5}} >
                    7. เบอร์ติดต่อกลับ
                </FormLabel>
                <FormInput
                    inputStyle={{ borderColor: 'grey', marginTop: 5, borderWidth: 1 ,borderRadius: 5 }}
                    ref={email => this.email = email}
                    placeholder=''
                    onChangeText={
                        email => this.setState({ email })
                    }
                    keyboardType='email-address'
                /> */}
            <View style={styles.setpositionbutton}>
              <Button
                backgroundColor='#00802b'
                buttonStyle={{ marginTop: 30, width: 100, borderWidth: 1, borderColor: '#00802b', borderRadius: 5, marginLeft: -2.5, marginRight: -2.5 }}
                // icon={{ name: 'person', type: 'font-person' }}
                title='ยืนยัน'
                onPress={this._SaveUser}
              />
              <Button
                backgroundColor='#ffff'
                buttonStyle={{ marginTop: 30, width: 100, borderWidth: 1, borderColor: '#00802b', borderRadius: 5, marginLeft: -2.5, marginRight: -2.5 }}
                // icon={{ name: 'person', type: 'font-person' }}
                title='ยกเลิก'
                color="#00802b"
                onPress={() => {
                  this.props.navigation.navigate("Report_btn_step_2");
                }}
              />
            </View>
          </KeyboardAwareScrollView>) : (
            <View>
              <KeyboardAwareScrollView>
                <Card containerStyle={{ padding: 0, borderRadius: 7, marginBottom: 100, borderColor: '#7CFC00' }} >

                  <Text style={styles.labelStyle}>หมายเลขโทรศัพท์ {this.state.phone}</Text>
                  <Text style={styles.labelStyle}>เลขบัตรประจำตัวประชาชน {this.state.citizen}</Text>


                  <Text style={styles.labelStyle}>ชื่อจริง</Text>
                  <TextInput

                    ref={name => this.name = name}
                    // keyboardType={'email-address'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    style={styles.input}
                    maxLength={60}
                    placeholder='กรอกชื่อจริง'
                    onChangeText={name => this.setState({ name })}
                  // keyboardType='email-address'
                  />

                  <Text style={styles.labelStyle}>นามสกุล</Text>
                  <TextInput
                    ref={lastname => (this.lastname = lastname)}
                    //keyboardType={'email-address'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    maxLength={60}
                    style={styles.input}
                    placeholder="กรอกนามสกุล"
                    onChangeText={lastname => this.setState({ lastname })}
                  // secureTextEntry={true}
                  />
                  <Text style={styles.labelStyle}>อีเมล</Text>
                  <TextInput
                    ref={email => (this.email = email)}
                    //keyboardType={'email-address'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    maxLength={30}
                    style={styles.input}
                    placeholder="กรอกอีเมล"
                    onChangeText={email => this.setState({ email })}
                    keyboardType={'email-address'}
                  // secureTextEntry={true}
                  />
                  {/* <TextInput
          ref={address => (this.address = address)}
          //keyboardType={'address-address'}
          autoCapitalize={'none'}
          autoCorrect={false}
          maxLength = {30}
          style={styles.input} 
          placeholder="กรอกที่อยู่ปัจจุบัน"
          onChangeText={address => this.setState({ address })}
          // keyboardType={'email-address'}

          // secureTextEntry={true}
        /> */}<View style={{ marginTop: wp('3%') }} />
                  {/* <Text style={styles.labelStyle}>ข้อมูลหมู่บ้านของคุณ</Text> */}
                  {/* <View style = {styles.lineStylew3} /> */}
               
                  <Text style={styles.labelStyle} >
                        1. เลือกจังหวัด
                   </Text>
                    <Dropdown
                        containerStyle={{ margin: 15, marginBottom: -10, marginTop: -10, borderColor: 'grey', borderTop: 1, borderRadius: 5 }}
                        label=''
                        ref={province => this.province = province}
                        data={this.state.getprovince}
                        onChangeText={
                            // province => this.setState({ province });
                            (itemValue, itemIndex) => this.getDistrict(itemValue)
                        }
                    />
                    <View style={this.state.hide ? { position: 'absolute', top: -200 } : {}}>
                        <Text style={styles.labelStyle} >
                            2. เลือกอำเภอ
                    </Text>
                        <Dropdown
                            containerStyle={{ margin: 15, marginBottom: -10, marginTop: -10, borderColor: 'grey', borderTop: 1, borderRadius: 5 }}
                            label=''
                            ref={district => this.district = district}
                            data={this.state.getdistrict}
                            onChangeText={
                                (itemValue, itemIndex) => this.getSubDistrict(itemValue)
                            }
                        />
                        <Text style={styles.labelStyle} >
                            3. เลือกตำบล
                    </Text>
                        <Dropdown
                            containerStyle={{ margin: 15, marginBottom: -10, marginTop: -10, borderColor: 'grey', borderTop: 1, borderRadius: 5 }}
                            label=''
                            ref={subdistrict => this.subdistrict = subdistrict}
                            data={this.state.getsubdistrict}
                            onChangeText={
                                (itemValue, itemIndex) => this.getVillage(itemValue)
                            }
                        />
                        <Text style={styles.labelStyle} >
                            4. เลือกหมู่บ้าน
                        </Text>
                        <Dropdown
                            containerStyle={{ margin: 15, marginBottom: -10, marginTop: -10, borderColor: 'grey', borderTop: 1, borderRadius: 5 }}
                            label=''
                            ref={village => this.village = village}
                            data={this.state.getvillage}
                            onChangeText={
                                village => this.setState({ village })
                            }
                        />
                    </View>
                    <View style={{ flex: 1, alignSelf: 'center' }}>
                      <Button
                        backgroundColor='#00802b'
                        buttonStyle={{ marginTop: 20, borderRadius: 5 }}
                        icon={{ name: 'camera', type: 'font-camera' }}
                        title='เลือกรูปภาพโปรไฟล์'
                        onPress={this._SelectCameraRoll}
                      />
                      <View style={{ alignItems: 'center' }}>
                        {this.state.imageSource === null ? <Text></Text> :
                          <Image style={styles.avatar} source={this.state.imageSource} />
                        }
                      </View>
                    </View>
            
                  <View style={styles.setpositionbutton}>
                    <Button
                      backgroundColor='#00802b'
                      buttonStyle={{ marginTop: 30, width: 100, borderWidth: 1, borderColor: '#00802b', borderRadius: 5, marginLeft: -2.5, marginRight: -2.5 }}
                      // icon={{ name: 'person', type: 'font-person' }}
                      title='ยืนยัน'
                      fontFamily="Prompt-Light"
                      onPress={()=>{Alert.alert(
                        'ยืนยันการสมัครสมาชิก','',
                        [
                          {text: 'ยืนยัน', onPress: () => this._SaveUser()},
                          {text: 'ยกเลิก'},
                        ],
                        { cancelable: false }
                      )}}
                    />
                    <Button
                      backgroundColor='#ffff'
                      buttonStyle={{ marginTop: 30, width: 100, borderWidth: 1, borderColor: '#00802b', borderRadius: 5, marginLeft: -2.5, marginRight: -2.5 }}
                      // icon={{ name: 'person', type: 'font-person' }}
                      title='ยกเลิก'
                      fontFamily="Prompt-Light"
                      color="#00802b"
                      onPress={() => {
                        this.props.navigation.navigate("Home");
                      }}
                    />
                  </View>


                  <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', marginBottom: 10 }}>

                  </View>

                </Card>

              </KeyboardAwareScrollView>

            </View>
          )}
      </View>
    );
  }
}






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
    marginLeft: 18,
    // marginBottom:10,
    padding: 4,
    borderRadius: 5,
    fontSize: 18,
    color: '#006600',
    borderWidth: 1,
    borderColor: '#48bbec33',
    fontFamily: "Prompt-Light"
  },
  labelStyle: {
    fontSize: 18,
    color: '#006600',
    marginLeft: 20,
    marginTop: 10,
    fontFamily: "Prompt-Light"
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 15,
    marginBottom: -20,
    color: '#00802b',
    fontFamily: "Prompt-Light"
  },
  setpositionbutton: {
    // flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -10,
    margin: 20,
    justifyContent: 'center',
  },
  setpositiontextafterbutton: {
    flex: .2,
    flexDirection: 'row',
    fontSize: 26,
    textAlign: 'center',
    marginTop: 45,
    marginBottom: 45,
    color: '#00802b',
  },
  setpositiontextbeforebutton: {
    flexDirection: 'row',
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
    color: '#00802b',
  },
  lineStyleh: {
    borderWidth: 0.5,
    borderColor: '#9B9B9B',
    margin: 15,
    marginTop: -2,
    height: 250
  },
  lineStylew1: {
    borderWidth: 1,
    borderColor: '#00802b',
    backgroundColor: '#00802b',
    marginTop: 40,
    width,
  },
  lineStylew2: {
    borderWidth: 2,
    borderColor: '#00802b',
    backgroundColor: '#00802b',
    marginTop: 3,
    width,
  },
  lineStylew3: {
    borderWidth: 0.5,
    borderColor: '#9B9B9B',
    backgroundColor: '#9B9B9B',
    marginTop: 20,
    alignSelf: 'center',
    width: '93%',
  },
  button: {
    margin: 10,
    marginTop: -50,
    height: 160,
    width: 160,
    alignItems: 'center',
    backgroundColor: '#A5E65A',
    borderRadius: 80,
  },
  buttonText: {
    padding: 40,
    color: 'white'
  },
  avatar: {
    //borderRadius: 75,
    margin: 10,
    marginLeft: 15,
    width: 150,
    height: 150,
    borderRadius: 10
  }
});