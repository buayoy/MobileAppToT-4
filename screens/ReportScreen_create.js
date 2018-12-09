import React, { Component } from 'react';
import { Alert, Platform, StyleSheet, Text, View, Picker,PixelRatio, Image, NativeModules , AsyncStorage} from 'react-native';
import { Button } from 'react-native-elements'
import { FormLabel, FormInput, FormValidationMessage, Badge } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../components/logo';
import { Dropdown } from 'react-native-material-dropdown';
import { NavigationActions } from 'react-navigation';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';
const IoniconsHeaderButton = passMeFurther => (
    <HeaderButton {...passMeFurther} IconComponent={Ionicons} iconSize={30} color="white" />
);
import axios from 'axios';
import PhotoGrid from '../PhotoGrid';
import ImageView from 'react-native-image-view';
var ImagePicker = NativeModules.ImageCropPicker;
const width = '100%';


export default class ReportScreen_create extends Component {


    static navigationOptions = ({ navigation }) => ({
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
    });

    state = {
        userid: '',
        problemname: '',
        problemdetail: '',
        tel: '',
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

        //multifileimg upload
        images: null,
        img_grid:[],
        popupimg:false,
        selectedImg:null,
        isVisible:false
        //end multifile
    }

    _Postproblem = async () => { if(this.state.problemname.length == ''){
        Alert.alert('กรุณาเลือกประเภทปัญหา');
    }else if(this.state.province.length == ''){
        Alert.alert('กรุณาเลือกจังหวัด');
    }else if(this.state.district.length == ''){
        Alert.alert('กรุณาเลือกอำเภอ');
    }else if(this.state.subdistrict.length == ''){
        Alert.alert('กรุณาเลือกตำบล');
    }else if(this.state.village.length == ''){
        Alert.alert('กรุณาเลือกตำบล');
    }else if(this.state.problemdetail.length == ''){
        Alert.alert('กรุณากรอกรายงานปัญหา');
    }else if(this.state.tel.length == ''){
        Alert.alert('กรุณากรอกเบอร์โทรศัพท์ติดต่อกลับ');
    }else{
        const response = await axios.post('http://npcrapi.netpracharat.com/api/problem/post', {
            problemname: this.state.problemname,
            problemdetail: this.state.problemdetail,
            tel: this.state.tel,
            province: this.state.province,
            district: this.state.district,
            subdistrict: this.state.subdistrict,
            village: this.state.village,
            status: 'ยังไม่ได้ดำเนินการ',
            create_by: this.state.userid,
        });

        // alert(JSON.stringify(response));
        const problem_id = response.data.id; // use insert id fk fileupload
        this.uploadmultiPhoto(problem_id);

        if (response.data.data == 'ok') {
            Alert.alert('แจ้งปัญหาเรียบร้อยแล้ว', 'ปัญหาที่คุณแจ้งจะถูกบันทึกไปยังปัญหาของฉัน', [{ text: 'ตกลง' }]);
            this.props.navigation.navigate('Report_myproblem');
        } else {
            Alert.alert('ไม่สามารถแจ้งปัญหาได้', response.data.message, [{ text: 'ตกลง' }]);
        }


    }

    }

    async uploadPhoto(problem_id) {
        //problem_id = 4;
        const response = await axios.post('http://npcrapi.netpracharat.com/api/problem/upload_image?problem_id='+problem_id, {
            // problem_id: problem_id,
            imageData: this.state.imageSource.uri
        });
      
        //Alert.alert('response fileupload = '+response.data.message);
    }

    async uploadmultiPhoto(problem_id) {
        // problemnet_id = 3;
        await this.state.images.forEach((item, i) => {
            const response = axios.post('http://npcrapi.netpracharat.com/api/problem/upload_image?problem_id='+problem_id, {
                imageData: item.uri
            });
        });
     
        // Alert.alert('upload success');
    }

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

    /*_SelectCameraRoll = () => {

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
                // const source = { uri: `data:${response.data.mime};base64,` + response.data };
                // let source = { uri: response.uri };
                this.setState({
                    imageSource: {
                        uri: 'data:image/jpeg;base64,' + response.data,
                        //size: image.size
                    }
                });
                //alert(this.state.imageSource.uri);
                //this.uploadPhoto();
            }
        });
    };*/

    async getuserid(){
        var userids = await AsyncStorage.getItem("userid");
        await this.setState({ userid: userids });
    }

    async getData() {
        const response = await axios.get('http://npcrapi.netpracharat.com/api/problem/getprovince');
        this.setState({ getprovince: response.data });
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
        ];

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}><Icon name="ios-megaphone" size={40} color='#00802b' />  แจ้งปัญหาทั่วไป</Text>
                <View style={styles.lineStylew1} />
                <View style={styles.lineStylew2} />
                <KeyboardAwareScrollView>
                    <FormLabel labelStyle={{ fontSize: 20, margin: 5 }} >
                        1. ประเภทปัญหา
                    </FormLabel>
                    <Dropdown
                        containerStyle={{ margin: 15, marginBottom: -10, marginTop: -10, borderColor: 'grey', borderTop: 1, borderRadius: 5 }}
                        ref={problemname => this.problemname = problemname}
                        label=''
                        data={data}
                        onChangeText={
                            problemname => this.setState({ problemname })
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
                    <View style={styles.lineStylew3} />
                    <FormLabel labelStyle={{ fontSize: 20, margin: 5 }} >
                        6. รายงานปัญหา
                    </FormLabel>
                    <FormInput
                        multiline={true}
                        numberOfLines={4}
                        inputStyle={{ borderColor: 'grey', marginTop: 5, borderWidth: 1, borderRadius: 5 }}
                        ref={problemdetail => this.problemdetail = problemdetail}
                        placeholder=''
                        onChangeText={
                            problemdetail => this.setState({ problemdetail: problemdetail.trim() })
                        }
                    // keyboardType='numeric'
                    />
                    <View style={styles.lineStylew3} />
                    <FormLabel labelStyle={{ fontSize: 20, margin: 5 }} >
                        7. เบอร์ติดต่อกลับ
                    </FormLabel>
                    <FormInput
                        inputStyle={{ borderColor: 'grey', marginTop: 5, borderWidth: 1, borderRadius: 5 }}
                        maxLength={10}
                        ref={tel => this.tel = tel}
                        placeholder=''
                        onChangeText={
                            tel => this.setState({ tel })
                        }
                        keyboardType='numeric'
                    />
                    <View style={styles.lineStylew3} />
                    <Button
                        backgroundColor='#00802b'
                        buttonStyle={{ marginTop: 20, borderRadius: 5 }}
                        icon={{ name: 'camera', type: 'font-camera' }}
                        title='เพิ่มรูปภาพ'
                        onPress={this.pickMultiple.bind(this)}
                    />
                    <View>
                        {/* { this.state.imageSource === null ? <Text></Text> :
                            <Image style={styles.avatar} source={this.state.imageSource} />
                        } */}
                    </View>
                    <View style={styles.setpositionbutton}>
                        <Button
                            backgroundColor='#00802b'
                            buttonStyle={{ marginTop: 30, width: 100, borderWidth: 1, borderColor: '#00802b', borderRadius: 5, marginLeft: -2.5, marginRight: -2.5 }}
                            // icon={{ name: 'person', type: 'font-person' }}
                            title='ยืนยัน'
                            onPress={this._Postproblem}
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
      //borderRadius: 75,
      margin: 10,
      marginLeft: 15,
      width: 150,
      height: 150
    }
});