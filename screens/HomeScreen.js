import React, { Component } from 'react';
import { ActivityIndicator, Image, FlatList, AsyncStorage, ScrollView, TextInput, Alert, AppRegistry, Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';
import Swiper from 'react-native-swiper'
import axios from 'axios';
import ResponsiveImage from 'react-native-responsive-image';
import SwiperFlatList from 'react-native-swiper-flatlist';

import Logo from '../components/logo/index'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
// const IoniconsHeaderButton = passMeFurther => (
//     <HeaderButton {...passMeFurther} IconComponent={Icon} iconSize={30} color="white" />
//   );
const IoniconsHeaderButton = passMeFurther => (
  <HeaderButton {...passMeFurther} IconComponent={Ionicons} iconSize={30} color="white" />
);
import PTRView from 'react-native-pull-to-refresh';
/*var PullToRefreshProject = React.createClass({
  _refresh: function() {
    return new Promise((resolve) => {
      setTimeout(()=>{resolve()}, 2000)
    });
  },
});*/
// const userlogin = this.state.user.citizen;

export default class Homescreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {

      },
      phone: '',
      name: '',
      checklogin: {},
      refreshing: true,
      data: [],
      datatop: [],
      datapin: [],
      loading: true,
      datacm: [],
      lastRefresh: Date(Date.now()).toString(),

    },
      this.arrayholder = []


    this.refreshScreen = this.refreshScreen.bind(this)
    // checklogin:{}

  }
  refreshScreen() {
    this.setState({ lastRefresh: Date(Date.now()).toString() })
  }
  async getData() {
    const response = await axios.get('http://npcrapi.netpracharat.com/api/newspr/home');
    const responsecm = await axios.get('http://npcrapi.netpracharat.com/api/newscm/home');
    const responsetop = await axios.get('http://npcrapi.netpracharat.com/api/newspr/get10');
    const reponsepin = await axios.get('http://npcrapi.netpracharat.com/api/newspr/pinfive');
    this._checkpinminus(reponsepin);

    this.setState({
      data: response.data,
      datacm: responsecm.data,
      datatop: responsetop.data,
      datapin: reponsepin.data,
      loading: false,
    });
    // alert(JSON.stringify(this.state.datacm.data))
  }

  async checkType(){
    var types = await AsyncStorage.getItem("type");
    types = types.substring(1, types.length - 1);
    await this.setState({ type: types });
  //  alert(this.state.type)
   }

  _checkpinminus(reponsepin) {
    if (reponsepin.data.length == 0) {

      objectheadlines1 = { headlines: 'pin1.png', type: 'pr' };
      objectheadlines2 = { headlines: 'pin2.jpg', type: 'pr' };

      reponsepin.data.push(objectheadlines1);
      reponsepin.data.push(objectheadlines2);

    } else if (reponsepin.data.length == 1) {
      objectheadlines1 = { headlines: 'pin1.png', type: 'pr' };
      reponsepin.data.push(objectheadlines1);
    }
  }

  async showPhoneData() {
    var phones = await AsyncStorage.getItem("phone");
    await this.setState({ phone: phones });
    var names = await AsyncStorage.getItem("name");
    await this.setState({ name: names });
    // Alert.alert( this.state.phone+this.state.name );

  }
  async showVerifyData() {
    var users = await AsyncStorage.getItem("user");
    await this.setState({ user: users });
    const { checklogin } = this.state.user
    this.props.navigation.setParams({
      checklogin
    })
    this.setState({ checklogin: checklogin })
    this.props.navigation.setParams({
      user: this.state.user
    });
  }
  async getuser2() {

    var phones = await AsyncStorage.getItem("phone");
    phones = phones.substring(1, phones.length - 1);
    await this.setState({ phone: phones });


    const response = await axios.post('http://npcrapi.netpracharat.com/api/saveuser/imageuser', {
      save_phone: this.state.phone
    });
    // alert(this.state.phone)
    // alert(response.data.image)
    await this.setState({ image: response.data.image });

    const { checkimage } = this.state.image
    this.props.navigation.setParams({
      checkimage
    })
    // alert(this.state.image)
    this.props.navigation.setParams({
      image: this.state.image
    });
    // Alert.alert(params.image);
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    // const params = navigation.getParam('checklogin')
    // this.state.user
    // alert(params)
    return {
      title: 'เครือข่ายเน็ตอาสาประชารัฐ',

      // headerTitle: <Logo/>,
      headerLeft: (
        <View style={{ marginLeft: wp('4%') }}><Logo />
        </View>),


      headerRight: (
        <View>
          {params.user == null ? (
            <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
              <Item
                title="register"
                iconName='ios-person-add'
                //"ios-person" 
                onPress={() => navigation.navigate('SelectLogin')}
              />
            </HeaderButtons>) : (
              <View>
                {params.image != null ? (
                  <TouchableHighlight onPress={() => navigation.navigate('Profile')} >
                    <Image style={{ borderWidth: 0.5, borderColor: "#FFFFFF", height: wp('10%'), width: wp('10%'), marginRight: wp('2%'), borderRadius: wp('4.5%') }} source={{ uri: 'http://npcrimage.netpracharat.com/imagesaveuser/' + params.image }} />

                  </TouchableHighlight>) : (
                    <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}><Item title="register"
                      iconName='ios-person'
                      onPress={() => navigation.navigate('Profile')}
                    />
                    </HeaderButtons>)}
              </View>
            )}
        </View>
      ),
      headerStyle: {
        backgroundColor: '#006600',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: "Prompt-Bold",
        textAlign: 'center',
        flex: 1,

      },
    }
  };
  ;
  async componentDidMount() {
    this.showVerifyData()
    this.getData();
    this.getuser2();
    this.checkType();
  }
  _onRefresh = () => {
    this.setState({
      loading: true
    });
    this.getData();
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
          this.props.navigation.navigate('Homedetail', {
            id: item.id
          });
          this._updateview(item.id)
        }}
      >
        <View style={{ flex: 1, flexDirection: 'column', margin: wp('0.58%') }}>
          <View style={{ flex: 1, backgroundColor: 'white', borderTopLeftRadius: 3, borderTopRightRadius: 3, borderTopWidth: 0.8, borderLeftWidth: 0.8, borderRightWidth: 0.8, borderColor: 'grey' }}>
            <View style={{ width: wp('31.8'), height: hp('15%') }}>
              <Image source={{ uri: 'http://npcradm.netpracharat.com/newsdetail/' + item.headlines }} resizeMode='stretch' style={{ height: hp('15%') }} />
            </View>
          </View>
          <View style={{ backgroundColor: 'white', borderBottomLeftRadius: 4, borderBottomRightRadius: 4, borderColor: 'grey', borderWidth: 0.8 }}>
            <View style={{ width: wp('31.8'), height: hp('8.5%') }}>
              <Text style={styles.listtxt} numberOfLines={2}>
                {item.news_pr_name}
              </Text>
            </View>
          </View>
        </View>

      </TouchableHighlight>
    )
  }

  _renderItempin = ({ item }) => {
    const countpin = this.state.datapin.length;
    return (
      <View>

        {item.type === "pr" ? (
          <View>
            {(item.id != null) ?
              (
                <TouchableHighlight
                  underlayColor='white'
                  onPress={() => {
                    this.props.navigation.navigate('Homedetail', {
                      id: item.id
                    });
                    this._updateview(item.id)
                  }}
                >
                  <View>
                    <ResponsiveImage resizeMode='stretch' style={styles.image} source={{ uri: 'http://npcradm.netpracharat.com/newsdetail/' + item.headlines }} />
                  </View>
                </TouchableHighlight>
              ) :
              <TouchableHighlight
                underlayColor='white'
              >
                <View>
                  <ResponsiveImage resizeMode='stretch' style={styles.image} source={{ uri: 'http://npcradm.netpracharat.com/newsdetail/' + item.headlines }} />
                </View>
              </TouchableHighlight>
            }
          </View>

        ) : (
            <View>
              {item.type === "cm" ?
                (
                  <TouchableHighlight
                    underlayColor='white'
                    onPress={() => {
                      this.props.navigation.navigate('Homedetailcm', {
                        id: item.id
                      });
                      this._updateviewcm(item.id)
                    }}>
                    <View>
                      <ResponsiveImage resizeMode='stretch' style={styles.image} source={{ uri: 'http://npcrimage.netpracharat.com/Imagenewscm/' + item.headlines }} />
                    </View>
                  </TouchableHighlight>
                ) : (<View>
                  {item.type === "แนะนำที่กิน" ?
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
                    ) : (
                      <View>
                        {item.type === "แนะนำที่เที่ยว" ?
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
                          ) : (
                            <View>
                              {item.type === "แนะนำที่พัก"}
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
                            </View>)
                        }
                      </View>
                    )
                  }
                </View>
                )
              }
            </View>
          )
        }
      </View>
    )
  }

  _renderItem2 = ({ item }) => {

    return (
      <TouchableHighlight
        underlayColor='white'
        onPress={() => {
          this.props.navigation.navigate('Homedetailcm', {
            id: item.id
          });
          this._updateviewcm(item.id)
        }}>
        <View style={{ flex: 1, flexDirection: 'column', margin: wp('0.58%') }}>
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 3, borderTopRightRadius: 3, borderTopWidth: 0.8, borderLeftWidth: 0.8, borderRightWidth: 0.8, borderColor: 'grey' }}>
            <Image source={{ uri: 'http://npcrimage.netpracharat.com/Imagenewscm/' + item.headlines }} resizeMode='stretch' style={styles.listpic} />
          </View>
          <View style={{ backgroundColor: 'white', borderBottomLeftRadius: 4, borderBottomRightRadius: 4, borderColor: 'grey', borderWidth: 0.8 }}>
            <View style={{ width: wp('31.8'), height: hp('8.5%') }}>
              <Text style={styles.listtxt} numberOfLines={2}>
                {item.news_cm_name}
              </Text>
            </View>
          </View>
        </View>

      </TouchableHighlight>

    )
  }

  _renderItem3 = ({ item }) => {
    return (
      <View style={styles.container}>

        {item.type === "pr" ? (

          <TouchableHighlight
            underlayColor='white'
            onPress={() => {
              this.props.navigation.navigate('Homedetail', {
                id: item.id
              });
              this._updateview(item.id)
            }}
          >
            <View style={{ flex: 1, flexDirection: 'row', margin: wp('3%') }}>
              <View style={{ backgroundColor: 'white', borderWidth: 0.8, bordercolor: 'grey' }}>
                <Image source={{ uri: 'http://npcradm.netpracharat.com/newsdetail/' + item.headlines }} resizeMode='stretch' style={styles.listpic} />
              </View>
              <View style={{ backgroundColor: 'white', marginLeft: wp('3%') }}>
                <Text style={{ fontFamily: "Prompt-SemiBold", width: wp('55%'), justifyContent: 'space-around' }} numberOfLines={2}>
                  {item.row + '. ' + item.name}
                </Text>
                <Text style={{ marginTop: wp('2%'), fontFamily: "Prompt-Medium", color: "#006600" }}>{item.province}</Text>
              </View>
            </View>
          </TouchableHighlight>
        ) : (

            <TouchableHighlight
              underlayColor='white'
              onPress={() => {
                this.props.navigation.navigate('Homedetailcm', {
                  id: item.id
                });
                this._updateviewcm(item.id)
              }}>
              <View style={{ flexDirection: 'row', margin: wp('3%') }}>
                <View style={{ backgroundColor: 'white', borderWidth: 0.8, bordercolor: 'grey' }}>
                  <Image source={{ uri: 'http://npcrimage.netpracharat.com/Imagenewscm/' + item.headlines }} resizeMode='stretch' style={styles.listpic} />
                </View>
                <View style={{ backgroundColor: 'white', marginLeft: wp('3%'), alignSelf: 'flex-start' }}>
                  <Text style={{ fontFamily: "Prompt-SemiBold", width: wp('55%') }} numberOfLines={2} >
                    {item.row + '. ' + item.name}
                  </Text>
                  <Text style={{ marginTop: hp('1.5%'), fontFamily: "Prompt-Medium", color: "#006600" }} numberOfLines={1}>{'เข้าชม' + ':' +item.view} </Text>
                  {/* <Text style={{ marginTop: hp('0.5%'), fontFamily: "Prompt-Medium", color: "#006600" }} numberOfLines={1}>{item.subdistrict + ' ' + item.village} </Text> */}
                </View>
              </View>
            </TouchableHighlight>
          )}
      </View>

    )
  }
  // makeRemoteRequest = () => {
  //   const url = `http://npcrapi.netpracharat.com/api/newspr/home`;
  //   this.setState({ loading: true });
  //   fetch(url)
  //     .then(res => res.json())
  //     .then(res => {
  //       this.setState({
  //         data: res.data,
  //         error: res.error || null,
  //         loading: false,
  //       });
  //       this.arrayholder = res.data;
  //     })
  //     .catch(error => {
  //       this.setState({ error, loading: false });
  //     });
  // };

  searchFilterFunction = text => {
    //alert(text);
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.news_pr_name.toUpperCase()}`;
      const textData = text.toUpperCase();
      let a = itemData.indexOf(textData) > -1;
      return itemData.indexOf(textData) > -1;

    });
    this.setState({ data: newData });
  };
  _updateview = async (id) => {
    const response = await axios.post('http://npcrapi.netpracharat.com/api/newspr/updateview/' + id, {
    });
  }


  _updateviewcm = async (id) => {
    const response = await axios.post('http://npcrapi.netpracharat.com/api/newscm/updateview/' + id, {
    });
  }
  componentWillUnMount() {
    rol();
  }




  render() {

    const sizeicon = wp('6%');
    return (
      <View style={styles.container}>
        <PTRView onRefresh={this._onRefresh} >

          {
            this.state.loading ? (
              <ActivityIndicator size="large" color="#006600"
              />
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
                  <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row' }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                      <View style={styles.iconmargin}>
                        <Icon

                          name='place'
                          type='Entypo'
                          color='white'
                          size={sizeicon}
                          containerStyle={{ backgroundColor: '#f8bf3c', alignSelf: 'center', width: wp('11.5%'), height: hp('6%'), borderRadius: wp('1.3%'), margin: wp('1.8%') }}
                          onPress={() => this.props.navigation.navigate("Map2")} />
                        <Text style={styles.centericon}>
                          จุดให้บริการ
                         </Text>
                      </View>


                      <View style={styles.iconmargin}>
                        <Icon

                          name='th'
                          type='font-awesome'
                          size={sizeicon}
                          color='white'
                          containerStyle={{ backgroundColor: '#67cbc5', alignSelf: 'center', width: wp('11.5%'), height: hp('6%'), borderRadius: wp('1.3%'), margin: wp('1.8%') }}
                          onPress={() => this.props.navigation.navigate("History")} />
                        <Text style={styles.centericon}>
                          ความเป็นมา
                      </Text>
                      </View>


                      <View style={styles.iconmargin}>
                        <Icon

                          name='paper-plane-o'
                          type='font-awesome'
                          size={sizeicon}
                          color='white'
                          containerStyle={{ backgroundColor: '#739852', alignSelf: 'center', width: wp('11.5%'), height: hp('6%'), borderRadius: wp('1.3%'), margin: wp('1.8%') }}
                          onPress={() => this.props.navigation.navigate("News")} />
                        <Text style={styles.centericon}>
                          ข่าวสาร
                           </Text>
                      </View>


                      <View style={styles.iconmargin}>
                        <Icon

                          name='users'
                          type='font-awesome'
                          color='white'
                          size={sizeicon}
                          containerStyle={{ backgroundColor: '#f6860c', alignSelf: 'center', width: wp('11.5%'), height: hp('6%'), borderRadius: wp('1.3%'), margin: wp('1.8%') }}
                          onPress={() => this.props.navigation.navigate('Activity')} />
                        <Text style={styles.centericon}>
                          กิจกรรม
                         </Text>
                      </View>

                      {this.state.type == 'admin' ? <View style={styles.iconmargin}>
                        <Icon

                          name='ios-megaphone'
                          type='ionicon'
                          color='white'
                          size={sizeicon}
                          containerStyle={{ backgroundColor: '#f7400b', alignSelf: 'center', width: wp('11.5%'), height: hp('6%'), borderRadius: wp('1.3%'), margin: wp('1.8%') }}
                          onPress={() => this.props.navigation.navigate('Report_btn_step_1')} />
                        <Text style={styles.centericon}>
                          แจ้งปัญหา
                         </Text>
                      </View> : null}




                      <View style={styles.iconmargin}>
                        <Icon
                          name='thumbs-up'
                          type='font-awesome'
                          color='white'
                          size={sizeicon}
                          containerStyle={{ backgroundColor: '#ae6b51', alignSelf: 'center', width: wp('11.5%'), height: hp('6%'), borderRadius: wp('1.3%'), margin: wp('1.8%') }}
                          onPress={() => this.props.navigation.navigate('Dcomunity')} />
                        <Text style={styles.centericon}>
                          ของดีชุมชน
                         </Text>
                      </View>



                      <View style={styles.iconmargin}>
                        <Icon
                          name='ios-chatboxes'
                          type='ionicon'
                          color='white'
                          size={sizeicon}
                          containerStyle={{ backgroundColor: this.state.type == 'admin' ? '#f8bf3c' : '#f7400b', alignSelf: 'center', width: wp('11.5%'), height: hp('6%'), borderRadius: wp('1.3%'), margin: wp('1.8%') }}
                        />
                        <Text style={styles.centericon}>
                          ถาม-ตอบ
                           </Text>
                      </View>



                      <View style={styles.iconmargin}>
                        <Icon

                          name='gift'
                          type='material-community'
                          color='white'
                          size={sizeicon}
                          containerStyle={{ backgroundColor: '#67cbc5', alignSelf: 'center', width: wp('11.5%'), height: hp('6%'), borderRadius: wp('1.3%'), margin: wp('1.8%') }}
                        />
                        <Text style={styles.centericon}>
                          แลกของขวัญ
                           </Text>
                      </View>


                      <View style={styles.iconmargin}>
                        <Icon

                          name='file-document-box-outline'
                          type='material-community'
                          color='white'
                          size={sizeicon}
                          containerStyle={{ backgroundColor: '#739852', alignSelf: 'center', width: wp('11.5%'), height: hp('6%'), borderRadius: wp('1.3%'), margin: wp('1.8%') }}
                        />
                        <Text style={styles.centericon}>
                          แบบสอบถาม
                           </Text>
                      </View>



                      <View style={styles.iconmargin}>
                        <Icon

                          name='file-document-box-outline'
                          type='material-community'
                          color='white'
                          iconSize={5}
                          containerStyle={{ backgroundColor: '#f6860c', alignSelf: 'center', width: wp('11.5%'), height: hp('6%'), borderRadius: wp('1.3%'), margin: wp('1.8%') }}
                        />
                        <Text style={styles.centericon}>
                          สื่อการเรียนรู้
                           </Text>
                      </View>

                    </ScrollView>

                  </View>
                  <View style={styles.lineStylew3} />

                  {/* <View style={{ alignSelf: 'center' ,marginTop: 10}}>
            
                  <TextInput 
                    style={{ height: 40, width: wp('98rr%') ,borderColor: 'grey', borderWidth: 1 , borderRadius: 5  }}
                    placeholder='Search'
                     leftIcon={{ type: 'ionicon', name: 'ios-megaphone' }}
                  />
                 
                  </View>
                */}

                  <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row' }}>

                    <View style={styles.lineStyleh} />
                    <Text style={{ fontSize: hp('2.5%'), marginTop: hp('1%'), marginLeft: wp('1%'), fontFamily: "Prompt-SemiBold", color: '#006600' }}>ข่าวประชาสัมพันธ์</Text>
                    <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
                      <Text style={{ fontSize: hp('2.3%'), marginTop: hp('1%'), fontFamily: "Prompt-Medium", alignItems: 'center' }} onPress={() => { this.props.navigation.navigate('News'); }}>ดูทั้งหมด</Text>
                    </View>
                    <Text style={{ fontSize: hp('2.3%'), marginTop: hp('1%'), fontFamily: "Prompt-SemiBold", color: 'orange' }} onPress={() => { this.props.navigation.navigate('News'); }}>  > </Text>
                  </View>

                  <FlatList
                    // style={{flex:1, flexDirection:'row'}}
                    showsHorizontalScrollIndicator={false}

                    horizontal={true}
                    data={this.state.data.data}
                    renderItem={this._renderItem}
                    onRefresh={this._onRefresh}
                    refreshing={this.state.loading}
                  />


                  <View style={{ backgroundColor: 'white', flexDirection: 'row' }}>
                    <View style={styles.lineStyleh} />
                    <Text style={styles.headertext}>ข่าวชุมชน</Text>
                    <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
                      <Text style={{ fontSize: hp('2.3%'), marginTop: hp('1%'), fontFamily: "Prompt-Medium", }} onPress={() => { this.props.navigation.navigate('News'); }}>ดูทั้งหมด</Text>
                    </View>
                    <Text style={{ fontSize: hp('2.3%'), marginTop: hp('1%'), fontFamily: "Prompt-SemiBold", color: 'orange' }} onPress={() => { this.props.navigation.navigate('News'); }}>  > </Text>

                  </View>

                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={this.state.datacm.data}
                    renderItem={this._renderItem2}
                    refreshing={this.state.loading}
                  />


                  <View style={{ backgroundColor: 'white', flexDirection: 'row' }}>
                    <View style={styles.lineStyleh} />
                    <Text style={styles.headertext}>ข่าว Top 10</Text>
                  </View>
                  <FlatList

                    data={this.state.datatop}
                    renderItem={this._renderItem3}
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
    marginTop: hp('1%'),
    height: hp('3%'),
    marginLeft: hp('1%'),
    marginRight: hp('1%')
  },
  centericon: {
    fontSize: wp('2.8%'),
    alignSelf: 'center',
    marginBottom: 1.5,
    fontFamily: "Prompt-Medium",
    marginTop: hp('-0.5%')

  },
  listpic: {
    width: wp('31.8%'),
    height: hp('15%'),
  },
  listtxt: {
    marginTop: wp('2%'),
    width: wp('30%'),
    marginBottom: wp('2%'),
    marginLeft: wp('1%'),
    fontFamily: "Prompt-Light",
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
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
  },
  view1: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    padding: 10
  },
  newspic: {
    width: wp('35%'),
    height: hp('15%'),
    marginRight: 10
  },
  newsview: {
    width: wp('50%'),
    alignSelf: 'center'
  },
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Touchables);

