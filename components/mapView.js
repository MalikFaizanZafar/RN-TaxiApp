import React from 'react';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const MyMapView = (props) => {
    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            region={props.region}
            showsUserLocation={true}
            onRegionChange={(reg) => props.onRegionChange(reg)}>

            <MapView.Marker
                coordinate={props.region} />
        </MapView>
    )
}

export default MyMapView;