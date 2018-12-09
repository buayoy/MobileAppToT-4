import React, { Component } from 'react';
import { RefreshControl, Image, AsyncStorage, Alert, TextInput, ScrollView, AppRegistry, NativeModules, StyleSheet, Text, ActivityIndicator, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Dropdown } from 'react-native-material-dropdown';
import ImageSelecter from 'react-native-image-picker';

var ImagePicker = NativeModules.ImageCropPicker;
// import { FormLabel, FormInput, FormValidationMessage, Button ,Card } from 'react-native-elements'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import Logo from '../components/logo/index'
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';
import { Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from 'react-native-elements'
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import RNRestart from "react-native-restart";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FormLabel, FormInput, FormValidationMessage, Badge } from 'react-native-elements'

const IoniconsHeaderButton = passMeFurther => (
  <HeaderButton {...passMeFurther} IconComponent={Icon} iconSize={30} color="white" />
);


//  const resetReport ={ReportStack}

export default class Profilescreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

      problemname: '',
      problemdetail: '',
      province: '',
      district: '',
      subdistrict: '',
      village: '',
      getprovince: [],
      getdistrict: [],
      getsubdistrict: [],
      getvillage: [],
      hide: false,
      user: {},
      phone: '',
      citizen: '',
      loading: true,
      name: '',
      lastname: '',
      image: '',
      email: '',
      headlines: '',
      type: '',
      refreshing: false,

    }
  }
  // state = {user: ''}
  // updateUser = (user) =>{
  //    this.setState({ user: user })
  // }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getuser2()

  }
  static navigationOptions = ({ navigation }) => {
    // const { params = {} } = navigation.state;
    // const params = navigation.getParam('checklogin')
    // this.state.user
    // alert(params)
    return {
      headerTitle: <Logo />,
      headerRight: (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          {
            <Item
              title="edit"
              iconName="edit"
              onPress={() => navigation.navigate("EditProfile")}
            />
          }
        </HeaderButtons>
      ),
      // headerLeft:(<View>
      //   <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
      //     {
      //     <Item 
      //     title="edit"
      //     iconName="edit" 
      //     onPress={() => navigation.navigate("EditProfile")}
      //     />
      //     }        

      //   </HeaderButtons> <View style={{marginLeft:wp('4%')}}><Text style={{fontSize:18, fontWeight:'bold' ,color:'#FFFFFF'}} onPress={()=>{navigation.navigate('Home')}}>กลับสู่หน้าแรก</Text></View>
      //   </View>
      //   ),


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
  async  clearAsyncStorageAndRestartApp() {
    await AsyncStorage.clear();
    RNRestart.Restart();
  }
  Logout() {


    Alert.alert(
      'ยืนยันการออกจากระบบ', '',
      [
        { text: 'ยืนยัน', onPress: () => this.clearAsyncStorageAndRestartApp() },
        { text: 'ยกเลิก' },
      ],
      { cancelable: false }
    )
  }
  async getdataImage() {

  }
  componentDidMount() {
    this.getuser2()
  }
  async getuser2() {

    var phones = await AsyncStorage.getItem("phone");
    phones = phones.substring(1, phones.length - 1);
    await this.setState({ phone: phones });
    // alert(this.state.phone)
    const response = await axios.post('http://npcrapi.netpracharat.com/api/saveuser/checkadmin?save_phone=' + this.state.phone);

    await this.setState({ name: response.data.name, loading: false });
    await this.setState({ lastname: response.data.lastname });
    await this.setState({ citizen: response.data.citizen });
    await this.setState({ village: response.data.village });
    await this.setState({ district: response.data.district });
    await this.setState({ subdistrict: response.data.subdistrict });
    await this.setState({ type: response.data.type });
    await this.setState({ email: response.data.email });
    await this.setState({ image: response.data.image });
    await this.setState({ province: response.data.province });

    // Alert.alert(response.data.image);
    this.setState({ refreshing: false });
  }

  render() {


    return (

      <View style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="#006600" />

        ) : (
            <KeyboardAwareScrollView>
              <Image source={require('../img/profilepic.jpg')} resizeMode='stretch' style={{ justifyContent: 'flex-start', width: wp('100%'), height: hp('20%'), marginLeft: wp('0%'), borderRadius: hp('0%') }} />
              <TouchableHighlight style={{ marginTop: wp('-15%'), marginLeft: wp('7%') }}>
                {/* <Image style={ styles.image }  source= {{ uri:'http://npcrimage.netpracharat.com/imagesaveuser/'+this.state.imageurl }}/> */}
                {this.state.image == null ? (<Image style={styles.image} source={require('../img/1024x1024.png')} />) : (<Image style={styles.image} source={{ uri: 'http://npcrimage.netpracharat.com/imagesaveuser/' + this.state.image }} />)}
                {/* <Image style={ styles.image }  source= {{ uri:'http://npcrimage.netpracharat.com/imagesaveuser/'+this.state.imageurl }} /> */}
              </TouchableHighlight>

              {/* <Text style={{fontSize:20,marginTop:wp('-15%'),marginLeft: wp('45%'),color:'#006600',fontWeight:'bold'}}>{this.state.imageurl} </Text> */}
              <Text style={{ fontSize: 20, marginTop: wp('-15%'), marginLeft: wp('45%'), color: '#006600', fontSize: hp('2.5%'), fontFamily: "Prompt-Bold" }}>{this.state.name} {this.state.lastname}</Text>



              <View style={{ marginTop: wp('10%') }}>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.labelstyle}>เลขบัตรประจำตัวประชาชน</Text>
                  <View style={styles.boxset}>
                    <Text style={styles.fontstyle}>----------</Text>
                  </View>
                </View>
                
                <View style={styles.lineStylew3} />

                <View style={{ flexDirection: 'row' }}>

                  <Text style={styles.labelstyle}>ชื่อ - สกุล</Text>
                  <View style={styles.boxset}>
                    <Text style={styles.fontstyle}>{this.state.name} {this.state.lastname}</Text>
                  </View>
                </View>
                <View style={styles.lineStylew3} />

                <View style={{ flexDirection: 'row' }}>

                  <Text style={styles.labelstyle}>หมู่บ้าน</Text>
                  <View style={styles.boxset}>
                    <Text style={styles.fontstyle}>{this.state.village}</Text>
                  </View>
                </View>

                <View style={styles.lineStylew3} />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.labelstyle}>ตำบล</Text>
                  <View style={styles.boxset}>
                    <Text style={styles.fontstyle}>{this.state.subdistrict}</Text>
                  </View>
                </View>
                <View style={styles.lineStylew3} />

                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.labelstyle}>อำเภอ</Text>
                  <View style={styles.boxset}>
                    <Text style={styles.fontstyle}>{this.state.district}</Text>
                  </View>
                </View>
                <View style={styles.lineStylew3} />

                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.labelstyle}>จังหวัด</Text>
                  <View style={styles.boxset}>
                    <Text style={styles.fontstyle}>{this.state.province}</Text>
                  </View>
                </View>
                <View style={styles.lineStylew3} />
                <View style={{ flexDirection: 'row' }}>

                  <Text style={styles.labelstyle}>หมายเลขโทรศัพท์มือถือ</Text>
                  <View style={styles.boxset}>

                    <Text style={styles.fontstyle}>{this.state.phone}</Text>
                  </View>
                </View>
                <View style={styles.lineStylew3} />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.labelstyle}>ประเภทผู้ใช้งาน</Text>
                  <View style={styles.boxset}>
                    <Text style={styles.fontstyle}>{this.state.type}</Text>
                  </View>
                </View>
                <View style={styles.lineStylew3} />



                <View style={{ flexDirection: 'row', marginBottom: 0 }}>
                  <Text style={styles.labelstyle}>อีเมล</Text>
                  <View style={styles.boxset}>
                    <Text style={styles.fontstyle}>{this.state.email}</Text>
                  </View>
                </View>
                <View style={styles.lineStylew3} />



                <Button
                  backgroundColor='#006600'
                  // buttonStyle={{ marginTop: 30 }}
                  buttonStyle={{ marginTop: 10, borderRadius: 10, marginBottom: 10 }}
                  // large
                  title='ออกจากระบบ'
                  fontFamily="Prompt-Light"
                  color="#FFFFFF"

                  onPress={() => this.Logout()}


                //source={{uri:this.props.navigation.getParam('http://sms2.totbb.net/sms/tshell_sms_1.php?sender=MDES&'+this.state.phonenumber+'=0912312344&'+this.state.text+'lang=en','')}}
                />

              </View>




            </KeyboardAwareScrollView>)}
      </View>

    );
  }
}

