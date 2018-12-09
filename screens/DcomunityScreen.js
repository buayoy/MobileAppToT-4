/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Button, Text, View, TouchableHighlight, Image, FlatList, ScrollView, ActivityIndicator , AsyncStorage} from 'react-native';

// import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements';
import PTRView from 'react-native-pull-to-refresh';
import axios from 'axios';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';
import ResponsiveImage from 'react-native-responsive-image';
import SwiperFlatList from 'react-native-swiper-flatlist';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

const width = '100%';


const IoniconsHeaderButton = passMeFurther => (
  <HeaderButton {...passMeFurther} IconComponent={Ionicons} iconSize={30} color="white" />

);

import Logo from '../components/logo/index';


export default class HomeScreen extends Component {




  state = {
    data: [],
    datacm: [],
    datapin: [],
    datatop: [],
    checktype: '',
    pass:'',
    loading: true,
    checklogin: {},
    customStyleIndex: 0,
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
    headerTitle: 'ของดีชุมชน',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        {/* <Item title="menu" iconName="ios-menu" onPress={() => navigation.openDrawer()} /> */}
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        {params.pass === 'admin' ? (
          <Item iconName='ios-add-circle-outline' onPress={() => navigation.navigate('createD')} />
        ) : (null)}
      </HeaderButtons>
    ),
    headerStyle: {
      backgroundColor: '#00802b',

    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      
      textAlign: 'center',
      flex: 1,
    },
  }};


  
  async checkType(){
    var types = await AsyncStorage.getItem("type");
    types = types.substring(1, types.length - 1);
    await this.setState({ type: types });
   
    if(this.state.type == 'admin'){
      const {checktype} = this.state.pass
      this.props.navigation.setParams({
      checktype
    })
    // InteractionManager.runAfterInteractions(() => {
    //   this.props.navigation.setParams({ checklogin: this.state.user });
    // });
    //เรียกเพื่อไปใช้
    this.setState({checktype: checktype})
    this.props.navigation.setParams({
      pass: 'admin'
    });
    }
    
   
    Alert.alert(params.pass);
  }

  async getData() {
    const response = await axios.get('http://npcrapi.netpracharat.com/api/good/teeteaw');
    const responsecm = await axios.get('http://npcrapi.netpracharat.com/api/good/teepug');
    const responsetop = await axios.get('http://npcrapi.netpracharat.com/api/good/teegin');
    const reponsepin = await axios.get('http://npcrapi.netpracharat.com/api/newspr/pingood');

    this._checkpinminus(reponsepin);

    this.setState({
      data: response.data,
      datacm: responsecm.data,
      datatop: responsetop.data,
      datapin: reponsepin.data,
      loading: false,

    });


  }

  _checkpinminus(reponsepin){
    if(reponsepin.data.length == 0 ){

      objectheadlines1 = {headlines : 'pin1.png',};
      objectheadlines2 = {headlines : 'pin2.jpg', };

      reponsepin.data.push(objectheadlines1);   
      reponsepin.data.push(objectheadlines2);   

    }else if(reponsepin.data.length == 1){
      objectheadlines1 = {headlines : 'pin1.png',};
      reponsepin.data.push(objectheadlines1);   
    }
  }  

  componentDidMount() {

    this.getData();
    this.checkType();
  }

  _updateview = async (id) => {
    const response = await axios.post('http://npcrapi.netpracharat.com/api/newspr/updateview/' + id, {
    });
  }


  _updateviewcm = async (id) => {
    const response = await axios.post('http://npcrapi.netpracharat.com/api/newscm/updateview/' + id, {
    });
  }



  _renderItem = ({ item }) => {

    return (

      <TouchableHighlight
        underlayColor='white'
        onPress={() => {
          this.props.navigation.push('Gooddetail', {
            id: item.id
          });

        }}
      >
        <View style={{ flex: 1, flexDirection: 'column', margin: 2.25 }}>
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 3, borderTopRightRadius: 3, borderTopWidth: 0.8, borderLeftWidth: 0.8, borderRightWidth: 0.8, borderColor: 'grey' }}>
            <Image source={{ uri: 'http://npcrimage.netpracharat.com/imagegood/' + item.headlines }} resizeMode='stretch' style={styles.listpic} />
          </View>
          <View style={{ backgroundColor: 'white', borderBottomLeftRadius: 4, borderBottomRightRadius: 4, borderColor: 'grey', borderWidth: 0.8 }}>
            <Text style={styles.listtxt} numberOfLines={1}>
              {item.goodname}
            </Text>
            <Text style={{  color:"#006600", fontFamily: "Prompt-Bold",marginBottom: wp('2%'), marginLeft: wp('1%'), }} numberOfLines={1}>
              {item.province}
            </Text>
          </View>
        </View>

      </TouchableHighlight>
    )
  }

  _renderItem2 = ({ item }) => {

    return (
      <TouchableHighlight
        underlayColor='white'
        onPress={() => {
          this.props.navigation.push("Gooddetail", {
            id: item.id
          });

        }}>
        <View style={{ flex: 1, flexDirection: 'column', margin: 2.25 }}>
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 3, borderTopRightRadius: 3, borderTopWidth: 0.8, borderLeftWidth: 0.8, borderRightWidth: 0.8, borderColor: 'grey' }}>
            <Image source={{ uri: 'http://npcrimage.netpracharat.com/imagegood/' + item.headlines }} resizeMode='stretch' style={styles.listpic} />
          </View>
          <View style={{ backgroundColor: 'white', borderBottomLeftRadius: 4, borderBottomRightRadius: 4, borderColor: 'grey', borderWidth: 0.8 }}>
            <Text style={styles.listtxt} numberOfLines={1}>
              {item.goodname}
            </Text>
            <Text style={{  color:"#006600", fontFamily: "Prompt-Bold", marginBottom: wp('2%'), marginLeft: wp('1%'), }} numberOfLines={1}>
              {item.province}
            </Text>
          </View>
        </View>

      </TouchableHighlight>

    )
  }

  _renderItem3 = ({ item }) => {

    return (

      <TouchableHighlight
        underlayColor='white'
        onPress={() => {
          this.props.navigation.push('Gooddetail', {
            id: item.id
          });
          this._updateviewcm(item.id)
        }}>
        <View style={{ flex: 1, flexDirection: 'column', margin: 2.25 }}>
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 3, borderTopRightRadius: 3, borderTopWidth: 0.8, borderLeftWidth: 0.8, borderRightWidth: 0.8, borderColor: 'grey' }}>
            <Image source={{ uri: 'http://npcrimage.netpracharat.com/imagegood/' + item.headlines }} resizeMode='stretch' style={styles.listpic} />
          </View>
          <View style={{ backgroundColor: 'white', borderBottomLeftRadius: 4, borderBottomRightRadius: 4, borderColor: 'grey', borderWidth: 0.8 }}>
            <Text style={styles.listtxt} numberOfLines={1}>
              {item.goodname}
            </Text>
            <Text style={{ color:"#006600", fontFamily: "Prompt-Bold" , marginBottom: wp('2%'), marginLeft: wp('1%'), }} numberOfLines={1}>
              {item.province}
            </Text>
          </View>
        </View>

      </TouchableHighlight>

    )
  }

  _renderItempin = ({ item }) => {


    return (
      <View>
        {(item.id != null ) ?
        (
          <TouchableHighlight
            underlayColor='white'
            onPress={() => {
              this.props.navigation.push('Gooddetail', {
                id: item.id
              });

            }}>
            <View>
              <ResponsiveImage resizeMode='stretch' style={styles.image} source={{ uri: 'http://npcrimage.netpracharat.com/imagegood/' + item.headlines }} />
            </View>
          </TouchableHighlight>
        ):
          <TouchableHighlight underlayColor='white'>
            <View>
              <ResponsiveImage resizeMode='stretch' style={styles.image} source={{ uri: 'http://npcrimage.netpracharat.com/imagegood/' + item.headlines }} />
            </View>
          </TouchableHighlight>
        }
      </View>
    )
  }


  _onRefresh = () => {
    this.setState({
      loading: true
    });
    this.getData();
  }

  render() {

    const sizeicon = wp('5.5%');
    return (

      <View style={styles.container}>
            <PTRView onRefresh={this._onRefresh} >
        {

          this.state.loading ? (
            <ActivityIndicator size="large" color="#006600" />
          ) : (

              <ScrollView>

                <View>
                  <SwiperFlatList height={hp('25%')}
                    autoplay
                    autoplayDelay={3}
                    autoplayLoop
                    index={0}
                    showPagination
                    paginationStyleItem={{ width: 6, height: 6, marginLeft: -1 }}

                    data={this.state.datapin}
                    renderItem={this._renderItempin}
                    loop>
                  </SwiperFlatList>
                </View>
                <View style={styles.lineStylew3} />



                <View style={{ backgroundColor: 'white', flexDirection: 'row' }}>
                  <View style={styles.lineStyleh} />
                  <Text style={{ fontSize: hp('2.5%'), marginTop: hp('1%'), marginLeft: wp('1%'), fontFamily: "Prompt-SemiBold", color: '#006600' }}>แนะนำที่กิน</Text>
                  <View style={{ flex:1 , justifyContent:'flex-end', flexDirection:'row'}}>
                  <Text style={{ fontSize: hp('2.3%'), marginTop: hp('1%'), fontFamily: "Prompt-Medium", }} onPress={() => { this.props.navigation.navigate('DALL'); }}>ดูทั้งหมด</Text>
                  </View>
                  <Text style={{ fontSize: hp('2.3%'), marginTop: hp('1%'), fontFamily: "Prompt-SemiBold", color: 'orange' }} onPress={() => { this.props.navigation.navigate('DALL'); }}>  > </Text>
                </View>

                <FlatList
                  // style={{flex:1, flexDirection:'row'}}
                  showsHorizontalScrollIndicator={false}
                  
                  horizontal={true}
                  data={this.state.datatop.data}
                  renderItem={this._renderItem3}
                  onRefresh={this._onRefresh}
                  refreshing={this.state.loading}
                />


                <View style={{ backgroundColor: 'white', flexDirection: 'row' }}>
                  <View style={styles.lineStyleh} />
                  <Text style={styles.headertext}>แนะนำที่เที่ยว</Text>
                  <View style={{ flex:1 , justifyContent:'flex-end', flexDirection:'row'}}>
                  <Text style={{ fontSize: hp('2.3%'), marginTop: hp('1%'), fontFamily: "Prompt-Medium", }} onPress={() => { this.props.navigation.navigate('DALL'); }}>ดูทั้งหมด</Text>
                  </View>
                  <Text style={{ fontSize: hp('2.3%'), marginTop: hp('1%'), fontFamily: "Prompt-SemiBold", color: 'orange' }} onPress={() => { this.props.navigation.navigate('DALL'); }}>  > </Text>
                </View>

                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={this.state.data.data}
                  renderItem={this._renderItem}
                  refreshing={this.state.loading}
                  />

                

                <View style={{ backgroundColor: 'white', flexDirection: 'row' }}>
                  <View style={styles.lineStyleh} />
                  <Text style={styles.headertext}>แนะนำของดีชุมชน</Text>
                  <View style={{ flex:1 , justifyContent:'flex-end', flexDirection:'row'}}>
                  <Text style={{ fontSize: hp('2.3%'), marginTop: hp('1%'), fontFamily: "Prompt-Medium", }} onPress={() => { this.props.navigation.navigate('DALL'); }}>ดูทั้งหมด</Text>
                  </View>
                  <Text style={{ fontSize: hp('2.3%'), marginTop: hp('1%'), fontFamily: "Prompt-SemiBold", color: 'orange' }} onPress={() => { this.props.navigation.navigate('DALL'); }}>  > </Text>
                </View>

                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={this.state.datacm.data}
                  renderItem={this._renderItem2}
                  refreshing={this.state.loading}

                  
                />
              </ScrollView>

            )}
              </PTRView>
      </View >

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
  headertext: {

    fontSize: hp('2.5%'),
    marginTop: hp('1%'),
    marginLeft: wp('1%'),
    fontFamily: "Prompt-SemiBold",
    color: '#006600'
  },
  buttonText: {
    fontSize: 20,
    padding: 20,
    color: 'white'
  },
  image: {
    width: wp('100%'), height: hp('25%')
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  lineStyleh: {
    borderWidth: 2,
    borderColor: 'orange',
    margin: 5,
    height: hp('3%')
  },
  centericon: {
    fontSize: wp('2.8%'),
    alignSelf: 'center',
    marginBottom: 1.5,
    fontFamily: "Prompt-Medium",

  },
  listpic: {
    width: wp('31.8%'),
    height: hp('15%'),

  },
  listtxt: {
    marginTop: wp('2%'),
    width: wp('30%'),
    marginLeft: wp('1%'),
    fontFamily: "Prompt-Bold",
    // color: 'green'
  },
  lineStylew3: {
    borderWidth: 2.5,
    borderColor: '#DCDCDC',
    backgroundColor: '#9B9B9B',
    // marginTop: 20,  
    alignSelf: 'center',
    width: '100%',
  },
  iconmargin: {
    margin: wp('0.68%'),
    justifyContent: 'center'
  }
});

