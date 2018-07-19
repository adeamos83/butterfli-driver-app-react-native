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
                            routes,
                            getDistanceFrom
                            }) => {
    

    const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
    const { pickUp, dropOff} = bookingDetails || {};
    const driver = {latitude: updateWatchDriverLocation.coordinates.coordinates[1], longitude: updateWatchDriverLocation.coordinates.coordinates[0]}
    const dropOffRegion = {
        latitude: updateWatchDriverLocation.coordinates.coordinates[1], 
        longitude: updateWatchDriverLocation.coordinates.coordinates[0],
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta
    }

    console.log(dropOffRegion);

    fitAllMarker = () =>{
        if(this.map !==null){
            this.map.fitToElements(true);
        }
    }

    carMoving = (event) =>{
        getMarkerLocation(event);
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
                initialRegion={dropOffRegion}
            >
            { region &&
                <MapView.Marker 
                    coordinate={{latitude: updateWatchDriverLocation.coordinates.coordinates[1], longitude: updateWatchDriverLocation.coordinates.coordinates[0]}}
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

            {region && 
                <MapView.Marker 
                    draggable
                    coordinate={driver}
                    pinColor="green"
                    onDragEnd={(e) => carMoving(e.nativeEvent.coordinate)}
                />
            }

            { routes &&
                <MapView.Polyline
                    coordinates={[...routes]}
                    strokeColor="#1f73d0"
                    strokeWidth={4}
                />
            }

            </MapView>
            
        </View>
    )
}

export default DropOffMapContainer;