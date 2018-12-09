import React, { Component } from 'react';
import { YellowBox,AsyncStorage,Linking,Alert } from 'react-native';
import axios from 'axios';
console.disableYellowBox = true;
import RNRestart from "react-native-restart";

import Ionicons from 'react-native-vector-icons/Ionicons';


//import {} from 'react-native';

import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator ,NavigationActions } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import NewsScreen from './screens/NewsScreen';
import AboutScreen from './screens/NewscmScreen'; //นิยามเพจ
import MenuScreen from './screens/MenuScreen';
import ActivityScreen from './screens/ActivityScreen';
import ActivityDetailScreen from './screens/ActivityDetailScreen';
import RegisterScreen from './screens/RegisterScreen';
import WebScreen from './screens/WebScreen';
import LoginScreen from './screens/LoginScreen';
import CameraScreen from './screens/CameraScreen';
import Map2Screen from './screens/Map2Screen';
import MapScreen from './screens/MapScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ReportScreen_btn_step_1 from './screens/ReportScreen_btn_step_1';
import ReportScreen_btn_step_2 from './screens/ReportScreen_btn_step_2';
import ReportScreen_create from './screens/ReportScreen_create';
import ReportScreen_createnet from './screens/ReportScreen_createnet';
import ReportScreen_myproblem from './screens/ReportScreen_myproblem';
import ReportScreen_myproblem_detail from './screens/ReportScreen_myproblem_detail';
import Createnewscm from './screens/Createnewscm';
import CreateActivity from './screens/Createactivity';
import NewscmScreen from './screens/NewscmScreen';
import HistoryScreen from './screens/HistoryScreen';
import MediaScreen from './screens/MediaScreen';
import MediaWebScreen from './screens/MediaWebScreen';
import DcomunityScreen from './screens/DcomunityScreen'
import Verifyscreen, { AddProfile, Login2screen } from './screens/verifyscreen'
import Profilescreen, { EditProfilescreen } from './screens/profilescreen';
import createDcomunityScreen from './screens/createDcomunityScreen';
import DALL from './screens/DALL';
import Gooddetail from './screens/gooddetail';
import SelectVerifyOrLogin from './screens/selectscreen ';
import Editnews from './screens/EditNews'
import EditActivity from './screens/EditActivity';
import EditGood from './screens/EditGood';
import Homedetail from './screens/Homedetail';
import Homedetailcm from './screens/Homedetailcm';


const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Register: {
    screen: RegisterScreen
  },
  Login:{
    screen: LoginScreen
  },
  Map:{
    screen: MapScreen
  },
  Map2:{
    screen: Map2Screen
  },
  AddProfile:{
    screen:AddProfile
  },
  Verify:{
    screen:Verifyscreen
  },
  Profile:{
    screen:Profilescreen
  },
  EditProfile:{
    screen:EditProfilescreen
  },
  History:{
    screen:HistoryScreen
  },
  Media:{
    screen:MediaScreen
  },
  MediaWeb:{
    screen:MediaWebScreen
  },
  Login2:{
    screen:Login2screen
  },
  SelectLogin:{
    screen:SelectVerifyOrLogin
  },
  EditGood:{
    screen: EditGood
  },
  Homedetail:{
    screen: Homedetail
  },
  Homedetailcm:{
    screen: Homedetailcm
  }
});
HomeStack.navigationOptions = {
  tabBarLabel: 'หน้าหลัก',
  fontFamily: "Prompt-SemiBold",
}

const ActivityStack = createStackNavigator({
  Activity: {
    screen: ActivityScreen
  },
  ActivityDetail: {
    screen: ActivityDetailScreen
  },
  CreateActivity:{
    screen: CreateActivity
  },
  EditActivity:{
    screen : EditActivity
  }
});
ActivityStack.navigationOptions = {
  tabBarLabel: 'กิจกรรม'
}

const ReportStack = createStackNavigator({
  Report_btn_step_1: {
    screen: ReportScreen_btn_step_1
  },
  Report_btn_step_2: {
    screen: ReportScreen_btn_step_2
  },
  Report_create: {
    screen: ReportScreen_create
  },
  Report_createnet: {
    screen: ReportScreen_createnet
  },
  Report_myproblem: {
    screen: ReportScreen_myproblem
  },
  Report_myproblem_detail: {
    screen: ReportScreen_myproblem_detail
  },
});
ReportStack.navigationOptions = {
  tabBarLabel: 'แจ้งปัญหา'
}

