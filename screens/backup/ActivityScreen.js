/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight, ActivityIndicator, FlatList, Image, ScrollView } from 'react-native';

import axios from 'axios';
import { List, ListItem, SearchBar } from 'react-native-elements'
import SegmentedControlTab from 'react-native-segmented-control-tab';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';


export default class ActivityScreen extends Component {

  state = {
    data: {},
    loading: true,
    customStyleIndex: 0,
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

  async getData() {
    const response = await axios.get('http://npcrapi.netpracharat.com/api/activity/all');
    
    this.setState({
      data: response.data,
      loading: false
    });
    //alert(JSON.stringify(this.state.articles));
  }
  componentDidMount() {
    this.getData();

  }

  _renderItem = ({ item }) => {

    let urlToImage = (item.headlines !== null) ? 'http://npcradm.netpracharat.com/newsdetail/' + item.headlines : 'https://via.placeholder.com/150x100';

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
          <Image source={require('../images/region2.jpg')} style={{ width: wp('35%'), height: hp('15%'), marginRight: 10 }} />
            <View style={{ width: wp('50%') , alignSelf: 'center' }}>
              <Text style={{ fontWeight: 'bold' , fontSize: hp('2.3%'), marginBottom: 5  }}>{item.activityname}</Text>
              <Text style={{ fontSize: hp('1.8%')  }} numberOfLines={5} >{item.activitydetail} </Text>

            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.lineStyleh} />
      </View>


    )
  }


  _onRefresh = () => {
    this.setState({
      loading: true
    });
    this.getData();
  }

  search = (text) => {
    
//     requestMonitorados(text).then((value) => {
// alert(value);
//       // setTimeout(() => {
//       //   this.setState(data: value); //Updating list of data
//       // }, 3000);

//     });
  }

  onChangeText = ({ text }) => {
    
    WAIT_TIME = 1;
    this.text = text;
    clearTimeout(this.timeout); // clears the old timer
    this.timeout = setTimeout(() => this.search(this.text), WAIT_TIME);
    
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return (
      <View>
        <SegmentedControlTab
          values={['กิจกรรม', 'กิจกรรมของฉัน']}
          selectedIndex={this.state.customStyleIndex}
          onTabPress={this.handleCustomIndexSelect}
          borderRadius={0}
          tabsContainerStyle={{ height: 50, backgroundColor: '#F2F2F2' }}
          tabStyle={{ backgroundColor: '#F2F2F2', borderWidth: 0, borderColor: 'transparent' }}
          activeTabStyle={{ backgroundColor: 'white', marginTop: 2 }}
          tabTextStyle={{ color: '#444444', fontWeight: 'bold' }}
          activeTabTextStyle={{ color: '#888888' }} />
        <SearchBar
          round
          lightTheme
          // searchIcon={<CustomComponent />}
          onChangeText={(text) => {this.onChangeText({text}); }}
          // onClear={someMethod}
          placeholder='Type Here...' />
        {this.state.customStyleIndex === 0 &&
          <ScrollView>
            <View>
              {
                this.state.loading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <List containerStyle={{ marginTop: 0 }}>
                      <FlatList
                        data={this.state.data.data}
                        //keyExtractor={item => item.title}
                        renderItem={this._renderItem}
                        onRefresh={this._onRefresh}
                        refreshing={this.state.loading}
                      />
                    </List>


                  )
              }
              <Text style={{ marginTop: 30 }}> </Text>


            </View>
          </ScrollView>
        }

        {this.state.customStyleIndex === 1 &&
                 <Text>
                     asdasdasd
                 </Text>
        }
    
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
});
