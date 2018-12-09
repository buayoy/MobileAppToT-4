/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert, TouchableHighlight, ActivityIndicator, FlatList, Image, ScrollView, AsyncStorage } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements';
import { List, ListItem, SearchBar } from 'react-native-elements'
import SegmentedControlTab from 'react-native-segmented-control-tab';
import ResponsiveImage from 'react-native-responsive-image';
import axios from 'axios'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import Logo from '../components/logo/index';
import PTRView from 'react-native-pull-to-refresh';
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
      userid: '',
      data: [],
      datas: [],
      datacm: [],
      type: '',
      pass: '',
      checktype: '',
      datamycm: [],
      articles: [],
      totalResults: 0,
      loading: true,
      customStyleIndex: 0,
    }
    this.arrayholder = []
    this.arrayholdercm = []
    this.arrayholdermycm = []
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


    // Alert.alert(params.pass);
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
            <Item iconName='ios-add-circle-outline' onPress={() => navigation.navigate('Createnewcm')} />
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
  // <TouchableHighlight 
  // style={{marginLeft:wp('83%') ,}}
  //         onPress={() => {
  //             this.props.navigation.navigate("Createnewcm");
  //         }}
  //         underlayColor="white">
  //         <View >
  //             <Icon
  //                 raised
  //                 type='ionicon'
  //                 color='white'
  //                 containerStyle={{ backgroundColor: '#00802b' }}
  //                 name="ios-megaphone"
  //                 size={20} />
  //             <Text >
  //                 แจ้งปัญหา
  //             </Text>
  //         </View>
  //     </TouchableHighlight>
  // async getData() {
  //   const response = await axios.get('http://npcrapi.netpracharat.com/api/newspr/status1');
  //   const responsecm = await axios.get('http://npcrapi.netpracharat.com/api/newscm/home');

  //   this.setState({
  //     data: response.data,
  //     datacm: responsecm.data,
  //     loading: false,

  //   });
  //   this.arrayholder = this.state.data.data
  // }
  _updateview = async (id) => {

    const response = await axios.post('http://npcrapi.netpracharat.com/api/newspr/updateview/' + id, {
    });
  }


  _updateviewcm = async (id) => {
    const response = await axios.post('http://npcrapi.netpracharat.com/api/newscm/updateview/' + id, {
    });
  }

  async getData() {
    const response = await axios.get('http://npcrapi.netpracharat.com/api/problemnet/all/ยังไม่ได้ดำเนินการ');


    this.setState({
      datas: response.data.data,
      loading: false
    });

    // alert(JSON.stringify(response));
  }

  makeRemoteRequest = () => {
    const url = `http://npcrapi.netpracharat.com/api/newspr/status1`;
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
    const url = `http://npcrapi.netpracharat.com/api/newscm/all`;
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

  async makeRemoteRequestmycm() {
    var userids = await AsyncStorage.getItem("userid");
    await this.setState({ userid: userids });

    const url = `http://npcrapi.netpracharat.com/api/newscm/mycm/` + this.state.userid;
    // alert(url)
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          datamycm: res.data,
          error: res.error || null,
          loading: false,
        });
        this.arrayholdermycm = res.data;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };
  componentDidMount() {
    this.makeRemoteRequest();
    this.makeRemoteRequestcm();
    this.makeRemoteRequestmycm();
    this.getData();
    this.checkType();
    // Alert.alert(this.state.type)
  }

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

  searchFilterFunctioncm = text => {
    // alert(text);
    const newData = this.arrayholdercm.filter(item => {
      const itemData = `${item.news_cm_name.toUpperCase()}`;
      // alert(itemData);
      const textData = text.toUpperCase();
      let a = itemData.indexOf(textData) > -1;
      return itemData.indexOf(textData) > -1;

    });
    this.setState({ datacm: newData });
  };

  searchFilterFunctionmycm = text => {
    //alert(text);
    const newData = this.arrayholdermycm.filter(item => {
      const itemData = `${item.news_cm_name.toUpperCase()}`;
      const textData = text.toUpperCase();
      let a = itemData.indexOf(textData) > -1;
      return itemData.indexOf(textData) > -1;

    });
    this.setState({ datamycm: newData });
  };

  _renderItem = ({ item }) => {

    let urlToImage = (item.headlines !== null) ? 'http://npcradm.netpracharat.com/newsdetail/' + item.headlines : 'https://via.placeholder.com/150x100';

    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor='white'
          onPress={() => {
            this.props.navigation.navigate('Web', {
              id: item.id
            });
            this._updateview(item.id)
          }}>
          <View style={styles.view1}>
            <ResponsiveImage source={{ uri: urlToImage }} resizeMode='stretch' style={styles.newspic} />
            <View style={styles.newsview}>
              <Text style={styles.newstxt} numberOfLines={2}>{item.news_pr_name}</Text>
              <Text style={{ marginTop: hp('2%'), fontFamily: "Prompt-Medium", color: "#006600" }}>{item.source}</Text>

            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  _renderItemcm = ({ item }) => {

    let urlToImage = (item.headlines !== null) ? 'http://npcrimage.netpracharat.com/Imagenewscm/' + item.headlines : 'https://via.placeholder.com/150x100';

    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor='white'
          onPress={() => {
            this.props.navigation.navigate('NewsCm', {
              id: item.id
            });
            this._updateviewcm(item.id)
          }}>
          <View style={styles.view1}>
            <ResponsiveImage source={{ uri: urlToImage }} resizeMode='stretch' style={styles.newspic} />
            <View style={styles.newsview}>
              <Text style={styles.newstxt} numberOfLines={2}>{item.news_cm_name}</Text>
              <Text style={{ marginTop: hp('1.5%'), fontFamily: "Prompt-Medium", color: "#006600" }} numberOfLines={1}>{item.province + ' ' + item.district} </Text>
              <Text style={{ marginTop: hp('0.5%'), fontFamily: "Prompt-Medium", color: "#006600" }} numberOfLines={1}>{item.subdistrict + ' ' + item.village} </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
  _renderItemmynews = ({ item }) => {

    let urlToImage = (item.headlines !== null) ? 'http://npcrimage.netpracharat.com/Imagenewscm/' + item.headlines : 'https://via.placeholder.com/150x100';
    return (
      <View style={styles.container}>
        {
          (item.status == 2) ?
            <TouchableHighlight
              underlayColor='white'
              onPress={() => {
                this.props.navigation.navigate('Edit', {
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
                  <Text style={styles.newstxt} numberOfLines={2}>{item.news_cm_name}</Text>
                  <Text style={{ marginTop: hp('1.5%'), fontFamily: "Prompt-Medium", color: "#006600" }} numberOfLines={1}>{item.province + ' ' + item.district} </Text>
                  <Text style={{ marginTop: hp('0.5%'), fontFamily: "Prompt-Medium", color: "#006600" }} numberOfLines={1}>{item.subdistrict + ' ' + item.village} </Text>
                </View>
              </View>
            </TouchableHighlight>
            : (item.status == 0) ?
              <TouchableHighlight
                underlayColor='white'
                onPress={() => {
                  this.props.navigation.navigate('Edit', {
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
                    <Text style={styles.newstxt} numberOfLines={2}>{item.news_cm_name}</Text>
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
                    <Text style={styles.newstxt} numberOfLines={2}>{item.news_cm_name}</Text>
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
    this.makeRemoteRequestmycm();
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

  renderHeadercm = () => {
    return (
      <SearchBar
        lightTheme
        round
        onChangeText={text => this.searchFilterFunctioncm(text)}
        autoCorrect={false}
        showLoading={true}
        platform="android"
        // onChangeText={this.filterSearch(text)}
        cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
        placeholder='Search' />
    )
  }
  renderHeadermycm = () => {
    return (
      <SearchBar
        lightTheme
        round
        onChangeText={text => this.searchFilterFunctionmycm(text)}
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
    // const { params = {} } = navigation.state;
    return (
      <View>
          <PTRView onRefresh={this._onRefresh}>

        <SegmentedControlTab
          values={this.state.type === 'admin' ? (['ข่าวประชาสัมพันธ์', 'ข่าวชุมชน', 'ข่าวสารของฉัน']) : (['ข่าวประชาสัมพันธ์', 'ข่าวชุมชน'])}
          selectedIndex={this.state.customStyleIndex}
          onTabPress={this.handleCustomIndexSelect}
          borderRadius={0}
          tabsContainerStyle={{ height: 50, backgroundColor: '#F2F2F2' }}
          tabStyle={{ backgroundColor: '#F2F2F2', borderWidth: 0, borderColor: 'transparent' }}
          activeTabStyle={{ backgroundColor: 'white', marginTop: 2 }}
          tabTextStyle={{ color: '#444444', fontFamily: "Prompt-SemiBold" }}
          activeTabTextStyle={{ color: '#00802b' }} />
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
                        keyExtractor={(item, index) => index}
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
                    <View>


                      <List containerStyle={{ marginTop: 0 }}>
                        <FlatList

                          data={this.state.datacm}
                          //keyExtractor={item => item.title}
                          renderItem={this._renderItemcm}
                          refreshing={this.state.loading}
                          keyExtractor={(item, index) => index}
                          ItemSeparatorComponent={this.renderSeparator}
                          ListHeaderComponent={this.renderHeadercm}
                        />

                      </List>

                    </View>
                  )

              }

        

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


                      <List containerStyle={{ marginTop: 0 }}>
                        <FlatList
                          data={this.state.datamycm}
                          renderItem={this._renderItemmynews}
                          refreshing={this.state.loading}
                          ItemSeparatorComponent={this.renderSeparator}
                          ListHeaderComponent={this.renderHeadermycm}
                        />

                      </List>

                    </View>
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
    borderWidth: 0.5,
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
