import React from "react";
import { View } from "native-base";
import MapView from "react-native-maps";

import styles from "./DropOffMapContainerStyles";

export const DropOffMapContainer = ({
                            region, 
                            carMarker,
                            getMarkerLocation,
                            bookingDetails,
                            updateWatchDriverLocation,
                            watchDriverLocation,
                            getDropOffDistance,
                            getDistanceFrom,
                            dropOffRoutes
                            }) => {
    

    const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
    const { dropOff} = bookingDetails || {};
    // const driver = {latitude: updateWatchDriverLocation.coordinates.coordinates[1], longitude: updateWatchDriverLocation.coordinates.coordinates[0]}
    // const {latitude, longitude } = watchDriverLocation.coords || "";
    const driver = {latitude: watchDriverLocation.coords.latitude, longitude: watchDriverLocation.coords.longitude}
    const dropOffRegion = {
        latitude: watchDriverLocation.coords.latitude, 
        longitude: watchDriverLocation.coords.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta
    }
    
    fitAllMarker = () =>{
        if(this.map !==null && this.map !== undefined){
            this.map.fitToElements(true);
        }
    }

    carMoving = (event) =>{
        getMarkerLocation(event);
        getDropOffDistance();
        setTimeout(function(){
            getDistanceFrom();
        }, 5000)
    }

    return(
        <View style={styles.container}>
            <MapView
                ref={ref => { this.map = ref; }}
                provider={MapView.PROVIDER_GOOGLE}
                style={styles.map}
                region={dropOffRegion}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >
            { region &&
                <MapView.Marker 
                    coordinate={{latitude: watchDriverLocation.coords.latitude, longitude: watchDriverLocation.coords.longitude}}
                    image={carMarker}
                />
            }

            {
                dropOff &&
                this.fitAllMarker()
            }

            { dropOff && 
                <MapView.Marker 
                    coordinate={{latitude: parseFloat(dropOff.latitude), longitude: parseFloat(dropOff.longitude)}}
                    pinColor="blue"
                />
            }    
            
             {/*
                {region && 
                    <MapView.Marker 
                        draggable
                        coordinate={driver}
                        pinColor="green"
                        onDragEnd={(e) => carMoving(e.nativeEvent.coordinate)}
                    />
                }
            */}
            {region && 
                <MapView.Marker 
                    draggable
                    coordinate={driver}
                    pinColor="green"
                    onDragEnd={(e) => carMoving(e.nativeEvent.coordinate)}
                />
            }
            { dropOffRoutes &&
                <MapView.Polyline
                    coordinates={[...dropOffRoutes]}
                    strokeColor="#1f73d0"
                    strokeWidth={4}
                />
            }

            </MapView>
            
        </View>
    )
}

export default DropOffMapContainer;