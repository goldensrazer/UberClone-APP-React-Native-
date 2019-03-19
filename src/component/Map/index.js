import React, { Component,Fragment } from 'react';
import { View,Dimensions,Image } from 'react-native';
import MapView,{ Marker } from 'react-native-maps'; 
import { getPixelSize } from '../../utils'
import Geocoder from "react-native-geocoding";


import Search from '../Search/index'
import Directions from '../Directions/index'
import Details from '../Details/index' 

import  markerImage from'../../assets/marker.png'
import backImage from '../../assets/back.png';
import {LocationBox, LocationText,LocationTextNumber, LocationTimeBox, LocationTimeTextSmall,Back} from './styles'

Geocoder.init("SUA CHAVE API");

const { width, height } = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0143
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO //0.0134

export default class Map extends Component {
    state = {
        destination:null,
        duration:null,
        location:null,
        initialPosition: {
            latitude:0,
            longitude:0,
            latitudeDelta:0,
            longitudeDelta:0
        },
        markerPosition:{
            latitude:0,
            longitude:0
        },
    };
    watchID: ?number = null

   componentDidMount(){
    navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          const response = await Geocoder.from({ latitude, longitude });
          const address = response.results[0].formatted_address;
          const location = address.substring(0, address.indexOf(","));
          this.setState({location})
        }
      );
        navigator.geolocation.getCurrentPosition((position) => {
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)

            var initialRegion = {
                latitude:lat,
                longitude:long,
                latitudeDelta:LATITUDE_DELTA,
                longitudeDelta:LONGITUDE_DELTA
            }
            this.setState({initialPosition:initialRegion})
            this.setState({markerPosition: initialRegion})
        },
        () => {},
        { 
            enableHighAccuracy:true, 
            timeout:2000, 
            maximumAge:1000
        }
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)

            var lastRegion = {
                latitude:lat,
                longitude:long,
                longitudeDelta:LONGITUDE_DELTA,
                latitudeDelta:LATITUDE_DELTA
            }
            this.setState({initialPosition:lastRegion})
            this.setState({markerPosition:lastRegion})
        })
    }

    componentWillUnmount(){
        navigator.geolocation.clearWatch(this.watchID)
    }
    handleLocationSelected = (data, { geometry }) => {
        const {
          location: { lat: latitude, lng: longitude }
        } = geometry;

        this.setState({
          destination: {
            latitude,
            longitude,
            title: data.structured_formatting.main_text
          }
        });
      };
      handleBack = () => {
        this.setState({ destination: null });
      };
    render(){
        const { destination,duration,location } = this.state;
        const region = this.state.initialPosition;
        
        return(
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    region={region}
                    showsUserLocation
                    loadingEnabled
                    ref={el => (this.mapView = el)}
                >
                { destination  &&(
                    <Fragment>
                        <Directions
                            origin={region}
                            destination={destination}
                            onReady={result => {
                                this.setState({ duration: Math.floor(result.duration) });
                                this.mapView.fitToCoordinates(result.coordinates, {
                                edgePadding: {
                                    right: getPixelSize(50),
                                    left: getPixelSize(50),
                                    top: getPixelSize(50),
                                    bottom: getPixelSize(350)
                                }
                                });
                            }}
                        /> 
                        <Marker 
                        coordinate={destination} 
                        anchor={{x: 0, y: 0}} 
                        image={markerImage} >
                        <LocationBox>
                            <LocationText>{destination.title}</LocationText>
                        </LocationBox>
                        </Marker>

                        <Marker 
                        coordinate={region} 
                        anchor={{x: 0, y: 0}}  >
                        <LocationBox>
                            <LocationTimeBox>
                                <LocationTextNumber>{duration}</LocationTextNumber>
                                <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                            </LocationTimeBox>
                            <LocationText>{location}</LocationText>
                        </LocationBox>
                        </Marker>
                    </Fragment>
                )} 
                </MapView>
                {destination ? (
                    <Fragment>
                        <Back onPress={this.handleBack}>
                            <Image source={backImage} />
                        </Back>
                        <Details />
                    </Fragment>
                ) : (
                        <Search onLocationSelected={this.handleLocationSelected} />
                    )}
            </View> 
        );
    }
}