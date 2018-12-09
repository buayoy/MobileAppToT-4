import React, { Component } from 'react';
import { Alert, Platform, StyleSheet, Text, View, TouchableHighlight, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Avatar, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

export default class MenuScreen extends Component {

    static navigationOptions = {
        title: 'เมนูหลัก',
        headerStyle: {
            backgroundColor: '#00802b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    state = {
        profile: {}
    }

    render() {

        AsyncStorage.getItem('profile').then(profile => {
            this.setState({
                profile: JSON.parse(profile)
            });
        });

        return (

            <View style={styles.container}>

                <Text style={{ textAlign: 'center', marginBottom: 10, fontWeight: 'bold', fontSize: 20 }}>เมนูหลัก</Text>

                {
                    this.state.profile ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <Avatar
                                rounded
                                large
                                source={{ uri: this.state.profile.picture }}
                                height={50}
                                width={50}
                            />
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{this.state.profile.nickname}</Text>
                                <Text>{this.state.profile.email}</Text>
                            </View>
                        </View>
                    ) : (
                            <TouchableHighlight
                                onPress={() => {
                                    this.props.navigation.navigate('Login')
                                }}
                                underlayColor="white">
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>
                                        <Icon name="ios-person" size={25} color='white' />  Login
                                    </Text>
                                </View>
                            </TouchableHighlight>
                            
                        )

                }

                <TouchableHighlight
                    onPress={() => {
                        this.props.navigation.closeDrawer();
                    }}
                    underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            <Icon name="ios-home" size={25} color='white' />  หน้าหลัก
                </Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => {
                        this.props.navigation.closeDrawer();
                    }}
                    underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            <Icon name="ios-information-circle" size={25} color='white' />  ข่าวสาร
                </Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => {
                        this.props.navigation.closeDrawer();
                    }}
                    underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            <Icon name="ios-person" size={25} color='white' />  เกี่ยวกับ
                </Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => {
                        this.props.navigation.navigate('Map')
                    }}
                    underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            <Icon name="ios-person" size={25} color='white' />  แผนที่
                </Text>
                    </View>
                </TouchableHighlight>

                {
                    this.state.profile &&
                    <TouchableHighlight
                    onPress={() => {
                        //logout
                        AsyncStorage.removeItem('token');
                        AsyncStorage.removeItem('profile');
                        this.props.navigation.closeDrawer();
                    }}
                    underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            <Icon name="ios-person" size={25} color='white' />  Logout
                </Text>
                    </View>
                </TouchableHighlight>
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30
    },
    button: {
        marginBottom: 30,
        width: 200,
        alignItems: 'center',
        backgroundColor: '#00802b'
    },
    buttonText: {
        padding: 20,
        color: 'white'
    }
});