import React, { Component } from 'react';
import { Alert, Platform, StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import Moment from 'react-moment';
import { Avatar } from 'react-native-elements';
import axios from 'axios';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import ResponsiveImage from 'react-native-responsive-image';


export default class ReportScreen_myproblem_detail extends Component {

    state = {
        data: [],
        images: [],
        reply: [],
    }

    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('title', ''),
        headerStyle: {
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
        const response = await axios.get('http://npcrapi.netpracharat.com/api/problem/detail/' + id);
        const responsereplyImage = await axios.get('http://npcrapi.netpracharat.com/api/problem/detail/images/' + id);
        const responsereply = await axios.get('http://npcrapi.netpracharat.com/api/subproblem/reply/' + id);

        this.setState({ data: response.data });
        this.setState({ images: responsereplyImage.data });
        this.setState({ reply: responsereply.data });

        // alert(JSON.stringify(this.state.images.filename));
    }

    componentDidMount() {
        const id = this.props.navigation.getParam('id', 0);
        this.getData(id);
    }

    _renderItem = ({ item }) => {
        // let urlToImage = (item.state.images.filename !== null) ? 'http://npcrimage.netpracharat.com/imageproblems/' + this.state.images.filename : <Text></Text>;
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', marginLeft: 40, margin: 10, padding: 10 }}>
                    <Avatar
                        rounded

                        size="small"
                        source={require('../images/admin.png')}
                        height={50}
                        width={50}
                        style={{ marginRight: 5 }}
                    />
                    <View style={{ margin: 15, marginTop: 0, width: 250, alignSelf: 'center' }}>
                        <Text style={{ fontSize: 18, marginBottom: 5, color: 'red' }}>admin : เน็ตประชารัฐ</Text>
                        <Text style={{ fontSize: 14, marginBottom: 5 }} >วันที่/เวลา : {item.created_at}น.</Text>
                        <Text style={{ fontSize: 16, marginTop: 25, marginBottom: 5, marginLeft: -55, marginRight: 10 }} >
                            {item.subproblemdetail}
                        </Text>
                        {/* <ResponsiveImage source={{ uri: urlToImage }} resizeMode='stretch' style={styles.newspic} /> */}
                    </View>
                </View>
                <View style={styles.lineStylew3} />
            </View>

        )
    }


    render() {
        let urlToImage = (this.state.images.filename !== null) ? 'http://npcrimage.netpracharat.com/imageproblems/' + this.state.images.filename : <Text></Text>;

        return (
            <View style={styles.container}>
                <ScrollView Vertical={true}>
                    <View style={{ flexDirection: 'row', margin: 10, padding: 10 }}>
                        <Avatar
                            rounded
                            size="small"
                            source={require('../images/logo.png')}
                            height={50}
                            width={50}
                            style={{ marginRight: 5 }}
                        />
                        <View style={{ margin: 15, marginTop: 0, width: 250, alignSelf: 'center' }}>
                            <Text style={{ fontSize: 18, marginBottom: 5 }}>{this.state.data.problemname}</Text>
                            <Text style={{ fontSize: 14, marginBottom: 5 }} >วันที่/เวลา : {this.state.data.created_at}น.</Text>
                            <Text style={{ fontSize: 14, marginBottom: 20 }} >สถานที่ : จ.{this.state.data.province} หมู่บ้าน {this.state.data.village}</Text>
                            <Text style={{ fontSize: 16, marginBottom: 5, marginLeft: -55, marginRight: -20 }} >
                                {this.state.data.problemdetail}
                            </Text>
                            <ResponsiveImage source={{ uri: urlToImage }} resizeMode='stretch' style={styles.newspic} />
                        </View>
                    </View>
                    <View style={styles.lineStylew3} />
                    <View>
                        <FlatList
                            showsVerticalScrollIndicator={true}
                            data={this.state.reply}
                            renderItem={this._renderItem}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    lineStylew3: {
        // flexDirection: 'row',
        borderWidth: 0.2,
        borderColor: 'gray',
        backgroundColor: 'gray',
        // marginTop: 100,  
        alignSelf: 'center',
        width: '90%',
    },
    newspic: {
        marginLeft: -55,
        width: wp('35%'),
        height: hp('15%'),
        marginRight: 10
    },
});