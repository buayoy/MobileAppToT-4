import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';

export default class NavIcon extends Component {
    componentDidMount() {
        this.showVerifyData()
      }
    showVerifyData(){
        var users = await AsyncStorage.getItem("user");
        await this.setState({ user: users });
        Alert.alert( this.state.user );
    
        const {checklogin} = this.state.user
        this.props.navigation.setParams({
          checklogin
        })
        // InteractionManager.runAfterInteractions(() => {
        //   this.props.navigation.setParams({ checklogin: this.state.user });
        // });
        //เรียกเพื่อไปใช้ใน navigationOptions  = ({navigation})
        this.setState({checklogin: checklogin})
        this.props.navigation.setParams({
          user: this.state.user
        });
      }
    render() {
        return (
            <HeaderButtons HeaderButtonComponent={(passMeFurther) => (
            <HeaderButton {...passMeFurther} IconComponent={Icon} iconSize={30} color="white" />)}>
                <Item  title="register" 
                iconName= {params.user != null ? 'ios-person' : 'ios-person-add'}
                onPress={this.props.action} />
            </HeaderButtons>
        );
    }
}
