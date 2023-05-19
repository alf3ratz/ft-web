import {Component, useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import React from "react";
import {DirectionsRenderer, DirectionsService, GoogleMap, InfoWindow, LoadScript, Marker} from "@react-google-maps/api";

const MapComponent = () => {
    let directionsService;
    const [currentPosition, setCurrentPosition] = useState({});
    const [direction, setDirection] = useState({})
    const [placeFrom, setPlaceFrom] = useState({
        // lat: '',
        // lng: ''
    })
    const [placeTo, setPlaceTo] = useState({
        // lat: '',
        // lng: ''
    })

    useEffect(() => {
        // directionsService =  window.google.maps.DirectionsService();
        // directionsService.route(
        //     {
        //         origin: placeFrom,
        //         destination: placeTo
        //     },
        //     (result, status) => {
        //         if (status === window.google.maps.DirectionsStatus.OK) {
        //             //changing the state of directions to the result of direction service
        //             setDirection(result)
        //         } else {
        //             console.error(`error fetching directions ${result}`);
        //         }
        //     }
        // );
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

    const defaultCenter = {
        lat: 41.3851, lng: 2.1734
    }
    const onMarkerDragEnd = (e) => {
        // const lat = e.latLng.lat();
        // const lng = e.latLng.lng();
        // setCurrentPosition({lat, lng})
    };
    const onMapClicked = (e) => {
        let latLon = e.latLng
        if( placeFrom.lat === undefined){
            setPlaceFrom(latLon)
        }else{
            if(placeTo.lat === undefined){
                setPlaceTo(latLon)
            }
        }
        console.log(`lati: ${latLon.lat()}`)
        console.log(`long: ${latLon.lng()}`)
    }
    return (<div>
            <div>
                <h></h>
            </div>
            <div>
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
                            placeFrom.lat ?
                                (
                                    <Marker position={placeFrom}
                                            // onDragEnd={(e) => onMarkerDragEnd(e)}
                                            draggable={false}/>
                                ) : null
                        }
                        {
                            placeTo.lat ?
                                (
                                    <Marker position={placeTo}
                                            // onDragEnd={(e) => onMarkerDragEnd(e)}
                                            draggable={false}/>
                                ) : null
                        }
                        {direction !== null && (
                            <DirectionsRenderer directions={direction} />
                        )}
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    )
    // return (
    //     <>
    {/*<LoadScript*/
    }
    {/*    id="script-loader"*/
    }
    {/*    googleMapsApiKey='AIzaSyAlU7dQOD7g_akB45yegjUIQepuVXmyP2w'*/
    }
    {/*>*/
    }
    {/*    <GoogleMap*/
    }
    {/*        id='example-map'*/
    }
    {/*        mapContainerStyle={mapStyles()}*/
    }
    {/*        draggable={true}*/
    }
    {/*        zoom={13}*/
    }
    {/*        center={currentPosition.lat ? currentPosition : defaultCenter}*/
    }
    {/*    >*/
    }
    {/*        {*/
    }
    {/*            // array ?*/
    }
    {/*            //     array.map(item => {*/
    }
    {/*            //         return (*/
    }
    {/*            //             <Marker*/
    }
    {/*            //                 key={item.id}*/
    }
    {/*            //                 position={item.location}*/
    }
    {/*            //                 onClick={() => onSelect(item)}*/
    }
    {/*            //             />*/
    }
    {/*            //         )*/
    }
    {/*            //     }) : null*/
    }
    {/*        }*/
    }
    {/*        {*/
    }
    {/*            isAdding ?*/
    }
    {/*                <Marker*/
    }
    {/*                    position={currentPosition}*/
    }
    {/*                    ref={() => markerRef}*/
    }
    {/*                    onDragEnd={(e) => onMarkerDragEnd(e)}*/
    }
    {/*                    draggable={true}/> :*/
    }
    {/*                null*/
    }
    {/*        }*/
    }
    {/*        {*/
    }
    {/*            selected.location ?*/
    }
    {/*                (*/
    }
    {/*                    <InfoWindow*/
    }
    {/*                        position={selected.location}*/
    }
    {/*                        onCloseClick={() => setSelected({})}*/
    }
    {/*                    >*/
    }
    {/*                        <div className="infowindow">*/
    }
    {/*                            <p>{selected.title}</p>*/
    }
    {/*                            <img src={selected.image} className="small-image" alt="rental"/>*/
    }
    {/*                            <p>price: {selected.price}</p>*/
    }
    {/*                            <p>sqm2: {selected.sqm}</p>*/
    }
    {/*                            <p>bedrooms: {selected.bedrooms}</p>*/
    }
    {/*                        </div>*/
    }
    {/*                    </InfoWindow>*/
    }
    {/*                ) : null*/
    }
    {/*        }*/
    }
    {/*    </GoogleMap>*/
    }
    {/*</LoadScript>*/
    }
    //     // </>
    // )

    // // const ref = useRef(null);
    // // const [map, setMap] = useState();
    // //
    // // useEffect(() => {
    // //     if (ref.current && !map) {
    // //         setMap(new window.google.maps.Map(ref.current, {}));
    // //     }
    // // }, [ref, map]);
    // const mapStyles = {
    //     height: "100vh",
    //     width: "100%"
    // };
    //
    // const defaultCenter = {
    //     lat: 41.3851, lng: 2.1734
    // }
    // const [currentPosition, setCurrentPosition] = useState({});
    //
    // const success = position => {
    //     const currentPosition = {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude
    //     }
    //     setCurrentPosition(currentPosition);
    // };
    //
    // useEffect(() => {
    //     navigator.geolocation.getCurrentPosition(success);
    // })
    // return (
    //     <LoadScript
    //         googleMapsApiKey='AIzaSyAlU7dQOD7g_akB45yegjUIQepuVXmyP2w'>
    //         <GoogleMap
    //             mapContainerStyle={mapStyles}
    //             zoom={13}
    //             center={defaultCenter}
    //         >
    //             {
    //                 currentPosition.lat &&
    //                 (
    //                     <Marker position={currentPosition}/>
    //                 )
    //             }
    //         </GoogleMap>
    //     </LoadScript>
    // )
    //
    // return (<div>
    {/*<YMaps>*/
    }
    {/*    <div>My awesome application with maps!</div>*/
    }
    {/*    <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} />*/
    }
    {/*</YMaps>*/
    }
    {/*<script async defer*/
    }
    {/*        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAHhgcNLGgNSSEW1MMhEPnBLGQwCLZXI7I&callback=initMap"></script>*/
    }
    {/*<Wrapper apiKey={"AIzaSyAHhgcNLGgNSSEW1MMhEPnBLGQwCLZXI7I"} render={render}>*/
    }
    {/*    <Map center={center} zoom={zoom}>*/
    }
    {/*        <Marker position={position}/>*/
    }
    {/*    </Map>*/
    }
    {/*</Wrapper>*/
    }
    {/*<Map*/
    }
    {/*    google={this.props.google}*/
    }
    {/*    zoom={8}*/
    }
    {/*    style={mapStyles}*/
    }
    {/*    initialCenter={{ lat: 47.444, lng: -122.176}}*/
    }
    {/*/>*/
    }
    {/*</div>)*/
    }

    //AIzaSyAHhgcNLGgNSSEW1MMhEPnBLGQwCLZXI7I
}

export default MapComponent;