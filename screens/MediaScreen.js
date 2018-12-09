import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight, ActivityIndicator, FlatList, Image, ScrollView } from 'react-native';

import axios from 'axios';
import { List, ListItem, SearchBar } from 'react-native-elements'
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import Logo from '../components/logo/index';

import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';

const IoniconsHeaderButton = passMeFurther => (
    <HeaderButton {...passMeFurther} IconComponent={Ionicons} iconSize={30} color="white" />

);


export default class MediaScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            dataob: [],
            loading: true,
            customStyleIndex: 0,
        }
        this.arrayholder = []
    }

    handleCustomIndexSelect = (index) => {
        this.setState({
            ...this.state,
            customStyleIndex: index,
        });
    }

    static navigationOptions = {
        title: 'สื่อการเรียนรู้',
        headerStyle: {
            backgroundColor: '#00802b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            flex: 1
        },
    };

    makeRemoteRequest = () => {
        const url = `http://npcrapi.netpracharat.com/api/media/digital`;
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

    makeRemoteRequestob = () => {
        const url = `http://npcrapi.netpracharat.com/api/media/obrom`;
        this.setState({ loading: true });
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    dataob: res.data,
                    error: res.error || null,
                    loading: false,
                });
                this.arrayholder = res.data;
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    };

    componentDidMount() {
        this.makeRemoteRequest();
        this.makeRemoteRequestob();
    }

    searchFilterFunction = text => {
        //alert(text);
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.medianame.toUpperCase()}`;
            const textData = text.toUpperCase();
            let a = itemData.indexOf(textData) > -1;
            return itemData.indexOf(textData) > -1;

        });
        this.setState({ data: newData });
    };

    searchFilterFunctionob = text => {
        //alert(text);
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.medianame.toUpperCase()}`;
            const textData = text.toUpperCase();
            let a = itemData.indexOf(textData) > -1;
            return itemData.indexOf(textData) > -1;

        });
        this.setState({ dataob: newData });
    };


    _renderItem = ({ item }) => {

        return (

            <ListItem
                title={item.medianame}
                // subtitle={item.mediadetail}
                hideChevron={false}
                onPress={() => {
                    this.props.navigation.navigate('MediaWeb', {
                        id: item.id,
                        title: item.medianame
                    });
                }}
            />
        )
    }

    _renderItemob = ({ item }) => {

        return (

            <ListItem
                title={item.medianame}
                hideChevron={false}
                onPress={() => {
                    this.props.navigation.navigate('MediaWeb', {
                        id: item.id,
                        title: item.medianame
                    });
                }}
            />
        )
    }

    _onRefresh = () => {
        this.setState({
            loading: true
        });
        this.makeRemoteRequest();
    }

    renderSeparator = () => {
        return (
            <View style={{ height: 1, width: '100%', backgroundColor: 'black' }}>
            </View>
        )
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

    renderHeaderob = () => {
        return (
            <SearchBar
                lightTheme
                round
                clearIcon={{ color: 'grey' }}
                onChangeText={text => this.searchFilterFunctionob(text)}
                autoCorrect={false}
                showLoading
                platform="android"
                // onChangeText={this.filterSearch(text)}
                cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                placeholder='Search' />
        )
    }

    render() {
        return (
            <View>
                <SegmentedControlTab
                    values={['สื่อการเรียนรู้ดิจิทัล', 'คู่มือประกอบการอบรม']}
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
                        <View>
                            {
                                this.state.loading ? (
                                    <ActivityIndicator size="large" color="#0000ff" />
                                ) : (
                                        <List containerStyle={{ marginTop: 0 }}>
                                            <FlatList
                                                data={this.state.data}
                                                renderItem={this._renderItem}
                                                onRefresh={this._onRefresh}
                                                refreshing={this.state.loading}
                                                ListHeaderComponent={this.renderHeader}
                                            />
                                        </List>


                                    )
                            }
                            <Text style={{ marginTop: 30 }}></Text>
                        </View>
                    </ScrollView>

                }

                {this.state.customStyleIndex === 1 &&
                    <List containerStyle={{ marginTop: 0 }}>
                        <FlatList
                            data={this.state.dataob}
                            renderItem={this._renderItemob}
                            onRefresh={this._onRefresh}
                            refreshing={this.state.loading}
                            ListHeaderComponent={this.renderHeaderob}
                        />
                    </List>
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