export class EditProfilescreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      loading: true,
      user: {},
      phone: '',
      citizen: '',
      name: '',
      lastname: '',
      imageSources: null,
      image: '',
      type: '',
      headlines: '',
      userID: '',
      email: ''
    }
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
  _onRefresh = () => {
    this.setState({
      loading: true
    });
    this.getuser();
  }
  // state = {user: ''}
  // updateUser = (user) =>{
  //    this.setState({ user: user })
  // }
  static navigationOptions = ({ navigation }) => {
    // const { params = {} } = navigation.state;
    // const params = navigation.getParam('checklogin')
    // this.state.user
    // alert(params)
    return {
      headerTitle: <Logo />,
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
        flex: 1
      },
    }
  };

  SaveUser = async () => {
      this.updateProfile();
      this.updatePic();
      await this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Home' })], 0)
    }

  async getData() {
    const response = await axios.get('http://npcrapi.netpracharat.com/api/getprovince');
    this.setState({ getprovince: response.data, loading: false });
    //  alert(JSON.stringify(response.data));
  }

  async getDistrict(itemValue) {
    if (itemValue == '') {
      var phones = await AsyncStorage.getItem("phone");
      phones = phones.substring(1, phones.length - 1);
      await this.setState({ phone: phones });

      const responseuser = await axios.post('http://npcrapi.netpracharat.com/api/saveuser/checkadmin?save_phone=' + this.state.phone);
      this.setState({ province: responseuser.data.province })
      const response = await axios.get('http://npcrapi.netpracharat.com/api/getdistrict/' + this.state.province);
      this.setState({
        province: responseuser.data.province,
        getdistrict: response.data
      });
    } else {
      const response = await axios.get('http://npcrapi.netpracharat.com/api/getdistrict/' + itemValue);
      this.setState({
        province: itemValue,
        getdistrict: response.data
      });
      // Alert.alert(itemValue);  
    }
  }

  async getSubDistrict(itemValue) {
    if (itemValue == '') {
      var phones = await AsyncStorage.getItem("phone");
      phones = phones.substring(1, phones.length - 1);
      await this.setState({ phone: phones });

      const responseuser = await axios.post('http://npcrapi.netpracharat.com/api/saveuser/checkadmin?save_phone=' + this.state.phone);
      this.setState({ district: responseuser.data.district })
      const response = await axios.get('http://npcrapi.netpracharat.com/api/getsubdistrict/' + this.state.district);
      this.setState({
        district: this.state.district,
        getsubdistrict: response.data
      });
    } else {
      const response = await axios.get('http://npcrapi.netpracharat.com/api/getsubdistrict/' + itemValue);
      this.setState({
        district: itemValue,
        getsubdistrict: response.data
      });
    }

    // Alert.alert(itemValue);
  }

  async getVillage(itemValue) {
    if (itemValue == '') {
      // alert('itemvalue = null')
      var phones = await AsyncStorage.getItem("phone");
      phones = phones.substring(1, phones.length - 1);
      await this.setState({ phone: phones });

      const responseuser = await axios.post('http://npcrapi.netpracharat.com/api/saveuser/checkadmin?save_phone=' + this.state.phone);
      this.setState({ subdistrict: responseuser.data.subdistrict })

      const response = await axios.get('http://npcrapi.netpracharat.com/api/getvillage/' + this.state.subdistrict);
      this.setState({
        subdistrict: this.state.subdistrict,
        getvillage: response.data
      });
    } else {
      const response = await axios.get('http://npcrapi.netpracharat.com/api/getvillage/' + itemValue);
      this.setState({
        subdistrict: itemValue,
        getvillage: response.data
      });
    }

    // Alert.alert(itemValue);
  }

  async getuser() {
    var phones = await AsyncStorage.getItem("phone");
    phones = phones.substring(1, phones.length - 1);
    await this.setState({ phone: phones });

    const response = await axios.post('http://npcrapi.netpracharat.com/api/saveuser/checkadmin?save_phone=' + this.state.phone);
    await this.setState({ userID: response.data.id });
    await this.setState({ image: response.data.image });
    await this.setState({ name: response.data.name });
    await this.setState({ lastname: response.data.lastname });
    await this.setState({ email: response.data.email });
    await this.setState({ province: response.data.province });
    await this.setState({ district: response.data.district });
    await this.setState({ subdistrict: response.data.subdistrict });
    await this.setState({ village: response.data.village });

    // alert(this.state.image)
  }

  componentDidMount() {
    this.getuser();
    this._onRefresh();
    this.getData();
    this.getDistrict(this.state.province)
    this.getSubDistrict(this.state.district)
    this.getVillage(this.state.subdistrict)
  }
  async updateProfile() {

    const response = await axios.post('http://npcrapi.netpracharat.com/api/saveuser/edit', {
      id: this.state.userID,
      save_name: this.state.name,
      save_lastname: this.state.lastname,
      email: this.state.email,
      province: this.state.province,
      district: this.state.district,
      subdistrict: this.state.subdistrict,
      village: this.state.village
    })
    // alert(this.state.village)
  }
  async updatePic() {


    const response = await axios.post('http://npcrapi.netpracharat.com/api/saveuser/editpic', {
      id: this.state.userID,
      headlines: this.state.imageSource.uri
    })
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
    // Alert.alert(response.data.filename);

    // Alert.alert(JSON.stringify(citizen_id));
  }

  _SelectCameraRoll = () => {
    //   ImagePicker.openPicker({
    //     width: 300,
    //     height: 300,
    //     cropping: true,
    //     includeBase64: true,
    //     includeExif: true,
    // }).then(image => {
    //     console.log('received base64 image');
    //     this.setState({
    //         imageSource: {uri: 'data:image/jpeg;base64,'+image.data}
    //     });
    // })
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
    };

  render() {


    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="#006600" />
        ) : (
            <KeyboardAwareScrollView>
              {/* <Button onPress={()=> this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Home' })], 0) } /> */}
              <Image source={require('../img/profilepic.jpg')} resizeMode='stretch' style={{ justifyContent: 'flex-start', width: wp('100%'), height: hp('20%'), marginLeft: wp('0%'), borderRadius: hp('0%') }} />
              <Text style={{ fontSize: 20, marginTop: wp('4%'), marginLeft: wp('47%'), color: '#006600', fontSize: hp('2.5%'), fontFamily: "Prompt-Bold" }}>{this.state.name} {this.state.lastname}</Text>
              <View>
                {this.state.imageSource ? (
                  <TouchableHighlight style={{ marginTop: wp('-30%'), marginLeft: wp('7%') }}>
                    <Image style={styles.image} source={this.state.imageSource} />
                  </TouchableHighlight>) : (<TouchableHighlight style={{ marginTop: wp('-30%'), marginLeft: wp('7%') }}>
                    <Image style={styles.image} source={this.state.image ? ({ uri: 'http://npcrimage.netpracharat.com/imagesaveuser/' + this.state.image }) : ({ uri: 'http://npcrimage.netpracharat.com/imagesaveuser/1024x1024.png' })} />
                  </TouchableHighlight>
                  )}
              </View>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: '#739852',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 50,
                  height: 50,
                  backgroundColor: '#739852',
                  borderRadius: 100,
                  marginLeft: wp('28%'),
                  marginTop: wp('-12%')
                }}
              >
                <Icon name={"image"} size={30} color="#FFFFFF" onPress={this._SelectCameraRoll} />
              </TouchableOpacity>
              <View style={{ alignItems: 'center', marginTop: wp('5%'), marginBottom: wp('-10%') }}>
                <Text style={{ fontFamily: "Prompt-Light", fontSize: 25, color: "#006600", marginTop: wp('10%') }}>แก้ไขข้อมูล</Text>
              </View><View style={{ marginTop: wp('10%') }}>
                <Text style={styles.labelStyle}>ชื่อจริง</Text>
                <TextInput

                  ref={name => this.name = name}
                  // keyboardType={'email-address'}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  style={styles.input}
                  maxLength={60}
                  // autoFocus
                  value={this.state.name}
                  placeholder="กรอกชื่อ"
                  onChangeText={name => this.setState({ name })}
                // keyboardType='email-address'
                />
                <Text style={styles.labelStyle}>นามสกุล</Text>
                <TextInput

                  ref={lastname => this.lastname = lastname}
                  // keyboardType={'email-address'}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  style={styles.input}
                  // autoFocus
                  // disableFullscreenUI={true}
                  maxLength={60}
                  value={this.state.lastname}
                  placeholder="กรอกนามสกุล"
                  onChangeText={lastname => this.setState({ lastname })}
                // keyboardType='email-address'
                />
                <Text style={styles.labelStyle}>อีเมล</Text>
                <TextInput

                  ref={email => this.email = email}
                  // keyboardType={'email-address'}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  style={styles.input}
                  maxLength={60}
                  value={this.state.email}
                  placeholder="กรอกอีเมล"
                  onChangeText={email => this.setState({ email })}
                // keyboardType='email-address'
                />
                <Text style={styles.labelStyle} >
                  1. เลือกจังหวัด
                    </Text>
                <Dropdown
                  containerStyle={{ margin: 15, marginBottom: -10, marginTop: -10, borderColor: 'grey', borderTop: 1, borderRadius: 5 }}
                  label=''
                  ref={province => this.province = province}
                  data={this.state.getprovince}
                  value={this.state.province}
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
                    value={this.state.district}
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
                    value={this.state.subdistrict}
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
                    value={this.state.village}
                    onChangeText={
                      village => this.setState({ village })
                    }
                  />
                </View>


                <View style={styles.setpositionbutton}>
                  <Button
                    backgroundColor='#00802b'
                    buttonStyle={{ marginTop: 30, width: 100, borderWidth: 1, borderColor: '#00802b', borderRadius: 5, marginLeft: -2.5, marginRight: -2.5 }}
                    // icon={{ name: 'person', type: 'font-person' }}
                    title='ยืนยัน'
                    onPress={() => {
                      Alert.alert(
                        'ยืนยันการแก้ไข', '',
                        [
                          { text: 'ยืนยัน', onPress: () => this.SaveUser() },
                          { text: 'ยกเลิก' },
                        ],
                        { cancelable: false }
                      )
                    }}
                  />
                  <Button
                    backgroundColor='#ffff'
                    buttonStyle={{ marginTop: 30, width: 100, borderWidth: 1, borderColor: '#00802b', borderRadius: 5, marginLeft: -2.5, marginRight: -2.5 }}
                    // icon={{ name: 'person', type: 'font-person' }}
                    title='ยกเลิก'
                    color="#00802b"
                    onPress={() => {
                      this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Home' })], 0)
                    }}
                  />
                </View></View>

            </KeyboardAwareScrollView>
          )}
      </View>
    );
  }
}
const data = [
  { value: 'Banana', },
  { value: 'Mango', },
  { value: 'Pear', },
  { value: 'test' }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    flexDirection: 'column'
  },
  buttonText: {
    padding: 20,
    color: 'black'
  },
  text: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'red'
  },
  lineStylew3: {
    borderWidth: 0.8,
    borderColor: '#9B9B9B',
    backgroundColor: '#9B9B9B',
    // marginTop: 20,
    marginTop: wp('1%'),
    // marginBottom:wp('1%'),
    alignSelf: 'center',
    width: '93%',
  },
  fontstyle: {
    marginLeft: wp('5%'),
    fontSize: hp('2.3%'),
    color: '#006600',
    fontFamily: "Prompt-Light",
  },
  labelstyle: {
    fontSize: hp('2.3%'),
    // fontSize:18,
    marginLeft: wp('5%'),
    color: '#006600',
    fontFamily: "Prompt-Bold"
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
    fontSize: hp('2.3%'),
    color: '#006600',
    marginLeft: wp('5%'),
    marginTop: 10,
    fontFamily: "Prompt-SemiBold"
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
    fontFamily: "Prompt-Light"
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
  circle: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  imageContainer: {
    height: 128,
    width: 128,
    borderRadius: 64
  },
  image: {
    height: 128,
    width: 128,
    borderRadius: 64
  },
  boxset: {
    flex: 1, alignItems: 'flex-end', marginRight: wp('7%')
  }
});
const width = '100%';


// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Touchables);