const DALLStack = createStackNavigator({
  Dcomunity:{
    screen : DcomunityScreen,
  },
  DALL:{
    screen : DALL
  },
  createD:{
    screen : createDcomunityScreen
  },
  EditGood:{
    screen: EditGood
  },
  Gooddetail:{
    screen: Gooddetail
  },
  
  
},{
  initialRouteName: 'Dcomunity',
  navigationOptions: {
    title: 'ของดีชุมชน',
    headerStyle: {
      backgroundColor: '#00802b'
    },
    headerTintColor: '#fff',
  
  }
})
DALLStack.navigationOptions = {
  tabBarLabel: 'ของดีชุมชน'
}

const NewsStack = createStackNavigator({
  News: {
    screen: NewsScreen
  },
  Web: {
    screen: WebScreen
  },
  NewsCm:{
    screen: NewscmScreen
  },
  Createnewcm:{
    screen: Createnewscm
  },
  Edit: {
    screen:Editnews
  }
},
  {
    initialRouteName: 'News',
    navigationOptions: {
      title: 'ข่าวสาร',
      headerStyle: {
        backgroundColor: '#00802b'
      },
      headerTintColor: '#fff',
    
    }
  }
);
NewsStack.navigationOptions = {
  fontFamily: "Prompt-SemiBold",
  tabBarLabel: 'ข่าวสาร',
}

const CameraStack = createStackNavigator({
  Camera: {
    screen: CameraScreen
  },
});
CameraStack.navigationOptions = {
  tabBarLabel: 'ถามตอบ'
}

const NotificationsStack = createStackNavigator({
  Notifications: {
    screen: NotificationsScreen
  },
});
NotificationsStack.navigationOptions = {
  tabBarLabel: 'แจ้งเตือน'
}


// tab Navigator
const TabNavigator = createBottomTabNavigator(

  {
    
    Home: HomeStack,
    News: NewsStack,
    Activity: ActivityStack,
    Report: ReportStack,
    // Camera: CameraStack,
    DALL:DALLStack
    // Notifications : NotificationsStack,
  
  },
  
    {
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Home') {
            iconName = `ios-globe${focused ? '' : ''}`;
          } else if (routeName === 'News') {
            iconName = `ios-paper-plane${focused ? '' : ''}`;
          } else if (routeName === "Report") {
            iconName = `ios-megaphone${focused ? '' : ''}`;
            // navigation.reset([NavigationActions.navigate({ routeName: 'Report_btn_step_1'})], 0)
          } else if (routeName === "Activity")
            iconName = `ios-people${focused ? '' : ''}`;
            else if (routeName === "Camera"){
            iconName = `ios-chatboxes${focused ? '' : ''}`;
          } else if (routeName === "Notifications"){
            iconName = `ios-notifications${focused ? '' : ''}`;
          } else if (routeName === "DALL"){
            iconName = `md-thumbs-up${focused ? '' : ''}`;
          }
          
            
          
  
          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
        // tabBarOnPress: (tab, jumpToIndex) => {
        //   // alert(JSON.stringify(tab.navigation.state.routeName));
        //   const routeName = tab.navigation.state.routeName;
        //   if(routeName === 'Home'){
        //     navigation.navigate('Home')
        //     // navigation.reset([NavigationActions.navigate({ routeName: 'Home'})], 0)
        //   }else if(routeName === 'Report'){
        //     // navigation.navigate('Report_btn_step_1')
        //     navigation.reset([NavigationActions.navigate({ routeName: 'Report_btn_step_1'})], 0)
        //   }else if(routeName === 'News'){
        //     navigation.navigate('News')
        //     // navigation.reset([NavigationActions.navigate({ routeName: 'News'})], 0)
        //   }else if(routeName === 'Activity'){
        //     navigation.navigate('Activity')
        //     // navigation.reset([NavigationActions.navigate({ routeName: 'Activity'})], 0)
        //   }else if(routeName === 'Camera'){
        //     navigation.navigate('Camera')
        //     // navigation.reset([NavigationActions.navigate({ routeName: 'Camera'})], 0)
        //   }else if(routeName === 'Notifications'){
        //     // navigation.reset([NavigationActions.navigate({ routeName: 'Notifications'})], 0)
        //   }
        // },
        
      }),
      tabBarOptions: {
        activeTintColor: '#00802b',
        inactiveTintColor: 'gray',
      },
     
    }
  );
  
  const TabNavigatorNoReport = createBottomTabNavigator(
  
    {
      
      Home: HomeStack,
      News: NewsStack,
      Activity: ActivityStack,
      // Report: ReportStack,
      // Camera: CameraStack,
      DALL:DALLStack
      // Notifications : NotificationsStack,
    
    },
    
      {
        navigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Home') {
              iconName = `ios-globe${focused ? '' : ''}`;
            } else if (routeName === 'News') {
              iconName = `ios-paper-plane${focused ? '' : ''}`;
            } else if (routeName === "Report") {
              iconName = `ios-megaphone${focused ? '' : ''}`;
              // navigation.reset([NavigationActions.navigate({ routeName: 'Report_btn_step_1'})], 0)
            } else if (routeName === "Activity")
              iconName = `ios-people${focused ? '' : ''}`;
              else if (routeName === "Camera"){
              iconName = `ios-chatboxes${focused ? '' : ''}`;
            } else if (routeName === "Notifications"){
              iconName = `ios-notifications${focused ? '' : ''}`;
            }else if (routeName === "DALL"){
              iconName = `md-thumbs-up${focused ? '' : ''}`;
            }
              
              
            
    
            // You can return any component that you like here! We usually use an
            // icon component from react-native-vector-icons
            return <Ionicons name={iconName} size={25} color={tintColor} />;
          },
          // tabBarOnPress: (tab, jumpToIndex) => {
          //   // alert(JSON.stringify(tab.navigation.state.routeName));
          //   const routeName = tab.navigation.state.routeName;
          //   if(routeName === 'Home'){
          //     navigation.navigate('Home')
          //     // navigation.reset([NavigationActions.navigate({ routeName: 'Home'})], 0)
          //   }else if(routeName === 'Report'){
          //     // navigation.navigate('Report_btn_step_1')
          //     navigation.reset([NavigationActions.navigate({ routeName: 'Report_btn_step_1'})], 0)
          //   }else if(routeName === 'News'){
          //     navigation.navigate('News')
          //     // navigation.reset([NavigationActions.navigate({ routeName: 'News'})], 0)
          //   }else if(routeName === 'Activity'){
          //     navigation.navigate('Activity')
          //     // navigation.reset([NavigationActions.navigate({ routeName: 'Activity'})], 0)
          //   }else if(routeName === 'Camera'){
          //     navigation.navigate('Camera')
          //     // navigation.reset([NavigationActions.navigate({ routeName: 'Camera'})], 0)
          //   }else if(routeName === 'Notifications'){
          //     // navigation.reset([NavigationActions.navigate({ routeName: 'Notifications'})], 0)
          //   }
          // },
          
        }),
        tabBarOptions: {
          activeTintColor: '#00802b',
          inactiveTintColor: 'gray',
        },
       
      }
    );

