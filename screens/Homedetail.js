import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight, WebView , Dimensions , ScrollView} from 'react-native';
import HTML from 'react-native-render-html';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import ResponsiveImage from 'react-native-responsive-image';

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
        <ScrollView>
          <View style={styles.headlines}>
          <ResponsiveImage source={{ uri: 'http://npcradm.netpracharat.com/newsdetail/' + this.state.data.headlines }} resizeMode='stretch' style={{height: hp('30%') }}  />
          </View>
          <Text style={styles.header}>
            {this.state.data.news_pr_name}
          </Text>
          <View style={styles.detail}>
          <HTML html={this.state.data.news_pr_detail}/> 
          </View>
          </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    
  },
  header: {
    marginLeft: wp('2%'),
    marginTop: hp('1%'),
    marginRight: wp('1%'),
    fontSize: hp('3%'),
    // fontWeight: 'bold',
    // textAlign: 'center', 
    fontFamily: "Prompt-SemiBold",
  },
  headlines:{
     backgroundColor: 'white',
     margin: 10,borderRadius: 4,
     borderWidth: 0.8,
     borderColor: 'grey',
  },
  detail: {
    marginLeft: wp('2%'),
    marginTop: hp('1%'),
    marginRight: wp('1%'),
  }
});
