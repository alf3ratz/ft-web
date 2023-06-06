import React, {useEffect, useState} from "react";
import Geocode from "react-geocode";
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";
import "./../recycler/history/ParticipantsPopup.css"

Geocode.setApiKey("AIzaSyAlU7dQOD7g_akB45yegjUIQepuVXmyP2w");
Geocode.setLanguage("ru");
Geocode.setRegion("ru");
Geocode.setLocationType("ROOFTOP");
const MapPopup = props => {
    // const [isError, setIsError] = useState(false);
    // const [isSuccess, setIsSuccess] = useState(false);
    const [currentPosition, setCurrentPosition] = useState({});
    const [selectedPlace, setSelectedPlace] = useState({})

    useEffect(() => {
    });
    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    })
    const mapStyles = {
        height: "100vh",
        width: "100%"
    };
    const onMarkerDragEnd = (e) => {
        // const lat = e.latLng.lat();
        // const lng = e.latLng.lng();
        // setCurrentPosition({lat, lng})
    };
    const onMapClicked = (e) => {
        let latLon = e.latLng
        setSelectedPlace(latLon)
        if (props.placeFrom) {
            props.travelData.placeFrom = e.latLng.toString()
            props.travelData.placeFromCoords = {lat: `${latLon.lat().toString()}`, lon: `${latLon.lng().toString()}`}
            Geocode.fromLatLng(latLon.lat(), latLon.lng()).then(
                (response) => {
                    const address = response.results[0].formatted_address;
                    props.travelData.placeFrom = address
                    localStorage.setItem('coords_from', JSON.stringify({
                        startLat: latLon.lat(),
                        startLon: latLon.lng()
                    }));
                    console.log(address);
                },
                (error) => {
                    console.error(error);
                }
            );
        }
        if (props.placeTo) {
            props.travelData.placeTo = e.latLng.toString()
            props.travelData.placeToCoords = {lat: latLon.lat().toString(), lon: latLon.lng().toString()}
            Geocode.fromLatLng(latLon.lat(), latLon.lng()).then(
                (response) => {
                    const address = response.results[0].formatted_address;
                    props.travelData.placeTo = address
                    localStorage.setItem('coords_to', JSON.stringify({stopLat: latLon.lat(), stopLon: latLon.lng()}));
                    console.log(address);
                },
                (error) => {
                    console.error(error);
                }
            );
        }
    }
    // const toggleErrorPopup = () => {
    //     setIsError(!isError);
    // }
    // const toggleSuccessPopup = () => {
    //     setIsSuccess(!isSuccess)
    // }
    return (
        <div className="participants-popup-box">
            <div className="participants-box">
                <span className="close-icon" onClick={props.handleClose}>x</span>
                <LoadScript
                    googleMapsApiKey='AIzaSyAlU7dQOD7g_akB45yegjUIQepuVXmyP2w'>
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={13}
                        center={currentPosition}
                        onClick={(e) => onMapClicked(e)}>
                        >
                        {
                            currentPosition.lat ?
                                (
                                    <Marker position={currentPosition}
                                            onDragEnd={(e) => onMarkerDragEnd(e)}
                                            draggable={true}/>
                                ) : null
                        }
                        {
                            selectedPlace.lat ?
                                (
                                    <Marker position={selectedPlace}
                                        // onDragEnd={(e) => onMarkerDragEnd(e)}
                                            draggable={false}/>
                                ) : null
                        }
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );
};

export default MapPopup;