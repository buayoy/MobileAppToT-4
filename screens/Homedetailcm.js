import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight, WebView, Dimensions, ScrollView , ActivityIndicator } from 'react-native';
import HTML from 'react-native-render-html';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import ResponsiveImage from 'react-native-responsive-image';
import PhotoGrid from '../PhotoGrid2'
import ImageView from 'react-native-image-view';


import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';


export default class NewscmScreen extends Component {




  state = {
    data: [],
    images: [],
    modalVisible:true,
    popupimg:false,
    selectedImg:null,
    loading: true
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
    // alert(id);

      const response = await axios.get('http://npcrapi.netpracharat.com/api/newscm/detail/' + id, {
        params: {
          course_id: id
        }
      });

      const responsereplyImage = await axios.get('http://npcrapi.netpracharat.com/api/newscm/detail/images/' + id);
      this.setState({ data: response.data ,
                      loading:false,
      });
      this.setState({
        images: responsereplyImage.data.map((i, index) => {
            let urlToImage = 'http://npcrimage.netpracharat.com/imagenewscm/' + i.filename;

            return { uri: urlToImage, index: index };
        })
    });
      // alert(JSON.stringify(response.data));

  }

  rendermodalimage(uri, source) {
      // alert(source.index);
      this.setState({ 
          popupimg: false,
          selectedImg: null,
      });
      this.setState({ 
          popupimg: true,
          selectedImg: source.uri ,
      });
  }

  componentDidMount() {
    const id = this.props.navigation.getParam('id', 0);
    this.getData(id);
  }


  render() {
    const images = [
        {
            source: {
                uri: this.state.selectedImg,
            },
            title: 'img',
            width: 806,
            height: 720,
        },
    ];
    return (
      //   <WebView
      //   source={{uri: this.props.navigation.getParam('url','')}}
      //   style={{marginTop: 0}}
      //   useWebkit={true}
      // />

      <View style={styles.container}>
        {
            this.state.loading ? (
              <ActivityIndicator size="large" color="#006600"
              />
            ) : (
        <ScrollView>
          <View style={{ backgroundColor: 'white' }}>
            <ResponsiveImage source={{ uri: 'http://npcrimage.netpracharat.com/Imagenewscm/'+this.state.data.headlines }} resizeMode='stretch' style={{ height: hp('30%') }} />
          </View>
          <Text style={styles.header}>
            {this.state.data.news_cm_name}
          </Text>
          <Text style={styles.header2}>
          {this.state.data.province + ' ' + this.state.data.district + ' ' + this.state.data.subdistrict +' '+ this.state.data.village}
        </Text>
          <View>
            <Text style={styles.detail}>{this.state.data.news_cm_detail} </Text>
          </View>
          {
              (this.state.popupimg == true) ? (
                  <ImageView
                      images={images}
                      imageIndex={0}
                      isVisible={true}
                      renderFooter={(currentImage) => (<View><Text>My footer</Text></View>)}
                  />
              ) : (
                  <Text></Text>            
              )
          }
          

          <View style={{ alignSelf: 'center' ,marginTop: hp('10%') }}>
         
              <PhotoGrid source={this.state.images} onPressImage={(uri, source) => this.rendermodalimage(uri, source)} />
        
          </View>
        </ScrollView>
            )}
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
    fontFamily: 'Prompt-SemiBold',
  },
  detail: {
    marginLeft: 15,
    marginTop: 20,
    fontFamily: 'Prompt-Medium',
    fontSize : hp('1.9%')
    },
    header2: {
      marginLeft: wp('5%'),
      marginTop: hp('2%'),
      marginRight: wp('2%'),
      fontSize: hp('2%'),
      fontFamily: 'Prompt-SemiBold',
      color: "#006600"
    },
    lineStylew3: {
      borderWidth: 2.5,
      borderColor: '#DCDCDC',
      backgroundColor: '#9B9B9B',
      // marginTop: 20,
      alignSelf: 'center',
      width: '100%',
      marginTop : hp('10%')
    },

});