import React, { Component } from 'react';
import {
    Platform,
    View, Image, Text, StyleSheet, FlatList
} from 'react-native';
import { ListItem } from 'react-native-elements';

class AppTest2 extends Component {

    list = [
        {
            name: 'Amy Farha',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            subtitle: 'Vice President'
        },
        {
            name: 'Chris Jackson',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            subtitle: 'Vice Chairman'
        },
    ]

    constructor(props) {
        super(props)
        this.state = { dataSource: this.list };
    }


    renderItemOrg = ({ item }) => (
        <ListItem
            title={item.name}
            subtitle={item.subtitle}
            leftAvatar={{
                size: 45,
                rounded: false,
                source: item.avatar_url && { uri: item.avatar_url },
                title: item.name[0]
            }}
        />
    )


    renderItem = ({ item }) => (
        <ListItem
            title={item.name}
            subtitle={item.subtitle}
            leftAvatar={{ source: { uri: item.avatar_url }, size: 45 }}
        />
    )

    render() {
        return (
            <FlatList
                style={{ marginTop: 50 }}
                data={this.state.dataSource}
                renderItem={this.renderItemOrg}
            />
        )
    }
}


export default AppTest2;
