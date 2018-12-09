import React, { Component } from 'react';
import { Alert, Platform, StyleSheet, Text, View,ActivityIndicator, Picker,PixelRatio, Image, NativeModules , AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements'
import { FormLabel, FormInput, FormValidationMessage, Badge } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../components/logo';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons'
import { Dropdown } from 'react-native-material-dropdown';
import ImageView from 'react-native-image-view';
import { NavigationActions } from 'react-navigation';
import RNRestart from "react-native-restart";
import PhotoGrid from '../PhotoGrid';
import ImageSelecter from 'react-native-image-picker';
var ImagePicker = NativeModules.ImageCropPicker;
import axios from 'axios';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
const width = '100%';
const IoniconsHeaderButton = passMeFurther => (
    <HeaderButton {...passMeFurther} IconComponent={Icon} iconSize={30} color="white" />
  );

export default class createDcomunityScreen extends Component {


    static navigationOptions = {
        headerTitle: <Logo />,
        headerRight: (
            <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
              {/* <Item title="register" iconName="ios-add-circle-outline" onPress={() => navigation.navigate('Createnewcm')} /> */}
            </HeaderButtons>
        ),
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
        goodname: '',
        gooddetail: '',
        tel: '',
        province: '',
        type: '',
        district: '',
        subdistrict: '',
        village: '',
        userid: '',
        getprovince: [],
        getdistrict: [],
        getsubdistrict: [],
        getvillage: [],
        hide: false,
        imageSource: null,
        images: null,
        img_grid:[],
        loading:true,
        popupimg:false,
        selectedImg:null,
        isVisible:false
    }

    _Postproblem = async () => {
        if(this.state.village == '' ){
            Alert.alert('ใส่ข้อมูลหมู่บ้านให้ครบถ้วน')
        
        }else if(this.state.type.length == ''){
            Alert.alert('กรุณาเลือกประเภทสถานที่')
        }
        else if(this.state.goodname.length == '' && this.state.gooddetail.length == ''){
            Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน')
        }else if(this.state.district.length && this.state.subdistrict.length && this.state.province.length && this.state.village.length != '' && this.state.imageSource != null){
            const response = await axios.post('http://npcrapi.netpracharat.com/api/good/postgood', {
                goodname: this.state.goodname,
                gooddetail: this.state.gooddetail,
                headlines: this.state.imageSource.uri,
                province: this.state.province,
                district: this.state.district,
                type: this.state.type,
                subdistrict: this.state.subdistrict,
                village: this.state.village,
                create_by: this.state.userid,
                status: 2,
            });
    
            // alert(JSON.stringify(response));
            const good_id = response.data.id; // use insert id fk fileupload
            //alert(response.data.id);
            this.uploadmultiPhoto(good_id);
            
            if (response.data.data == 'ok') {
                this.setState({loading: false})
                Alert.alert(
                    this.state.type+'เรียบร้อยแล้ว','',
                    [
                      {text: 'ตกลง', onPress: () =>  this.props.navigation.reset([NavigationActions.navigate({ routeName: 'DALL' })], 0)},
                      
                    ],
                    { cancelable: false }
                  )

            } else {
                Alert.alert('ไม่สามารถแนะนำได้', response.data.message, [{ text: 'ตกลง' }]);
            }}else if(this.state.imageSource == null){Alert.alert('กรุณาเพิ่มรูปภาพหลัก')}
       

    }
   

    async uploadmultiPhoto(good_id) {
        await this.state.images.forEach((item, i) => {
            const response = axios.post('http://npcrapi.netpracharat.com/api/good/upload_image?good_id='+good_id, {
                imageData: item.uri
            });
        });
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

    pickMultiple() {
        ImagePicker.openPicker({
          multiple: true,
          waitAnimationEnd: false,
          includeBase64: true,
          includeExif: true,
          forceJpg: true,
        }).then(images => {
            this.state.img_grid = [];
            this.setState({
                image: null,
                images: images.map((i,index) => {
                    console.log('received image', i);
                    this.state.img_grid.push('data:image/jpeg;base64,'+i.data);
                    return {uri: 'data:image/jpeg;base64,'+i.data, index: index};
                })
            });
        
          //this.uploadmultiPhoto();
        })
    }

    rendermodalimage(uri, source) {
        // alert(source.index);
        this.setState({ 
            popupimg: false,
            selectedImg: null,
            isVisible:false
        });
        this.setState({ 
            popupimg: true,
            selectedImg: source.uri ,
            isVisible: true
        });
    }

    async getuserid(){
        var userids = await AsyncStorage.getItem("userid");
        await this.setState({ userid: userids });
    }

    async getData() {
        const response = await axios.get('http://npcrapi.netpracharat.com/api/problem/getprovince');
        this.setState({ getprovince: response.data });
        this.setState({ loading: false });

        // alert(JSON.stringify(response.data));
        // new Date().toLocaleString(),
        // const timestamp = Date.now();
        // alert(new Date().format("YYYY-MM-DD HH:mm:ss"));

    }

    async getDistrict(itemValue) {
        const response = await axios.get('http://npcrapi.netpracharat.com/api/problem/getdistrict/' + itemValue);
        this.setState({
            province: itemValue,
            getdistrict: response.data
        });
        // Alert.alert(itemValue);  
    }

    async getSubDistrict(itemValue) {
        const response = await axios.get('http://npcrapi.netpracharat.com/api/problem/getsubdistrict/' + itemValue);
        this.setState({
            district: itemValue,
            getsubdistrict: response.data
        });
        // Alert.alert(itemValue);
    }

    async getVillage(itemValue) {
        const response = await axios.get('http://npcrapi.netpracharat.com/api/problem/getvillage/' + itemValue);
        this.setState({
            subdistrict: itemValue,
            getvillage: response.data
        });
        // Alert.alert(itemValue);
    }

    

    componentDidMount() {
        this.getData();
        this.getuserid();
    }

    render() {
        let data = [{
                value: 'แนะนำที่กิน',
            }, {
                value: 'แนะนำที่เที่ยว',
            }, {
                value: 'แนะนำของดีชุมชน',
            }
        ];

        const images = [
            {
                source: {
                    uri: this.state.selectedImg,
                },
                title: 'img',
                width: 806,
                height: 720,
            },
        ];

        return (
            this.state.loading ? (
                <ActivityIndicator size='large' color="#006600"/>
               ):(
            <View style={styles.container}>
                <Text style={styles.welcome}><Icon name="ios-thumbs-up" size={40} color='#00802b' />  แนะนำสถานที่</Text>
                <View style={styles.lineStylew1} />
                <View style={styles.lineStylew2} />
                <KeyboardAwareScrollView>
                    <FormLabel labelStyle={{ fontSize: 20, margin: 5 }} >
                        1. ประเภทสถานที่
                    </FormLabel>
                    <Dropdown
                        containerStyle={{ margin: 15, marginBottom: -10, marginTop: -10, borderColor: 'grey', borderTop: 1, borderRadius: 5 }}
                        ref={type => this.type = type}
                        label=''
                        data={data}
                        onChangeText={
                            type => this.setState({ type })
                        }
                    />
                    {/* <View style = {styles.lineStylew3} /> */}
                    <FormLabel labelStyle={{ fontSize: 20, margin: 5 }} >
                        2. เลือกจังหวัด
                    </FormLabel>
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
                    <FormLabel labelStyle={{ fontSize: 20, margin: 5 }} >
                        6. สถานที่
                    </FormLabel>
                    <FormInput
                        inputStyle={{ borderColor: 'grey', marginTop: 5, borderWidth: 1, borderRadius: 5 }}
                        ref={goodname => this.goodname = goodname}
                        placeholder=''
                        onChangeText={
                            goodname => this.setState({ goodname: goodname.trim() })
                        }
                    // keyboardType='numeric'
                    />
                    <Button
                        backgroundColor='#00802b'
                        buttonStyle={{ marginTop: 20, borderRadius: 5 }}
                        icon={{ name: 'camera', type: 'font-camera' }}
                        title='เพิ่มรูปภาพหลัก'
                        onPress={this._SelectCameraRoll}
                    />
                    <View>
                        { this.state.imageSource === null ? <Text></Text> :
                            <Image style={styles.avatar} source={this.state.imageSource} />
                        }
                    </View>
                    <View style={styles.lineStylew3} />
                    <FormLabel labelStyle={{ fontSize: 20, margin: 5 }} >
                        7. รายละเอียด
                    </FormLabel>
                    <FormInput
                        inputStyle={{ borderColor: 'grey', marginTop: 5, borderWidth: 1, borderRadius: 5 }}
                        numberOfLines={5}
                        ref={gooddetail => this.gooddetail = gooddetail}
                        placeholder=''
                        onChangeText={
                            gooddetail => this.setState({ gooddetail })
                        }

                    />
                    <Button
                        backgroundColor='#00802b'
                        buttonStyle={{ marginTop: 20, borderRadius: 5 }}
                        icon={{ name: 'camera', type: 'font-camera' }}
                        title='เพิ่มรูปภาพรายละเอียด'
                        onPress={this.pickMultiple.bind(this)}
                    />
                    <View style={styles.lineStylew3} />
                    <View style={styles.setpositionbutton}>
                        <Button
                            backgroundColor='#00802b'
                            buttonStyle={{ marginTop: 30, width: 100, borderWidth: 1, borderColor: '#00802b', borderRadius: 5, marginLeft: -2.5, marginRight: -2.5 }}
                            // icon={{ name: 'person', type: 'font-person' }}
                            title='ยืนยัน'
                            onPress={()=>{Alert.alert(
                                'ยืนยันการเพิ่มสถานที่','กดยืนยันเพื่อยืนยันการเพิ่มสถานที่ หรือ ยกเลิกเพื่อแก้ไข',
                                [
                                  {text: 'ยืนยัน', onPress: () => this._Postproblem()},
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
                            color="#00802b"
                            onPress={() => {
                                this.props.navigation.navigate("Dcomunity");
                            }}
                        />
                        {
                            (this.state.popupimg == true) ? (
                                <ImageView
                                    images={images}
                                    imageIndex={0}
                                    isVisible={this.state.isVisible}
                                    renderFooter={(currentImage) => (<View><Text>My footer</Text></View>)}
                                    onClose={ () => this.setState({ isVisible: false}) }
                                />
                            ) : (
                                <Text></Text>            
                            )
                        }
                    </View>
                    <PhotoGrid source={this.state.images ? this.state.images : null} onPressImage={(uri, source) => this.rendermodalimage(uri, source)} />
                </KeyboardAwareScrollView>
            </View>
        ));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 15,
        marginBottom: -20,
        color: '#00802b',
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
        alignSelf: 'center',
        margin: 10,
        marginLeft: 15,
        width: wp('55%'),
        height: wp('55%'),
    }
});