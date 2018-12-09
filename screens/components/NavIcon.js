import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';

export default class NavIcon extends Component {
    
    render() {
        return (
            <HeaderButtons HeaderButtonComponent={(passMeFurther) => (
            <HeaderButton {...passMeFurther} IconComponent={Icon} iconSize={30} color="white" />)}>
                <Item title="menu" iconName="ios-exit" onPress={this.props.action} />
            </HeaderButtons>
        );
    }
}