/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight, ActivityIndicator, FlatList, Image, ScrollView } from 'react-native';

import { List, ListItem, SearchBar } from 'react-native-elements'
import SegmentedControlTab from 'react-native-segmented-control-tab';
import ResponsiveImage from 'react-native-responsive-image';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

const width = '100%';
export default class NewsScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      datacm: [],
      articles: [],
      totalResults: 0,
      loading: true,
      customStyleIndex: 0,


    }
    this.arrayholder = []
    this.arrayholdercm = []
  }



  handleCustomIndexSelect = (index) => {
    this.setState({
      ...this.state,
      customStyleIndex: index,
    });
  }

  static navigationOptions = {
    title: 'ข่าวสาร',
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
    const url = `http://npcrapi.netpracharat.com/api/newscm/home`;
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
  componentDidMount() {
    this.makeRemoteRequest();
    this.makeRemoteRequestcm();

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

  searchFilterFunction2 = text => {
    //alert(text);
    const newData = this.arrayholdercm.filter(item => {
      const itemData = `${item.news_cm_name.toUpperCase()}`;
      const textData = text.toUpperCase();
      let a = itemData.indexOf(textData) > -1;
      return itemData.indexOf(textData) > -1;

    });
    this.setState({ datacm: newData });
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
          }}>
          <View style={styles.view1}>
            <ResponsiveImage source={{ uri: urlToImage }} resizeMode='stretch' style={styles.newspic} />
            <View style={styles.newsview}>
              <Text style={styles.newstxt}>{item.news_pr_name}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  _renderItem2 = ({ item }) => {

    let urlToImage = (item.headlines !== null) ? 'http://npcradm.netpracharat.com/newsdetail/' + item.headlines : 'https://via.placeholder.com/150x100';

    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor='white'
          onPress={() => {
            this.props.navigation.navigate('Web', {
              id: item.id
            });
          }}>
          <View style={styles.view1}>
            <ResponsiveImage source={{ uri: urlToImage }} style={styles.pic} />
            <View style={styles.newsview}>
              <Text style={styles.newstxt}>{item.news_cm_name}</Text>
              <Text style={{ fontSize: hp('1.8%') }} numberOfLines={3} >{item.news_cm_detail} </Text>
            </View>
          </View>
        </TouchableHighlight>
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
    this.getData();
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

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }


  render() {
    return (
      <View>
        <SegmentedControlTab
          values={['ข่าวประชาสัมพันธ์', 'ข่าวชุมชน', 'ข่าวสารของฉัน']}
          selectedIndex={this.state.customStyleIndex}
          onTabPress={this.handleCustomIndexSelect}
          borderRadius={0}
          tabsContainerStyle={{ height: 50, backgroundColor: '#F2F2F2' }}
          tabStyle={{ backgroundColor: '#F2F2F2', borderWidth: 0, borderColor: 'transparent' }}
          activeTabStyle={{ backgroundColor: 'white', marginTop: 2 }}
          tabTextStyle={{ color: '#444444', fontWeight: 'bold' }}
          activeTabTextStyle={{ color: '#888888' }} />
        {this.state.customStyleIndex === 0 &&
          <ScrollView>
            <View style={{ marginTop: 5 }}>

              {
                this.state.loading ? (
                  <ActivityIndicator size="large" color="#006600" />
                ) : (
                    <List containerStyle={{ marginTop: 0 }}>
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
                    </List>
                  )
              }
              <Text style={{ marginTop: hp('13%') }}> </Text>
            </View>
          </ScrollView>
        }

        {this.state.customStyleIndex === 1 &&
          <ScrollView>
            <View>
              {
                this.state.loading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <List containerStyle={{ marginTop: 0 }}>
                      <FlatList
                        data={this.state.datacm}
                        //keyExtractor={item => item.title}
                        renderItem={this._renderItem2}
                        onRefresh={this._onRefresh}
                        refreshing={this.state.loading}
                        keyExtractor={(item, index) => index}
                        ItemSeparatorComponent={this.renderSeparator}
                        ListHeaderComponent={this.renderHeader2}
                      />
                    </List>
                  )
              }
              <Text style={{ marginTop: 30 }}> </Text>
            </View>
          </ScrollView>
        }
        {this.state.customStyleIndex === 2 &&
          <Text style={styles.tabContent} > Tab Three</Text>}
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
    alignSelf: 'center'
  },
  newsview: {
    width: wp('50%'),
    alignSelf: 'center'
  }
});
