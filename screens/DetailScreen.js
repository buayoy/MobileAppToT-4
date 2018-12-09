import React, { Component } from 'react';
import { Alert, Platform, StyleSheet, Text, View, TouchableHighlight, ScrollView } from 'react-native';
import { Card, ListItem, Button, } from 'react-native-elements'
import axios from 'axios';



export default class DetailScreen extends Component {

    state = {
        data: []
    }

    static navigationOptions = ({navigation}) =>  ({
        title: navigation.getParam('title' , ''),
        headerStyle:{
            backgroundColor: '#00802b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            // textAlign: 'center',
            flex: 1
        },
        
    });
    

    async getData(id) {
        const response = await axios.get('https://codingthailand.com/api/get_course_detail.php',{
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

        <View style={styles.container}>
          <ScrollView>
            <Card containerStyle={{padding: 0}} >
            {
                this.state.data.map((u, i) => {
                return (
                    <ListItem
                    key={i}
                    title={u.ch_title}
                    />
                );
                })
            }
            </Card>
          </ScrollView>
        </View>
        );
    }
    }

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'red',
  },
});