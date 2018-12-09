import React, { Component } from 'react';
import { Alert, Platform, Image, StyleSheet, Text, View, TouchableHighlight, FlatList, ActivityIndicator } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import SegmentedControlTab from 'react-native-segmented-control-tab';

import axios from 'axios';
import Logo from '../components/logo';


export default class ReportScreen_myproblem extends Component {

  static navigationOptions = {
      title: 'ปัญหาของฉัน',
      headerStyle: {
          backgroundColor: '#00802b',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          fontWeight: 'bold',
          textAlign: 'center',
          marginLeft: -40,
          flex: 1
      },
  };

  state = {
    data: {},
    datas: [],
    datas2: [],
    datas3: [],
    totalResults: 0,
    loading: true,
    customStyleIndex: 0,
  }

  handleCustomIndexSelect = (index) => {
    this.setState({
      ...this.state,
      customStyleIndex: index,
    });
  }

  async getData() {
    const response = await axios.get('http://npcrapi.netpracharat.com/api/problem/all/ยังไม่ได้ดำเนินการ');
    const response2 = await axios.get('http://npcrapi.netpracharat.com/api/problem/all/กำลังดำเนินการ');
    const response3 = await axios.get('http://npcrapi.netpracharat.com/api/problem/all/ดำเนินการแล้วเสร็จ');

    this.setState({
       data: response.data,
       datas: response.data.data,
       datas2: response2.data.data,
       datas3: response3.data.data,
       totalResults: response.data.total,
       loading: false
    });
    
    // alert(JSON.stringify(response));
  }

  componentDidMount() {
    this.getData();
  }

  _renderItem = ({ item }) => {

    return (
      <View style={styles.container}>
        <TouchableHighlight
          // style={{ marginBottom: 5 }}
          underlayColor='white'
          onPress={() => {
            this.props.navigation.navigate('Report_myproblem_detail',{
              id:item.id,
              title: item.problemname
            });
          }}>
          <View style={{ flexDirection: 'row', margin: 10, padding: 10 }}>
            <View style={styles.button}/>
            <View style={{ width: 250, alignSelf: 'center' }}>
              <Text style={{ fontSize: 20, marginBottom: 5 }}>{item.problemname}</Text>
              <Text style={{ fontSize: 14, height: 40 }} numberOfLines={2}>{item.problemdetail}</Text>
            </View>
            <View style={{ right: 0 ,textAlign: 'right' }}>
              <Text style={{ fontSize: 20, marginRight: -110 ,textAlign: 'right' }}> ></Text>
            </View>
          </View>
        </TouchableHighlight>
        <View style = {styles.lineStylew3} />

        
      </View>

    )
  }

  _renderItem2 = ({ item }) => {

    return (
      <View style={styles.container}>
        <TouchableHighlight
          // style={{ marginBottom: 5 }}
          underlayColor='white'
          onPress={() => {
            this.props.navigation.navigate('Report_myproblem_detail',{
              id:item.id,
              title: item.problemname
            });
          }}>
          <View style={{ flexDirection: 'row', margin: 10, padding: 10 }}>
            <View style={styles.button2}/>
            <View style={{ width: 250, alignSelf: 'center' }}>
              <Text style={{ fontSize: 20, marginBottom: 5 }}>{item.problemname}</Text>
              <Text style={{ fontSize: 14, height: 40 }} numberOfLines={2}>{item.problemdetail}</Text>
            </View>
            <View style={{ right: 0 ,textAlign: 'right' }}>
              <Text style={{ fontSize: 20, marginRight: -110 ,textAlign: 'right' }}> ></Text>
            </View>
          </View>
        </TouchableHighlight>
        {/* <View style = {styles.lineStylew3} /> */}
      </View>

    )
  }

  _renderItem3 = ({ item }) => {

    return (
      <View style={styles.container}>
        <TouchableHighlight
          // style={{ marginBottom: 5 }}
          underlayColor='white'
          onPress={() => {
            this.props.navigation.navigate('Report_myproblem_detail',{
              id:item.id,
              title: item.problemname
            });
          }}>
          <View style={{ flexDirection: 'row', margin: 10, padding: 10 }}>
            <View style={styles.button3}/>
            <View style={{ width: 250, alignSelf: 'center' }}>
              <Text style={{ fontSize: 20, marginBottom: 5 }}>{item.problemname}</Text>
              <Text style={{ fontSize: 14, height: 40 }} numberOfLines={2}>{item.problemdetail}</Text>
            </View>
            <View style={{ right: 0 ,textAlign: 'right' }}>
              <Text style={{ fontSize: 20, marginRight: -110 ,textAlign: 'right' }}> ></Text>
            </View>
          </View>
        </TouchableHighlight>
        {/* <View style = {styles.lineStylew3} /> */}
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
    return (
      // <Text>{this.getData()}</Text>
      <View>
        <SegmentedControlTab
          values={['ยังไม่ดำเนินการ', 'กำลังดำเนินการ', 'ดำเนินการแล้วเสร็จ']}
          selectedIndex={this.state.customStyleIndex}
          onTabPress={this.handleCustomIndexSelect}
          borderRadius={0}
          tabsContainerStyle={{ height: 50, backgroundColor: '#F2F2F2' }}
          tabStyle={{ backgroundColor: '#F2F2F2', borderWidth: 0, borderColor: 'transparent' }}
          activeTabStyle={{ backgroundColor: 'white', marginTop: 2 }}
          tabTextStyle={{ color: '#00802b', fontWeight: 'bold', fontSize: 16 }}
          activeTabTextStyle={{ color: '#00802b' }} />
        {this.state.customStyleIndex === 0 &&
          <View style={styles.tabContent} >
            {
              this.state.loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                  <FlatList
                    style={{marginBottom:100}}
                    data={this.state.datas}
                    keyExtractor={item => item.problemname}
                    renderItem={this._renderItem}
                    onRefresh={this._onRefresh}
                    refreshing={this.state.loading}
                  />
              ) 
            }
          </View>}
        {this.state.customStyleIndex === 1 &&
          <View style={styles.tabContent} > 
              {
              this.state.loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                  <FlatList
                    data={this.state.datas2}
                    keyExtractor={item => item.problemname}
                    renderItem={this._renderItem2}
                    onRefresh={this._onRefresh}
                    refreshing={this.state.loading}
                  />
              )
            }
          </View>}
          {this.state.customStyleIndex === 2 &&
          <View style={styles.tabContent} > 
              {
              this.state.loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                  <FlatList
                    data={this.state.datas3}
                    keyExtractor={item => item.problemname}
                    renderItem={this._renderItem3}
                    onRefresh={this._onRefresh}
                    refreshing={this.state.loading}
                  />
              )
            }
          </View>}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // flexDirection: 'row',
    // padding: 15,
  },
  lineStylew3:{
    borderWidth: 0.2,
    borderColor:'gray',
    // backgroundColor: 'gray',
    // marginTop: 20, 
    width: '100%',
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
  button2: {
    margin: 10,
    marginLeft: -5,
    height: 12,
    width: 12,
    alignItems: 'center',
    backgroundColor: 'yellow',
    borderRadius: 6,
  },
  button3: {
    margin: 10,
    marginLeft: -5,
    height: 12,
    width: 12,
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 6,
  },
});