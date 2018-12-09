/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight , Dimensions} from 'react-native';
import MapView  ,{ Marker , Callout} from 'react-native-maps';

import Icon from 'react-native-vector-icons/Ionicons';

import flagImg from '../images/flag-blue.png';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 13.8847007;
const LONGITUDE = 100.5755656;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default class MapScreen extends Component {
  static navigationOptions = {
    title: 'แผนที่' ,
    headerStyle: {
      backgroundColor: '#00802b' ,
      textAlign: 'center' ,
    },
    headerTintColor: '#fff' ,
    headerTitleStyle: {
      fontWeight: 'bold' ,
    },
  };
 

  render() {
    return (
      <View style={styles.container}>
         <MapView
         style={styles.map}
         region={{
           latitude: LATITUDE,
           longitude: LONGITUDE,
           latitudeDelta: LATITUDE_DELTA,
           longitudeDelta:LONGITUDE_DELTA,
         }}
       >
       <Marker 
        coordinate = {{
            latitude: LATITUDE,
            longitude: LONGITUDE,
        }}
        image={flagImg}
       >
       <Callout>
           <View>
                <Text style={{color: 'blue'}}>บริษัท TOT จำกัด มหาชน</Text>
           </View>
       </Callout>
       </Marker>
       
       </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      //height: 400,
      //width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });