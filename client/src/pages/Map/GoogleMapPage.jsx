import React from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const Map = () => {
    return (

        <GoogleMap
            zoom={10}
            center={{ lat: 44, lng: -80 }}
            mapContainerClassName="map-container">
            <Marker position={{ lat: 44, lng: -80 }} />
        </GoogleMap>
    )
}

const MapPage = () => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAxatimjnhdZuXoUrTvVIdNJ67nehZFxtw"
    });

    if(!isLoaded) return <div>Loading..</div>

    return (
        <div><Map /></div>
    )
}



export default MapPage