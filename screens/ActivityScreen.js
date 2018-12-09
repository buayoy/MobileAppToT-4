/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight, ActivityIndicator, FlatList, Image, ScrollView, Alert, AsyncStorage } from 'react-native';
import PTRView from 'react-native-pull-to-refresh';
import axios from 'axios';
import { List, ListItem, SearchBar } from 'react-native-elements'
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import Logo from '../components/logo/index';

import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';

const IoniconsHeaderButton = passMeFurther => (
  <HeaderButton {...passMeFurther} IconComponent={Ionicons} iconSize={30} color="white" />

);


export default class ActivityScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userid: '',
      data: [],
      datas: [],
      type: '',
      pass: '',
      checktype: '',
      datamyactivity: [],
      loading: true,
      customStyleIndex: 0,
    }
    this.arrayholder = []
    this.arrayholdermyactivity = []
  }

  handleCustomIndexSelect = (index) => {
    this.setState({
      ...this.state,
      customStyleIndex: index,
    });
  }
  async checkType() {
    var phones = await AsyncStorage.getItem("phone");
    phones = phones.substring(1, phones.length - 1);
    await this.setState({ phone: phones });
    var types = await AsyncStorage.getItem("type");
    types = types.substring(1, types.length - 1);
    await this.setState({ type: types });
    if (this.state.type == 'admin') {
      const { checktype } = this.state.pass
      this.props.navigation.setParams({
        checktype
      })
      // InteractionManager.runAfterInteractions(() => {
      //   this.props.navigation.setParams({ checklogin: this.state.user });
      // });
      //เรียกเพื่อไปใช้
      this.setState({ checktype: checktype })
      this.props.navigation.setParams({
        pass: 'admin'
      });
    }


  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {

      headerTitle: <Logo />,
      headerLeft: (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          {/* <Item title="menu" iconName="ios-menu" onPress={() => navigation.openDrawer()} /> */}
        </HeaderButtons>
      ),
      headerRight: (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          {params.pass == 'admin' ? (
            <Item iconName='ios-add-circle-outline' onPress={() => navigation.navigate('CreateActivity')} />
          ) : (null)}
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
    }
  };
  // async getData() {
  //   const response = await axios.get(`http://npcrapi.netpracharat.com/api/activity/all`);

  //   this.setState({
  //     data: response.data,
  //     loading: false
  //   });
  //   alert(JSON.stringify(this.state.articles));
  //   this.arrayholder = response.data;
  // }
  makeRemoteRequest = () => {
    const url = `http://npcrapi.netpracharat.com/api/activity/all`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.data,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res.data;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  async makeRemoteRequestMyActivity() {
    var userids = await AsyncStorage.getItem("userid");
    await this.setState({ userid: userids });

    const url = `http://npcrapi.netpracharat.com/api/activity/myactivity/` + this.state.userid;
    // alert(url);
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          datamyactivity: res.data,
          error: res.error || null,
          loading: false,
        });
        this.arrayholdermyactivity = res.data;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  componentDidMount() {
    this.makeRemoteRequest();
    this.makeRemoteRequestMyActivity();
    this.getData();
    this.checkType();

  }


  async getData() {
    const response = await axios.get('http://npcrapi.netpracharat.com/api/problemnet/all/ยังไม่ได้ดำเนินการ');


    this.setState({
      datas: response.data.data,
      loading: false
    });

    // alert(JSON.stringify(response));
  }

  searchFilterFunction = text => {
    //alert(text);
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.activityname.toUpperCase()}`;
      const textData = text.toUpperCase();
      let a = itemData.indexOf(textData) > -1;
      return itemData.indexOf(textData) > -1;

    });
    this.setState({ data: newData });
  };

  searchFilterFunctionmyactivity = text => {
    //alert(text);
    const newData = this.arrayholdermyactivity.filter(item => {
      const itemData = `${item.activityname.toUpperCase()}`;
      const textData = text.toUpperCase();
      let a = itemData.indexOf(textData) > -1;
      return itemData.indexOf(textData) > -1;

    });
    this.setState({ datamyactivity: newData });
  };



  _renderItem = ({ item }) => {

    let urlToImage = (item.headlines !== null) ? 'http://npcrimage.netpracharat.com/imageactivity/' + item.headlines : 'https://via.placeholder.com/150x100';

    return (

      <View style={styles.container}>
        <TouchableHighlight
          underlayColor='white'
          onPress={() => {
            this.props.navigation.navigate('ActivityDetail', {
              id: item.id
            });
          }}>
          <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, marginBottom: 5, padding: 10 }}>
            <Image source={{ uri: urlToImage }} style={{ width: wp('35%'), height: hp('15%'), marginRight: 10 }} />
            <View style={{ width: wp('52%'), alignSelf: 'center' }}>
              <Text style={{ fontFamily: "Prompt-SemiBold", fontSize: hp('2.3%'), marginBottom: 5 }} numberOfLines={2}>{item.activityname}</Text>
              <Text style={{ marginTop: hp('1.5%'), fontFamily: "Prompt-Medium", color: "#006600" }} numberOfLines={1}>{item.province + ' ' + item.district} </Text>
              <Text style={{ marginTop: hp('0.5%'), fontFamily: "Prompt-Medium", color: "#006600" }} numberOfLines={1}>{item.subdistrict + ' ' + item.village} </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  _renderItemmyactivity = ({ item }) => {

    let urlToImage = (item.headlines !== null) ? 'http://npcrimage.netpracharat.com/imageactivity/' + item.headlines : 'https://via.placeholder.com/150x100';

    return (

      <View style={styles.container}>
        {(item.status == 2) ?
          <TouchableHighlight
            underlayColor='white'
            onPress={() => {
              this.props.navigation.navigate('EditActivity', {
                id: item.id
              });
            }}>
            <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, marginBottom: 5, padding: 10 }}>
              <View style={{
                margin: 10,
                marginLeft: -5,
                height: 12,
                width: 12,
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 6,
              }} />
              <Image source={{ uri: urlToImage }} style={{ width: wp('35%'), height: hp('15%'), marginRight: 10 }} />
              <View style={{ width: wp('52%'), alignSelf: 'center' }}>
                <Text style={{ fontFamily: "Prompt-SemiBold", fontSize: hp('2.3%'), marginBottom: 5 }} numberOfLines={2}>{item.activityname}</Text>
                <Text style={{ marginTop: hp('1.5%'), fontFamily: "Prompt-Medium", color: "#006600" }} numberOfLines={1}>{item.province + ' ' + item.district} </Text>
                <Text style={{ marginTop: hp('0.5%'), fontFamily: "Prompt-Medium", color: "#006600" }} numberOfLines={1}>{item.subdistrict + ' ' + item.village} </Text>
              </View>
            </View>
          </TouchableHighlight>
          : (item.status == 0) ?
            <TouchableHighlight
              underlayColor='white'
              onPress={() => {
                this.props.navigation.navigate('EditActivity', {
                  id: item.id
                });
              }}>
              <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, marginBottom: 5, padding: 10 }}>
                <View style={{
                  margin: 10,
                  marginLeft: -5,
                  height: 12,
                  width: 12,
                  alignItems: 'center',
                  backgroundColor: 'red',
                  borderRadius: 6,
                }} />
                <Image source={{ uri: urlToImage }} style={{ width: wp('35%'), height: hp('15%'), marginRight: 10 }} />
                <View style={{ width: wp('52%'), alignSelf: 'center' }}>
                  <Text style={{ fontFamily: "Prompt-SemiBold", fontSize: hp('2.3%'), marginBottom: 5 }} numberOfLines={2}>{item.activityname}</Text>
                  <Text style={{ marginTop: hp('1.5%'), fontFamily: "Prompt-Medium", color: "#006600" }} numberOfLines={1}>{item.province + ' ' + item.district} </Text>
                  <Text style={{ marginTop: hp('0.5%'), fontFamily: "Prompt-Medium", color: "#006600" }} numberOfLines={1}>{item.subdistrict + ' ' + item.village} </Text>
                </View>
              </View>
            </TouchableHighlight> :
            <TouchableHighlight
              underlayColor='white'
            >
              <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, marginBottom: 5, padding: 10 }}>
                <View style={{
                  margin: 10,
                  marginLeft: -5,
                  height: 12,
                  width: 12,
                  alignItems: 'center',
                  backgroundColor: 'green',
                  borderRadius: 6,
                }} />
                <Image source={{ uri: urlToImage }} style={{ width: wp('35%'), height: hp('15%'), marginRight: 10 }} />
                <View style={{ width: wp('52%'), alignSelf: 'center' }}>
                  <Text style={{ fontFamily: "Prompt-SemiBold", fontSize: hp('2.3%'), marginBottom: 5 }} numberOfLines={2}>{item.activityname}</Text>
                  <Text style={{ marginTop: hp('1.5%'), fontFamily: "Prompt-Medium", color: "#006600" }} numberOfLines={1}>{item.province + ' ' + item.district} </Text>
                  <Text style={{ marginTop: hp('0.5%'), fontFamily: "Prompt-Medium", color: "#006600" }} numberOfLines={1}>{item.subdistrict + ' ' + item.village} </Text>
                </View>
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
    this.makeRemoteRequest();
    this.makeRemoteRequestMyActivity();
  }

  renderSeparator = () => {
    return (
      <View style={{ height: 1, width: '100%', backgroundColor: 'black' }}>
      </View>
    )
  }

  renderHeader = () => {
    return (
      <SearchBar
        lightTheme
        round
        clearIcon={{ color: 'grey' }}
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        showLoading
        platform="android"
        // onChangeText={this.filterSearch(text)}
        cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
        placeholder='Search' />
    )
  }

  renderHeadermyactivity = () => {
    return (
      <SearchBar
        lightTheme
        round
        clearIcon={{ color: 'grey' }}
        onChangeText={text => this.searchFilterFunctionmyactivity(text)}
        autoCorrect={false}
        showLoading
        platform="android"
        // onChangeText={this.filterSearch(text)}
        cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
        placeholder='Search' />
    )
  }

  render() {
    return (
      <View>
        <PTRView onRefresh={this._onRefresh}>
          <SegmentedControlTab
            values={this.state.type === 'admin' ? (['กิจกรรม', 'กิจกรรมของฉัน']) : (['กิจกรรม'])}
            selectedIndex={this.state.customStyleIndex}
            onTabPress={this.handleCustomIndexSelect}
            borderRadius={0}
            tabsContainerStyle={{ height: 50, backgroundColor: '#F2F2F2' }}
            tabStyle={{ backgroundColor: '#F2F2F2', borderWidth: 0, borderColor: 'transparent' }}
            activeTabStyle={{ backgroundColor: 'white', marginTop: 2 }}
            tabTextStyle={{ color: '#444444', fontFamily: "Prompt-SemiBold" }}
            activeTabTextStyle={{ color: '#006600' }} />
          {this.state.customStyleIndex === 0 &&
            <ScrollView>
              <View>

                {
                  this.state.loading ? (
                    <ActivityIndicator size="large" color="#006600" />
                  ) : (
                      <List containerStyle={{ marginTop: 0 }}>
                        <FlatList
                          data={this.state.data}
                          //keyExtractor={item => item.title}
                          renderItem={this._renderItem}
                          refreshing={this.state.loading}
                          ItemSeparatorComponent={this.renderSeparator}
                          ListHeaderComponent={this.renderHeader}
                        />
                      </List>
                    )
                }


              </View>
            </ScrollView>
          }

          {this.state.customStyleIndex === 1 &&
            <ScrollView>
              <View>

                {
                  this.state.loading ? (
                    <ActivityIndicator size="large" color="#006600" />
                  ) : (
                      <List containerStyle={{ marginTop: 0 }}>
                        <FlatList

                          data={this.state.datamyactivity}
                          renderItem={this._renderItemmyactivity}
                          refreshing={this.state.loading}
                          ItemSeparatorComponent={this.renderSeparator}
                          ListHeaderComponent={this.renderHeadermyactivity}
                        />
                      </List>
                    )
                }


              </View>
            </ScrollView>
          }
        </PTRView>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  lineStyleh: {
    borderWidth: 0.3,
    borderColor: '#9B9B9B',

    marginTop: -5,
    marginLeft: 20,
    marginRight: 20,
  },
  button: {
    margin: 10,
    marginLeft: -5,
    height: 12,
    width: 12,
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 6,
  },
});
