import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight, WebView , Dimensions } from 'react-native';
import HTML from 'react-native-render-html';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';


export default class WebScreen extends Component {


  

  state = {
    data: []
  }




  static navigationOptions = {

    title: 'รายละเอียด',
    headerStyle: {
      backgroundColor: '#00802b',
      textAlign: 'center',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },

  };


  async getData(id) {
    const response = await axios.get('http://npcrapi.netpracharat.com/api/newspr/detail/' + id, {
      params: {
        course_id: id
      }
    });
    this.setState({ data: response.data });
    // alert(JSON.stringify(response.data));

  }

  componentDidMount() {
    const id = this.props.navigation.getParam('id', 0);
    this.getData(id);
  }


  render() {
    return (
      //   <WebView
      //   source={{uri: this.props.navigation.getParam('url','')}}
      //   style={{marginTop: 0}}
      //   useWebkit={true}
      // />
      <View style={styles.container}>
      
        <View style={{ backgroundColor: 'white'}}>
        <Image source={{ uri: 'http://npcradm.netpracharat.com/newsdetail/' + this.state.data.headlines }} resizeMode='stretch' style={{height: hp('30%') }}  />
        </View>
     
        <Text style={styles.header}>
          {this.state.data.news_pr_name}
        </Text>
      
      
        
        <HTML containstyle={{marginLeft : 100}} html={this.state.data.news_pr_detail}/> 
        
     
      </View>


    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    marginLeft: wp('5%'),
    marginTop: hp('3%'),
    marginRight: wp('2%'),
    fontSize: hp('2.3%'),
    fontWeight: 'bold',
  },
  detail: {
    marginLeft: 15,
    marginTop: 20,
    marginRight: 20,
    fontSize : hp('1.75')
    }
});
