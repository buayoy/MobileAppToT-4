import React, { Component } from 'react';
import { Alert, Platform, StyleSheet, Text, View, TouchableHighlight, ScrollView } from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import HTML from 'react-native-render-html';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

export default class HistoryScreen extends Component {

    static navigationOptions = {
        title: 'ความเป็นมา',
        headerStyle: {
            backgroundColor: '#00802b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            // textAlign: 'center',
            flex: 1
        },
    };


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }} >
                <ScrollView>
                    <ResponsiveImage resizeMode='stretch' style={{ width: wp('100%'), height: hp('30%') }} source={require('../images/header.png')} />

                    <Text style={{ marginTop: hp('2%'), color: 'green', textAlign: 'center', fontFamily: "Prompt-Medium" }}>หมู่บ้านในพื้นที่ห่างไกลยังไม่มีโอกาสเข้าถึงบริการของภาครัฐ</Text>
                    <Text style={{ margin: hp('2%'), textAlign: 'center', fontFamily: "Prompt-Light" }}>หมู่บ้านเป้าหมาย หมายถึง หมู่บ้านหรือพื้นที่เป้าหมาย หรือ ชุมนเป้าหมาย ที่อยู่ในพื้นที่ที่การให้บริการโทรคมนาคมพื้นฐานยังไม่ทั่วถึง และคาดหมายได้ว่าในพื้นที่ดังกล่าวจะไม่มีศักยภาพตลาดและปัจจัยแวดล้อมในปัจจุบัน หรือเรียกว่า “พื้นที่ที่ไม่มีศักยภาพเชิงพาณิชย์และไม่มีการ” ภายใต้เงื่อนไข “ต้องสามารถตอบสนองนโยบายรัฐบาลที่ต้องการให้คุณสมบัติ ความเร็วอินเตอร์เน็ตความเร็วสูงที่ 30 Mbps/10 Mbps” ซึ่งพื้นที่การดำเนินการได้ถูกกำหนดโดยคณะทำงานพิจารณากำหนดพื้นที่เป้าหมายใต้โครงการยกระดับโครงสร้างพื้นฐานโทรคมนาคมเพื่อขับเคลื่อนเศรษฐกิจของประเทศ
                    </Text>
                    <ResponsiveImage resizeMode='stretch' style={{ width: wp('100%'), height: hp('35%') }} source={require('../images/abt-fig1.png')} />

                    <Text style={{ marginTop: hp('2%'), color: 'green', textAlign: 'center', fontFamily: "Prompt-Medium" }}>รัฐบาลมีนโยบายที่จะนำพาประเทศไทยก้าวสู่ “ไทยแลนด์ 4.0” ด้วยการนำเทคโนโลยีดิจิทัล</Text>
                    <Text style={{ margin: hp('2%'), textAlign: 'center', fontFamily: "Prompt-Light" }}>รัฐบาล (โดยการนำของพลเอกประยุทธ์ จันทร์โอชา นายกรัฐมนตรี) ได้มีนโยบายที่จะนำพาประเทศไทยก้าวสู่ “ไทยแลนด์ 4.0” ด้วยการนำเทคโนโลยีดิจิทัลเข้ามามีบทบาทสำคัญในการขับเคลื่อนเศรษฐกิจและสังคม เพื่อส่งเสริมเศรษฐกิจฐานรากของประเทศให้เข้มแข็ง และเพิ่มขีดความสามารถในการแข่งขันในเวทีโลก ประกอบกับ กรอบยุทธศาสตร์ชาติ 20 ปี แผนพัฒนาเศรษฐกิจและสังคมแห่งชาติ ฉบับที่ 12 และแผนพัฒนาดิจิทัลเพื่อเศรษฐกิจ
                    </Text>
                    <ResponsiveImage resizeMode='stretch' style={{ width: wp('100%'), height: hp('35%') }} source={require('../images/abt-fig2.png')} />

                </ScrollView>
            </View>
        );
    }
}