import React, { Component  } from 'react'
import { View } from 'react-native'
import {
    Container, 
    TypeTitle,
    TypeDescription,
    TypeImage,
    RequestButton,
    RequestButtonText } from './styles' 

    import uberx from '../../assets/uberx.png';

export default class Details extends Component{
    render(){
        return <Container>
            <TypeTitle>Popular</TypeTitle>
            <TypeDescription>Viagens baratas para p dia a dia</TypeDescription>

            <TypeImage source={uberx}/>
            <TypeTitle>UberX</TypeTitle>
            <TypeDescription>$10,56</TypeDescription>

            <RequestButton onPress={() => {}}>
            <RequestButtonText>SOLICITAR UBER</RequestButtonText>
            </RequestButton>
        </Container>;
    }
}