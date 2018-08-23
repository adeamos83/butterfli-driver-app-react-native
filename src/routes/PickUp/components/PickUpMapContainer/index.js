import React from "react";
import { View } from "native-base";
import MapView from "react-native-maps";

import styles from "./PickUpMapContainerStyles"

export const PickUpMapContainer = ({
                            region, 
                            carMarker,
                            getMarkerLocation,
                            bookingDetails,
                            updateWatchDriverLocation,
                            routes,
                            getDistanceFrom,
                            pickUpRoutes
                            }) => {
    

    const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
    const { pickUp, dropOff} = bookingDetails || {};
    const driver = {latitude: updateWatchDriverLocation.coordinates.coordinates[1], longitude: updateWatchDriverLocation.coordinates.coordinates[0]}
    
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
                initialRegion={region}
            >
            { region &&
                <MapView.Marker 
                    coordinate={{latitude: updateWatchDriverLocation.coordinates.coordinates[1], longitude: updateWatchDriverLocation.coordinates.coordinates[0]}}
                    image={carMarker}
                />
            }

            {
                pickUp &&
                this.fitAllMarker()
            }

            { pickUp && 
                <MapView.Marker 
                    coordinate={{latitude: parseFloat(pickUp.latitude), longitude: parseFloat(pickUp.longitude)}}
                    pinColor="green"
                />
            }

            {region && 
                <MapView.Marker 
                    draggable
                    coordinate={{latitude: region.latitude, longitude: region.longitude}}
                    pinColor="green"
                    onDragEnd={(e) => carMoving(e.nativeEvent.coordinate)}
                />
            }

            { pickUpRoutes &&
                <MapView.Polyline
                    coordinates={[...pickUpRoutes]}
                    strokeColor="#1f73d0"
                    strokeWidth={4}
                />
            }

            </MapView>
            
        </View>
    )
}

export default PickUpMapContainer;