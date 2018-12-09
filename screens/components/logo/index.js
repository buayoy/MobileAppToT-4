//import liraries
import React, { Component } from 'react';
import { Image } from 'react-native';

// create a component
const Logo = () => {
    return (
        <Image 
        source={require('../../img/Logo2.png')}
        style={{width :35 ,height:35 , flex:1}}
        resizeMode='contain'
        />
    );
};

// define your styles

//make this component available to the app
export default Logo;
