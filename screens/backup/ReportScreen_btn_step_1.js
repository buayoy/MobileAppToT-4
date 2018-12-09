import React, { Component } from 'react';
import { Alert, Platform, StyleSheet, Text, View, TouchableHighlight, Button } from 'react-native';
import Iion from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements';

import Logo from '../components/logo';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

const width = '100%';

export default class ReportScreen_btn_step_1 extends Component {

    static navigationOptions = {
        headerTitle: <Logo />,
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
        const sizelogo = wp('20%');

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}><Iion name="ios-megaphone" size={40} color='#00802b' />  แจ้งปัญหา</Text>
                <View style={styles.lineStylew1} />
                <View style={styles.lineStylew2} />
                <Text style={styles.setpositiontextafterbutton}>ขั้นตอนที่ 1</Text>
                <View style={styles.setpositionbutton}>
                    <TouchableHighlight
                        onPress={() => {
                            this.props.navigation.navigate("Report_btn_step_2");
                        }}
                        underlayColor="white">
                        <View >
                            <Icon
                                raised
                                type='ionicon'
                                color='white'
                                containerStyle={{ backgroundColor: '#00802b' }}
                                name="ios-megaphone"
                                size={sizelogo} />
                            <Text style={styles.setpositiontextbeforebutton}>
                                แจ้งปัญหา
                            </Text>
                        </View>
                    </TouchableHighlight>

                    <View style={styles.lineStyleh} />
                    <TouchableHighlight
                        onPress={() => {
                            this.props.navigation.navigate("Report_myproblem");
                        }}
                        underlayColor="white">
                        <View >
                            <Icon
                                raised
                                color='white'
                                type='ionicon'
                                containerStyle={{ backgroundColor: '#00802b' }}
                                name="ios-archive" size={sizelogo} color='white' />
                            <Text style={styles.setpositiontextbeforebutton}>
                                ปัญหาของฉัน
                            </Text>
                        </View>
                    </TouchableHighlight>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 15,
        marginBottom: -20,
        color: '#00802b',
    },
    setpositionbutton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -100,
        justifyContent: 'center',
    },
    setpositiontextafterbutton: {
        flex: .2,
        flexDirection: 'row',
        fontSize: hp('4%'),
        textAlign: 'center',
        marginTop: hp('10%'),
        marginBottom: hp('10%'),
        color: '#00802b',
    },
    setpositiontextbeforebutton: {
        flexDirection: 'row',
        fontSize: wp('5%'),
        textAlign: 'center',
        margin: hp('2%'),
        marginLeft: 0,
        marginRight: 0,
        color: '#00802b',
    },
    lineStyleh: {
        borderWidth: 0.5,
        borderColor: '#9B9B9B',
        margin: 15,
        marginTop: hp('0%'),
        height: hp('32%')
    },
    lineStylew1: {
        borderWidth: 1,
        borderColor: '#00802b',
        backgroundColor: '#00802b',
        marginTop: 40,
        width,
    },
    lineStylew2: {
        borderWidth: 2,
        borderColor: '#00802b',
        backgroundColor: '#00802b',
        marginTop: 3,
        width,
    },
    button: {
        margin: hp('1%'),
        marginTop: -hp('5%'),
        height: hp('24%'),
        width: hp('24%'),
        // height: 160,
        // width: 160,
        alignItems: 'center',
        backgroundColor: '#00802b',
        borderRadius: hp('24%') / 2,
        // borderRadius: 80,
    },
    buttonText: {
        padding: hp('6%'),
        color: 'white'
    }
});