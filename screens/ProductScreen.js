import React, { Component } from 'react';
import { Alert, Platform, StyleSheet, Text, View, TouchableHighlight, FlatList, ActivityIndicator } from 'react-native';
import { List, ListItem } from 'react-native-elements'

import axios from 'axios';

export default class ProductScreen extends Component {

    state = {
        data: [],
        loading: true
    }

    static navigationOptions = {
        title: 'สินค้า',
        headerStyle:{
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
        const response = await axios.get('https://codingthailand.com/api/get_courses.php');
        this.setState({
            data: response.data,
            loading: false
        });
        // console.log(response.data)
        // console.log(JSON.stringify(response.data))
        // alert(JSON.stringify(response.data));
    }

    componentDidMount() {
        this.getData();
    }

    _renderItem = ({ item }) => {
        return (
            // <View>
            //     <Text style={{fontSize: 20}}>{ item.c_title }</Text>
            //     <Text>{ item.c_detail }</Text>
            // </View>

            <ListItem
            title={item.c_title}
            subtitle={item.c_detail}
            hideChevron={false}
            onPress = { () => {
                this.props.navigation.navigate('Detail',{
                    id:item.id ,
                    title: item.c_title
                });
            }}
            />
        )
    }

    _onRefresh() {
        this.setState({
            loading: true
        });
        this.getData();
    }

    render() {
        return (
            <View>
                {
                    this.state.loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <List containerStyle={{marginTop: 0}}>
                            <FlatList
                                data={this.state.data}            
                                keyExtractor={ item => item.id }
                                renderItem={this._renderItem}
                                onRefresh={ () => { this._onRefresh() } }
                                refreshing={this.state.loading}
                            />
                        </List>
                    ) 
                }
            </View>  
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'red',
  },
});