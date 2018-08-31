import React from "react";
import { View } from "native-base";
import MapView from "react-native-maps";

import styles from "./MapContainerStyles.js"

export const MapContainer = ({
                            region, 
                            carMarker,
                            getMarkerLocation,
                            watchDriverLocation
                            }) => {
    

    const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
    
    return(
        <View style={styles.container}>
            <MapView
                ref={ref => { this.map = ref; }}
                provider={MapView.PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={region}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >
            { region &&
                <MapView.Marker 
                    coordinate={{latitude: watchDriverLocation.coords.latitude, longitude: watchDriverLocation.coords.longitude}}
                    image={carMarker}
                />
            }

            {region && 
                <MapView.Marker 
                    draggable
                    coordinate={{latitude: region.latitude, longitude: region.longitude}}
                    pinColor="green"
                    onDragEnd={(e) => getMarkerLocation(e.nativeEvent.coordinate)}
                />
            }
            </MapView>
            
        </View>
    )
}

export default MapContainer;