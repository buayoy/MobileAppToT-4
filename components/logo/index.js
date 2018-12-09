import React, {Component} from 'react';
import { Image } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const Logo =() => {
    return (
        <Image
        source ={ require('../../images/Logo2.png')}
        style={{ width: 50 , height: 50, flex: 1}}
        resizeMode = 'contain'
        />
    );
}

export default Logo;
