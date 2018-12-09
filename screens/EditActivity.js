import React, { Component } from 'react';
import { Alert, Platform, StyleSheet, Text, View, Picker,PixelRatio, Image, NativeModules } from 'react-native';
import { Button } from 'react-native-elements'
import { FormLabel, FormInput, FormValidationMessage, Badge } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../components/logo';
import { Dropdown } from 'react-native-material-dropdown';
import ImageView from 'react-native-image-view';
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
import { NavigationActions } from 'react-navigation';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';

const width = '100%';
const IoniconsHeaderButton = passMeFurther => (
    <HeaderButton {...passMeFurther} IconComponent={Icon} iconSize={30} color="white" />
  
  );

export default class EditActivity extends Component {


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
        activityname: '',
        activitydetail: '',
        // tel: '',
        province: '',
        district: '',
        subdistrict: '',
        village: '',
        getprovince: [],
        getdistrict: [],
        getsubdistrict: [],
        getvillage: [],
        hide: false,
        imageSource: null,
        images: null,
        img_grid:[],
        popupimg:false,
        selectedImg:null,
        _checkImage_by_api:false,
        isVisible:false
    }

    _Postproblem = async () => {
        const response = await axios.post('http://npcrapi.netpracharat.com/api/activity/post', {
            activityname: this.state.activityname,
            activitydetail: this.state.activitydetail,
            headlines: this.state.imageSource.uri,
            province: this.state.province,
            district: this.state.district,
            subdistrict: this.state.subdistrict,
            village: this.state.village,
            status: 2,
        });

        // alert(JSON.stringify(response));
        const activity_id = response.data.id; // use insert id fk fileupload
        //alert(response.data.id);
        this.uploadmultiPhoto(activity_id);

        if (response.data.data == 'ok') {
            Alert.alert('เพิ่มกิจกรรมเรียบร้อยแล้ว', '', [{ text: 'ตกลง' }]);
            this.props.navigation.navigate('Activity');
        } else {
            Alert.alert('ไม่สามารถเพิ่มกิจกรรมได้', response.data.message, [{ text: 'ตกลง' }]);
        }

    }

   
    async uploadmultiPhoto(activity_id) {
        // alert(activity_id)
        const deleteoldimages = await axios.post('http://npcrapi.netpracharat.com/api/activity/delete_old_image?activity_id='+activity_id);

        await this.state.images.forEach((item, i) => {
            const response = axios.post('http://npcrapi.netpracharat.com/api/activity/upload_image?activity_id='+activity_id, {
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
            this.setState({_checkImage_by_api:false});
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

    async getactivity(id) {
        const response = await axios.get('http://npcrapi.netpracharat.com/api/activity/detail/' + id);
        await this.setState({ province: response.data.province });
        await this.setState({ district: response.data.district });
        await this.setState({ subdistrict: response.data.subdistrict });
        await this.setState({ village: response.data.village });
        await this.setState({ activityname: response.data.activityname });
        await this.setState({ activitydetail: response.data.activitydetail });
        await this.setState({ headlines: response.data.headlines });

        const responsereplyImage = await axios.get('http://npcrapi.netpracharat.com/api/activity/detail/images/' + id);
        // alert(JSON.stringify(responsereplyImage))
        if(responsereplyImage != null){
            this.setState({_checkImage_by_api: true})
        }
        // alert(this.state._checkImage_by_api)
        this.setState({
            images: responsereplyImage.data.map((i, index) => {
                let urlToImage = 'http://npcrimage.netpracharat.com/imageactivity/' + i.filename;

                return { uri: urlToImage, index: index };
            })
        });
     
      }

    async getData() {
        const response = await axios.get('http://npcrapi.netpracharat.com/api/problem/getprovince');
        this.setState({ getprovince: response.data });
        // alert(JSON.stringify(response.data));
        // new Date().toLocaleString(),
        // const timestamp = Date.now();
        // alert(new Date().format("YYYY-MM-DD HH:mm:ss"));

    }

    async getDistrict(itemValue,id) {
        const responsedata = await axios.get('http://npcrapi.netpracharat.com/api/activity/detail/' + id);
        await this.setState({ province: responsedata.data.province });
        if(itemValue == ''){
            const response = await axios.get('http://npcrapi.netpracharat.com/api/problem/getdistrict/' + this.state.province);
            this.setState({
                province: this.state.province,
                getdistrict: response.data
            });
        }else{
            const response = await axios.get('http://npcrapi.netpracharat.com/api/problem/getdistrict/' + itemValue);
            this.setState({
                province: itemValue,
                getdistrict: response.data
            });
        }
    }

    async getSubDistrict(itemValue,id) {
        const responsedata = await axios.get('http://npcrapi.netpracharat.com/api/activity/detail/' + id);
        await this.setState({ district: responsedata.data.district });
        if(itemValue == ''){
            const response = await axios.get('http://npcrapi.netpracharat.com/api/problem/getsubdistrict/' + this.state.district);
            this.setState({
                district: this.state.district,
                getsubdistrict: response.data
            });
        }else{
            const response = await axios.get('http://npcrapi.netpracharat.com/api/problem/getsubdistrict/' + itemValue);
        this.setState({
            district: itemValue,
            getsubdistrict: response.data
        });
        }
    }

    async getVillage(itemValue ,id) {
        const responsedata = await axios.get('http://npcrapi.netpracharat.com/api/activity/detail/' + id);
        await this.setState({ subdistrict: responsedata.data.subdistrict });
        if(itemValue == ''){
            const response = await axios.get('http://npcrapi.netpracharat.com/api/problem/getvillage/' + this.state.subdistrict);
            this.setState({
                subdistrict: this.state.subdistrict,
                getvillage: response.data
            });
        }else{
            const response = await axios.get('http://npcrapi.netpracharat.com/api/problem/getvillage/' + itemValue);
        this.setState({
            subdistrict: itemValue,
            getvillage: response.data
        });
        }
     
    }

    

    componentDidMount() {
        const id = this.props.navigation.getParam('id', 0);
        this.getData();
        this.getactivity(id);
        this.getDistrict(this.state.province,id)
        this.getSubDistrict(this.state.district ,id)
        this.getVillage(this.state.subdistrict , id)
     
    }
    async editactivity(id){
        const response = await axios.post('http://npcrapi.netpracharat.com/api/activity/edit',{
            id:id,
            province:this.state.province,
            district:this.state.district,
            subdistrict:this.state.subdistrict,
            village:this.state.village,
            activityname:this.state.activityname,
            activitydetail:this.state.activitydetail,
            status: 2
           })
           this.updateProfile(id)
        //    this.uploadmultiPhoto(id)
           if(this.state._checkImage_by_api != true){
               this.uploadmultiPhoto(id);
           }
           this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Activity' })], 0)
       }
    async updateProfile(id){
       // Alert.alert('ipdate profile.....')
       const response = await axios.post('http://npcrapi.netpracharat.com/api/activity/editpic',{
         id:id,
       headlines:this.state.imageSource.uri
       })
     }


    render() {
        let data = [{
            value: 'เป็นผู้แจ้งเหตุ',
        }, {
            value: 'เป็นผู้เดือดร้อน',
        }];

        const images = [
            {
                source: {
                    uri: this.state.selectedImg,
                },
                title: 'img',
                width: 806,
                height: 720,
            },
        ]; const id = this.props.navigation.getParam('id', 0);

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}><Icon name="ios-megaphone" size={40} color='#00802b' />  แก้ไขกิจกรรม</Text>
                <View style={styles.lineStylew1} />
                <View style={styles.lineStylew2} />
                <KeyboardAwareScrollView>
                    <FormLabel labelStyle={{ fontSize: 20, margin: 5 }} >
                        1. เลือกจังหวัด
                    </FormLabel>
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
                        <FormLabel labelStyle={{ fontSize: 20, margin: 5 }} >
                            2. เลือกอำเภอ
                    </FormLabel>
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
                        <FormLabel labelStyle={{ fontSize: 20, margin: 5 }} >
                            3. เลือกตำบล
                    </FormLabel>
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
                        <FormLabel labelStyle={{ fontSize: 20, margin: 5 }} >
                            4. เลือกหมู่บ้าน
                    </FormLabel>
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
                    <View style={styles.lineStylew3} />
                    <FormLabel labelStyle={{ fontSize: 20, margin: 5 }} >
                        5. หัวข้อกิจกรรม
                    </FormLabel>
                    <FormInput
                        multiline={true}
                        numberOfLines={2}
                        inputStyle={{ borderColor: 'grey', marginTop: 5, borderWidth: 1, borderRadius: 5 }}
                        ref={activityname => this.activityname = activityname}
                        value={this.state.activityname}
                        placeholder=''
                        onChangeText={
                            activityname => this.setState({ activityname: activityname.trim() })
                        }
                    />
                    <Button
                        backgroundColor='#00802b'
                        buttonStyle={{ marginTop: 20, borderRadius: 5 }}
                        icon={{ name: 'camera', type: 'font-camera' }}
                        title='แก้ไขรูปภาพกิจกรรม'
                        onPress={this._SelectCameraRoll}
                    />
                    <View>
                        <Image style={styles.avatar} source={{uri:'http://npcrimage.netpracharat.com/imageactivity/'+this.state.headlines}} />
                        { this.state.imageSource === null ? <Text></Text> :
                            <Image style={{ alignSelf: 'center',
                            margin: 10,
                            marginLeft: 15,
                            width: wp('55%'),
                            marginTop: wp('-57.5%'),
                            height: wp('55%'),}} source={this.state.imageSource} />
                        }
                    </View>
                    <View style={styles.lineStylew3} />
                    <FormLabel labelStyle={{ fontSize: 20, margin: 5 }} >
                        6. รายละเอียดกิจกรรม
                    </FormLabel>
                    <FormInput
                        inputStyle={{ borderColor: 'grey', marginTop: 5, borderWidth: 1, borderRadius: 5 }}
                        multiline={true}
                        numberOfLines={4}
                        ref={activitydetail => this.activitydetail = activitydetail}
                        value={this.state.activitydetail}
                        placeholder=''
                        onChangeText={
                            activitydetail => this.setState({ activitydetail: activitydetail.trim() })
                        }
                        // keyboardType='numeric'
                    />

                    <Button
                        backgroundColor='#00802b'
                        buttonStyle={{ marginTop: 20, borderRadius: 5 }}
                        icon={{ name: 'camera', type: 'font-camera' }}
                        title='แก้ไขรูปภาพรายละเอียด'
                        onPress={this.pickMultiple.bind(this)}
                    />
                    <View style={styles.lineStylew3} />
                    <View style={styles.setpositionbutton}>
                        <Button
                            backgroundColor='#00802b'
                            buttonStyle={{ marginTop: 30, width: 100, borderWidth: 1, borderColor: '#00802b', borderRadius: 5, marginLeft: -2.5, marginRight: -2.5 }}
                            // icon={{ name: 'person', type: 'font-person' }}
                            title='ยืนยัน'
                            onPress={()=>this.editactivity(id)}
                        />
                        <Button
                            backgroundColor='#ffff'
                            buttonStyle={{ marginTop: 30, width: 100, borderWidth: 1, borderColor: '#00802b', borderRadius: 5, marginLeft: -2.5, marginRight: -2.5 }}
                            // icon={{ name: 'person', type: 'font-person' }}
                            title='ยกเลิก'
                            color="#00802b"
                            onPress={() => {
                                this.props.navigation.navigate("Activity");
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
        );
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