/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Button, Text, View, TouchableHighlight, Image, FlatList, ScrollView, ActivityIndicator } from 'react-native';

// import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';
import ResponsiveImage from 'react-native-responsive-image';

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
    datatop: [],
    loading: true
  }


  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Logo />,
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        {/* <Item title="menu" iconName="ios-menu" onPress={() => navigation.openDrawer()} /> */}
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item title="register" iconName="ios-person-add" onPress={() => navigation.navigate('Register')} />
      </HeaderButtons>
    ),
    headerStyle: {
      backgroundColor: '#00802b',

    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      flex: 1,
    },
  });


  async getData() {
    const response = await axios.get('http://npcrapi.netpracharat.com/api/newspr/home');
    const responsecm = await axios.get('http://npcrapi.netpracharat.com/api/newscm/home');
    const responsetop = await axios.get('http://npcrapi.netpracharat.com/api/newspr/get10');


    this.setState({
      data: response.data,
      datacm: responsecm.data,
      datatop: responsetop.data,
      loading: false,

    });
    // alert(JSON.stringify(this.state.datatop))

  }
  componentDidMount() {
    loc(this);
    this.getData();

  }

  componentWillUnMount() {
    rol();
  }



  _renderItem = ({ item }) => {

    return (

      <TouchableHighlight
        underlayColor='white'
        onPress={() => {
          this.props.navigation.push('Web', {
            id: item.id
          });
        }}>
        <View style={{ flex: 1, backgroundColor: '#FFFAF0', flexDirection: 'column', width: wp('33.3%') , borderColor: 'orange'}} >
          <Image source={{ uri: 'http://npcradm.netpracharat.com/newsdetail/' + item.headlines }} resizeMode='stretch' style={styles.listpic} />
          <Text style={styles.listtxt} numberOfLines={1} >
            {item.news_pr_name}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }

  _renderItem2 = ({ item }) => {

    return (
      <View style={{ backgroundColor: '#FFFAF0', flexDirection: 'column', width: wp('33.3%') }}>
        <Image source={require('../images/region1.jpg')} resizeMode='stretch' style={styles.listpic} />
        <Text style={styles.listtxt} numberOfLines={2} >
          {item.news_cm_name}
        </Text>

      </View>

    )
  }

  _renderItem3 = ({ item }) => {

    return (

      <View style={{ backgroundColor: '#FFFAF0', flexDirection: 'column', width: wp('33.3%') }}>

        {item.type === "pr" ? (
          <TouchableHighlight
            underlayColor='white'
            onPress={() => {
              this.props.navigation.push('Web', {
                id: item.id
              });
            }}>
            <View >
              <Image source={{ uri: 'http://npcradm.netpracharat.com/newsdetail/' + item.headlines }} resizeMode='stretch' style={styles.listpic} />
              <Text style={styles.listtxt} numberOfLines={2} >
                {item.name}
              </Text>
            </View>
          </TouchableHighlight>
        ) : (
            <View>
              <Image source={require('../images/region1.jpg')} resizeMode='stretch' style={styles.listpic} />
              <Text style={styles.listtxt} numberOfLines={2} >
                {item.name}
              </Text>
            </View>
          )}
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

        {

          this.state.loading ? (
            <ActivityIndicator size="large" color="#006600" />
          ) : (

              <ScrollView>

                <View style={{ marginBottom: 5 }}>

                  <Swiper autoplay height={hp('25%')}
                    onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                    dot={<View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, margin: 3 }} />}
                    activeDot={<View style={{ backgroundColor: 'white', width: 5, height: 5, borderRadius: 4, margin: 3 }} />}
                    loop>
                    <View style={{ flex: 1 }}>
                      <ResponsiveImage resizeMode='stretch' style={styles.image} source={require('../images/header.png')} />
                    </View>
                    <View>
                      <ResponsiveImage resizeMode='stretch' style={styles.image} source={require('../images/region2.jpg')} />
                    </View>
                  </Swiper>
                </View>

                <View style={{ flex: 1, backgroundColor: '#FFFAF0', flexDirection: 'row' }}>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{ marginLeft: wp('1%') }}>
                      <Icon
                        raised
                        name='place'
                        type='Entypo'
                        color='white'
                        size={sizeicon}
                        containerStyle={{ backgroundColor: '#f8bf3c' }}
                        onPress={() => this.props.navigation.navigate("Map")} />
                      <Text style={styles.centericon}>
                        จุดให้บริการ
                     </Text>
                    </View>

                    <View style={styles.lineStyleh} />
                    <View>
                      <Icon
                        raised
                        name='th'
                        type='font-awesome'
                        size={sizeicon}
                        color='white'
                        containerStyle={{ backgroundColor: '#67cbc5' }}
                        onPress={() => alert('hello')} />
                      <Text style={styles.centericon}>
                        ความเป็นมา
                  </Text>
                    </View>
                    <View style={styles.lineStyleh} />

                    <View>
                      <Icon
                        raised
                        name='paper-plane-o'
                        type='font-awesome'
                        size={sizeicon}
                        color='white'
                        containerStyle={{ backgroundColor: '#739852' }}
                        onPress={() => this.props.navigation.navigate("News")} />
                      <Text style={styles.centericon}>
                        ข่าวสาร
                       </Text>
                    </View>
                    <View style={styles.lineStyleh} />

                    <View>
                      <Icon
                        raised
                        name='users'
                        type='font-awesome'
                        color='white'
                        size={sizeicon}
                        containerStyle={{ backgroundColor: '#f6860c' }}
                        onPress={() => alert('hello')} />
                      <Text style={styles.centericon}>
                        กิจกรรม
                     </Text>
                    </View>
                    <View style={styles.lineStyleh} />

                    <View>
                      <Icon
                        raised
                        name='ios-megaphone'
                        type='ionicon'
                        color='white'
                        size={sizeicon}
                        containerStyle={{ backgroundColor: '#f7400b' }}
                        onPress={() => alert('hello')} />
                      <Text style={styles.centericon}>
                        แจ้งปัญหา
                     </Text>
                    </View>
                    <View style={styles.lineStyleh} />

                    <View>
                      <Icon
                        raised
                        name='ios-chatboxes'
                        type='ionicon'
                        color='white'
                        size={sizeicon}
                        containerStyle={{ backgroundColor: '#ae6b51' }}
                        onPress={() => alert('hello')} />
                      <Text style={styles.centericon}>
                        ถาม-ตอบ
                       </Text>
                    </View>
                    <View style={styles.lineStyleh} />

                    <View>
                      <Icon
                        raised
                        name='camera'
                        type='material-community'
                        color='white'
                        size={sizeicon}
                        containerStyle={{ backgroundColor: '#f8bf3c' }}
                        onPress={() => alert('hello')} />
                      <Text style={styles.centericon}>
                        ท่องเที่ยว
                     </Text>
                    </View>
                    <View style={styles.lineStyleh} />

                    <View>
                      <Icon
                        raised
                        name='direction'
                        type='simple-line-icon'
                        color='white'
                        size={sizeicon}
                        containerStyle={{ backgroundColor: '#67cbc5' }}
                        onPress={() => alert('hello')} />
                      <Text style={styles.centericon}>
                        ที่พัก
                     </Text>
                    </View>
                    <View style={styles.lineStyleh} />

                    <View>
                      <Icon
                        raised
                        name='food-fork-drink'
                        type='material-community'
                        color='white'
                        size={sizeicon}
                        containerStyle={{ backgroundColor: '#739852' }}
                        onPress={() => alert('hello')} />
                      <Text style={styles.centericon}>
                        ร้านอาหาร
                       </Text>
                    </View>
                    <View style={styles.lineStyleh} />

                    <View>
                      <Icon
                        raised
                        name='gift'
                        type='material-community'
                        color='white'
                        size={sizeicon}
                        containerStyle={{ backgroundColor: '#f6860c' }}
                        onPress={() => alert('hello')} />
                      <Text style={styles.centericon}>
                        แลกของขวัญ
                       </Text>
                    </View>
                    <View style={styles.lineStyleh} />

                    <View>
                      <Icon
                        raised
                        name='file-document-box-outline'
                        type='material-community'
                        color='white'
                        size={sizeicon}
                        containerStyle={{ backgroundColor: '#f7400b' }}
                        onPress={() => alert('hello')} />
                      <Text style={styles.centericon}>
                        แบบสอบถาม
                       </Text>
                    </View>

                    <View style={styles.lineStyleh} />

                    <View style={{ marginRight: wp('1%') }}>
                      <Icon
                        raised
                        name='file-document-box-outline'
                        type='material-community'
                        color='white'
                        size={sizeicon}
                        containerStyle={{ backgroundColor: '#ae6b51' }}
                        onPress={() => alert('hello')} />
                      <Text style={styles.centericon}>
                        สื่อการเรียนรู้
                       </Text>
                    </View>

                  </ScrollView>

                </View>

                <View style={{ backgroundColor: '#FFFAF0', flexDirection: 'row', marginTop: 5 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: hp('2.5%'), marginTop: hp('1%'), marginLeft: wp('2%') , borderRadius:wp('1.5%')}}>ข่าวประชาสัมพันธ์</Text>
                </View>

                <FlatList
                  // style={{flex:1, flexDirection:'row'}}
                  scrollEnabled={false}
                  horizontal={true}
                  data={this.state.data.data}
                  renderItem={this._renderItem}
                  onRefresh={this._onRefresh}
                  refreshing={this.state.loading}
                />


                <View style={{ backgroundColor: '#FFFAF0', flexDirection: 'row'}}>
                  <Text style={styles.headertext}>ข่าวชุมชน</Text>
                </View>

                <FlatList

                  scrollEnabled={false}
                  horizontal={true}
                  data={this.state.datacm.data}
                  renderItem={this._renderItem2}
                  refreshing={this.state.loading}
                />

                <View style={{ backgroundColor: '#FFFAF0', flexDirection: 'row' ,  borderRadius: wp('1%') }}>
                  <Text style={styles.headertext}>ข่าว Top 10</Text>
                </View>

                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={this.state.datatop}
                  renderItem={this._renderItem3}
                  refreshing={this.state.loading}
                />
              </ScrollView>

            )}
      </View >

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCDCDC',

  },
  headertext: {
    fontWeight: 'bold',
    fontSize: hp('2.5%'),
    marginTop: hp('2%'),
    marginLeft: wp('2%')
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
    borderWidth: 0.5,
    borderColor: '#9B9B9B',
    margin: 5,
    height: hp('10%')
  },
  centericon: {
    fontSize: wp('2.8%'),
    alignSelf: 'center',
    marginBottom: 1.5,
  },
  listpic: { 
  width: wp('31.8%'), 
  height: hp('15%'), 
  marginLeft: wp('1%'), 
  borderRadius: hp('1.5%'),
  borderWidth: 2,
  borderColor: '#F5F5DC'
  },
  listtxt: {
  marginLeft: wp('1%'),
  width: wp('31%') 
  },
});

