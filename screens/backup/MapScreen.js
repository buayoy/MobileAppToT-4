import React, { Component } from 'react';
import { Alert, Platform, StyleSheet, Text, View, TouchableHighlight, Image, Dimensions } from 'react-native';
import { Button } from 'react-native-elements'
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import MapView, { Marker, Callout } from 'react-native-maps';
import flagImg from '../images/flag-blue.png';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapScreen extends Component {

    static navigationOptions = {
        title: 'แผนที่',
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


    render() {
        const { region } = this.props;
        console.log(region);

        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    region={{
                        latitude: LATITUDE,
                        longitude: LONGITUDE,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                >
                <Marker
                   coordinate={{
                       latitude: LATITUDE,
                       longitude: LONGITUDE
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
        // height: 400,
        // width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});