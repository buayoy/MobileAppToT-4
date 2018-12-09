/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight, ActivityIndicator, FlatList, Image, ScrollView, AsyncStorage } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements';
import { List, ListItem, SearchBar } from 'react-native-elements'
import SegmentedControlTab from 'react-native-segmented-control-tab';
import ResponsiveImage from 'react-native-responsive-image';
import axios from 'axios'
import PTRView from 'react-native-pull-to-refresh';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import Logo from '../components/logo/index';

import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';
const width = '100%';
const sizelogo = wp('20%');

const IoniconsHeaderButton = passMeFurther => (
  <HeaderButton {...passMeFurther} IconComponent={Ionicons} iconSize={30} color="white" />

);

export default class NewsScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      datas: [],
      type: '',
      pass: '',
      datacm: [],
      checktype: '',
      datamygood: [],
      articles: [],
      totalResults: 0,
      loading: true,
      customStyleIndex: 0,


    }
    this.arrayholder = []
    this.arrayholdercm = []
    this.arrayholders = []
    this.arrayholdermygood = []
  }



  handleCustomIndexSelect = (index) => {
    this.setState({
      ...this.state,
      customStyleIndex: index,
    });
  }
  async checkType() {
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


    Alert.alert(params.pass);
  }


  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: <Logo />,
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
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
      },
    }
  };

  _updateview = async (id) => {

    const response = await axios.post('http://npcrapi.netpracharat.com/api/newspr/updateview/' + id, {
    });
  }


  _updateviewcm = async (id) => {
    const response = await axios.post('http://npcrapi.netpracharat.com/api/newscm/updateview/' + id, {
    });
  }

  // // async getData() {
  // //   const response = await axios.get('http://npcrapi.netpracharat.com/api/problemnet/all/ยังไม่ได้ดำเนินการ');


  // //   this.setState({
  // //      datas: response.data.data,
  // //      loading: false
  // //   });

  //   // alert(JSON.stringify(response));
  // }

  makeRemoteRequest = () => {
    const url = `http://npcrapi.netpracharat.com/api/good/teeteaw`;
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

  makeRemoteRequestcm = () => {
    const url = `http://npcrapi.netpracharat.com/api/good/teepug50`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          datacm: res.data,
          error: res.error || null,
          loading: false,
        });
        this.arrayholdercm = res.data;

      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };


  makeRemoteRequests = () => {
    const url = `http://npcrapi.netpracharat.com/api/good/teegin50`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          datas: res.data,
          error: res.error || null,
          loading: false,
        });
        this.arrayholders = res.data;

      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  async makeRemoteRequestMygood() {
    var userids = await AsyncStorage.getItem("userid");
    await this.setState({ userid: userids });

    const url = `http://npcrapi.netpracharat.com/api/good/mygood/` + this.state.userid;
    // alert(url);
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          datamygood: res.data,
          error: res.error || null,
          loading: false,
        });
        this.arrayholdermygood = res.data;

      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  componentDidMount() {
    this.makeRemoteRequest();
    this.makeRemoteRequestcm();
    this.makeRemoteRequests();
    this.makeRemoteRequestMygood();
    this.checkType();
  }

  searchFilterFunction = text => {
    //alert(text);
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.goodname.toUpperCase()}`;
      const textData = text.toUpperCase();
      let a = itemData.indexOf(textData) > -1;
      return itemData.indexOf(textData) > -1;



    });
    this.setState({ data: newData });

  };

  searchFilterFunction2 = text => {
    //alert(text);
    const newData = this.arrayholdercm.filter(item => {
      const itemData = `${item.goodname.toUpperCase()}`;
      const textData = text.toUpperCase();
      let a = itemData.indexOf(textData) > -1;
      return itemData.indexOf(textData) > -1;

    });
    this.setState({ datacm: newData });
  };

  searchFilterFunction3 = text => {
    //alert(text);
    const newData = this.arrayholders.filter(item => {
      const itemData = `${item.goodname.toUpperCase()}`;
      const textData = text.toUpperCase();
      let a = itemData.indexOf(textData) > -1;
      return itemData.indexOf(textData) > -1;

    });
    this.setState({ datas: newData });
  };

  searchFilterFunctionmygood = text => {
    //alert(text);
    const newData = this.arrayholdermygood.filter(item => {
      const itemData = `${item.goodname.toUpperCase()}`;
      const textData = text.toUpperCase();
      let a = itemData.indexOf(textData) > -1;
      return itemData.indexOf(textData) > -1;

    });
    this.setState({ datamygood: newData });
  };

  _renderItem = ({ item }) => {

    let urlToImage = (item.headlines !== null) ? 'http://npcrimage.netpracharat.com/imagegood/' + item.headlines : 'https://via.placeholder.com/150x100';

    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor='white'
          onPress={() => {
            this.props.navigation.navigate('Gooddetail', {
              id: item.id
            });

          }}>
          <View style={styles.view1}>
            <ResponsiveImage source={{ uri: urlToImage }} resizeMode='stretch' style={styles.newspic} />
            <View style={styles.newsview}>
              <Text style={styles.newstxt} numberOfLines={2}>{item.goodname}</Text>
              <Text style={{ marginTop: hp('1.5%'), fontFamily: "Prompt-Medium", color: "#006600" }} numberOfLines={1}>{item.province + ' ' + item.district} </Text>
                    <Text style={{ marginTop: hp('0.5%'), fontFamily: "Prompt-Medium", color: "#006600" }} numberOfLines={1}>{item.subdistrict + ' ' + item.village} </Text>

            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  _renderItemcm = ({ item }) => {

    let urlToImage = (item.headlines !== null) ? 'http://npcrimage.netpracharat.com/imagegood/' + item.headlines : 'https://via.placeholder.com/150x100';

    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor='white'
          onPress={() => {
            this.props.navigation.navigate('Gooddetail', {
              id: item.id
            });

          }}>
          <View style={styles.view1}>
            <ResponsiveImage source={{ uri: urlToImage }} resizeMode='stretch' style={styles.newspic} />
            <View style={styles.newsview}>
              <Text style={styles.newstxt} numberOfLines={2}>{item.goodname}</Text>
              <Text style={{ marginTop: hp('1.5%'), fontFamily: "Prompt-Medium", color: "#006600" }} numberOfLines={1}>{item.province + ' ' + item.district} </Text>
                    <Text style={{ marginTop: hp('0.5%'), fontFamily: "Prompt-Medium", color: "#006600" }} numberOfLines={1}>{item.subdistrict + ' ' + item.village} </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>


    )
  }
  _renderItemmynews = ({ item }) => {

    let urlToImage = (item.headlines !== null) ? 'http://npcrimage.netpracharat.com/imagegood/' + item.headlines : 'https://via.placeholder.com/150x100';

    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor='white'
          onPress={() => {
            this.props.navigation.navigate('Gooddetail', {
              id: item.id
            });

          }}>
          <View style={styles.view1}>
            <ResponsiveImage source={{ uri: urlToImage }} resizeMode='stretch' style={styles.newspic} />
            <View style={styles.newsview}>
              <Text style={styles.newstxt} numberOfLines={2}>{item.goodname}</Text>
              <Text style={{ marginTop: hp('1.5%'), fontFamily: "Prompt-Medium", color: "#006600" }} numberOfLines={1}>{item.province + ' ' + item.district} </Text>
                    <Text style={{ marginTop: hp('0.5%'), fontFamily: "Prompt-Medium", color: "#006600" }} numberOfLines={1}>{item.subdistrict + ' ' + item.village} </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>

    )
  }

  _renderItemMygood = ({ item }) => {

    let urlToImage = (item.headlines !== null) ? 'http://npcrimage.netpracharat.com/imagegood/' + item.headlines : 'https://via.placeholder.com/150x100';

    return (
      <View style={styles.container}>
        {(item.status == 2) ?
          <TouchableHighlight
            underlayColor='white'
            onPress={() => {
              this.props.navigation.navigate('EditGood', {
                id: item.id
              });

            }}>
            <View style={styles.view1}>
              <View style={{
                margin: 10,
                marginLeft: -5,
                height: 12,
                width: 12,
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 6,
              }} />
              <ResponsiveImage source={{ uri: urlToImage }} resizeMode='stretch' style={styles.newspic} />
              <View style={styles.newsview}>
                <Text style={styles.newstxt} numberOfLines={2}>{item.goodname}</Text>
                <Text style={{ marginTop: hp('1.5%'), fontFamily: "Prompt-Medium", color: "#006600" }} numberOfLines={1}>{item.province + ' ' + item.district} </Text>
                <Text style={{ marginTop: hp('0.5%'), fontFamily: "Prompt-Medium", color: "#006600" }} numberOfLines={1}>{item.subdistrict + ' ' + item.village} </Text>

              </View>
            </View>
          </TouchableHighlight>
          : (item.status == 0) ?
            <TouchableHighlight
              underlayColor='white'
              onPress={() => {
                this.props.navigation.navigate('EditGood', {
                  id: item.id
                });

              }}>
              <View style={styles.view1}>
                <View style={{
                  margin: 10,
                  marginLeft: -5,
                  height: 12,
                  width: 12,
                  alignItems: 'center',
                  backgroundColor: 'red',
                  borderRadius: 6,
                }} />
                <ResponsiveImage source={{ uri: urlToImage }} resizeMode='stretch' style={styles.newspic} />
                <View style={styles.newsview}>
                  <Text style={styles.newstxt} numberOfLines={2}>{item.goodname}</Text>
                  <Text style={{ marginTop: hp('1.5%'), fontFamily: "Prompt-Medium", color: "#006600" }} numberOfLines={1}>{item.province + ' ' + item.district} </Text>
                    <Text style={{ marginTop: hp('0.5%'), fontFamily: "Prompt-Medium", color: "#006600" }} numberOfLines={1}>{item.subdistrict + ' ' + item.village} </Text>

                </View>
              </View>
            </TouchableHighlight>
            :
            <TouchableHighlight
              underlayColor='white'
            >
              <View style={styles.view1}>
                <View style={{
                  margin: 10,
                  marginLeft: -5,
                  height: 12,
                  width: 12,
                  alignItems: 'center',
                  backgroundColor: 'green',
                  borderRadius: 6,
                }} />
                <ResponsiveImage source={{ uri: urlToImage }} resizeMode='stretch' style={styles.newspic} />
                <View style={styles.newsview}>
                  <Text style={styles.newstxt} numberOfLines={2}>{item.goodname}</Text>
                  <Text style={{ marginTop: hp('1.5%'), fontFamily: "Prompt-Medium", color: "#006600" }} numberOfLines={1}>{item.province + ' ' + item.district} </Text>
                    <Text style={{ marginTop: hp('0.5%'), fontFamily: "Prompt-Medium", color: "#006600" }} numberOfLines={1}>{item.subdistrict + ' ' + item.village} </Text>

                </View>
              </View>
            </TouchableHighlight>
        }
      </View>
    )
  }


  renderSeparator = () => {
    return (
      <View style={{ height: 1, width: '100%', backgroundColor: 'black' }}>
      </View>
    )
  }

  _onRefresh = () => {
    this.setState({
      loading: true
    });
    this.makeRemoteRequest();
    this.makeRemoteRequestcm();
    this.makeRemoteRequests();
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

  renderHeader2 = () => {
    return (
      <SearchBar
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction2(text)}
        autoCorrect={false}
        showLoading={true}
        platform="android"
        // onChangeText={this.filterSearch(text)}
        cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
        placeholder='Search' />
    )
  }

  renderHeader3 = () => {
    return (
      <SearchBar
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction3(text)}
        autoCorrect={false}
        showLoading={true}
        platform="android"
        // onChangeText={this.filterSearch(text)}
        cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
        placeholder='Search' />
    )
  }


  renderHeadermygood = () => {
    return (
      <SearchBar
        lightTheme
        round
        onChangeText={text => this.searchFilterFunctionmygood(text)}
        autoCorrect={false}
        showLoading={true}
        platform="android"
        // onChangeText={this.filterSearch(text)}
        cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
        placeholder='Search' />
    )
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {

    return (
      <View>
          <PTRView onRefresh={this._onRefresh}>
        <SegmentedControlTab
          values={this.state.type === 'admin' ? (['ที่กิน', 'ที่เที่ยว', 'ของดีชุมชน', 'สถานที่ของฉัน']) : (['แนะนำที่กิน', 'แนะนำที่เที่ยว', 'แนะนำของดีชุมชน'])}
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


                    <FlatList
                      // style={{marginBottom: 120}}
                      data={this.state.datas}
                      //keyExtractor={item => item.title}
                      renderItem={this._renderItemmynews}
                      onRefresh={this._onRefresh}
                      refreshing={this.state.loading}
                      keyExtractor={(item, index) => index}
                      ItemSeparatorComponent={this.renderSeparator}
                      ListHeaderComponent={this.renderHeader3}

                    />

                  )
              }

              <Text style={{ marginTop: 30 }}> </Text>
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
                    <View>


                      <FlatList

                        data={this.state.data}
                        //keyExtractor={item => item.title}
                        renderItem={this._renderItem}
                        onRefresh={this._onRefresh}
                        refreshing={this.state.loading}
                        keyExtractor={(item, index) => index}
                        ItemSeparatorComponent={this.renderSeparator}
                        ListHeaderComponent={this.renderHeader}

                      />

                    </View>
                  )

              }

              <Text style={{ marginTop: 30 }}> </Text>

            </View>
          </ScrollView>
        }
        {this.state.customStyleIndex === 2 &&
          <ScrollView>
            <View>
              {
                this.state.loading ? (
                  <ActivityIndicator size="large" color="#006600" />
                ) : (
                    <View>



                      <FlatList
                        // style={{marginBottom: 120}}
                        data={this.state.datacm}
                        //keyExtractor={item => item.title}
                        renderItem={this._renderItemcm}
                        onRefresh={this._onRefresh}
                        refreshing={this.state.loading}
                        keyExtractor={(item, index) => index}
                        ItemSeparatorComponent={this.renderSeparator}
                        ListHeaderComponent={this.renderHeader2}

                      />


                    </View>
                  )

              }

              

            </View>
          </ScrollView>

        }
        {this.state.customStyleIndex === 3 &&
          <ScrollView>
            <View>

              {
                this.state.loading ? (
                  <ActivityIndicator size="large" color="#006600" />
                ) : (

                    <FlatList

                      data={this.state.datamygood}
                      //keyExtractor={item => item.title}
                      renderItem={this._renderItemMygood}
                      onRefresh={this._onRefresh}
                      refreshing={this.state.loading}
                      keyExtractor={(item, index) => index}
                      ItemSeparatorComponent={this.renderSeparator}
                      ListHeaderComponent={this.renderHeadermygood}

                    />

                  )
              }

              <Text style={{ marginTop: 30 }}> </Text>
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
    borderWidth: 0.5,
    borderColor: '#9B9B9B',
    marginTop: -5,
    marginLeft: 20,
    marginRight: 20,
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
  newstxt: {
    width: wp('50%'),

    alignSelf: 'center',
    fontFamily: "Prompt-SemiBold"
  },
  newsview: {
    width: wp('50%'),
    alignSelf: 'center'
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