//drawer navigator เมนูด้านข้าง
const DrawerNavigator = createDrawerNavigator({
  TabNavigator,
  Menu: MenuScreen,

},
  {
    drawerPosition: "left", // right
    contentComponent: props => <MenuScreen {...props} />
  }
);

export default class App extends Component {
  state={
    type:'',
    checkversion:true,
    Appversoin:2
  }
  gotoUpdate(){
  Linking.openURL('https://play.google.com/store/apps/details?id=com.mobileapptot');
  RNRestart.Restart()
  }
  async checkversion(){
   // alert('เข้า')
   
   const response = await axios.get('http://npcrapi.netpracharat.com/api/checkversion/2');
   // alert(JSON.stringify(response.data.message))
   if(response.data.messageon === true){
     Alert.alert(response.data.message, '', [{ text: 'ตกลง',onPress:()=> RNRestart.Restart()}]);
   }
   if(response.data.data.checkversion != this.state.Appversoin){
     // this.setState({checkversion : false})
     // alert()
     Alert.alert('กรุณาอัพเดทเวอร์ชันเป็นเวอร์ชันล่าสุด', '', [{ text: 'ตกลง',onPress:()=> this.gotoUpdate()}]);
   }
 }
  async checkType(){
   var types = await AsyncStorage.getItem("type");
   types = types.substring(1, types.length - 1);
   await this.setState({ type: types });
 //  alert(this.state.type)
  }
  componentDidMount(){
    this.checkType()
    this.checkversion()
   }
   render() {
     return this.state.type == 'admin' ? <TabNavigator/>:<TabNavigatorNoReport/>
     // return this.state.checkversion ? this.state.type == 'admin' ? <TabNavigator/>:<TabNavigatorNoReport/> : <CheckversionStack/>
     // (this.state.type  ? <TabNavigatorNoReport />:<TabNavigator />)
     
   }
 }

