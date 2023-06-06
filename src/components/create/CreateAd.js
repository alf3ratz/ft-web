import React, {useEffect, useState} from "react";
import {createTravel, isUserAuthor, userEmail} from "../../api/axios";
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import ErrorPopup from "./ErrorPopup";
import ValidationPopup from "./ValidationPopup";
import "./CreateAd.css"
import MapPopup from "../map/MapPopup";

export var globalPlaceFrom = ""
export var globalPlaceTo = ""

const CreateAd = () => {
    // const mapRef = useRef(null);
    const [placeFromBtnClicked, setPlaceFromBtnClicked] = useState(false);
    const [placeToBtnClicked, setPlaceToBtnClicked] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isNotValidated, setIsNotValidated] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorData, setErrorData] = useState({
        error: "",
        error_description: "",
    });
    // const [currentPosition, setCurrentPosition] = useState({});
    // const [direction, setDirection] = useState({})
    // const [placeFrom, setPlaceFrom] = useState({})
    // const [placeTo, setPlaceTo] = useState({})
    // const [selectedPlace, setSelectedPlace] = useState({})

    useEffect(() => {
    });
    const success = position => {
        // const currentPosition = {
        //     lat: position.coords.latitude,
        //     lng: position.coords.longitude
        // }
        //setCurrentPosition(currentPosition);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    })
    // const mapStyles = {
    //     height: "100vh",
    //     width: "100%"
    // };
    //
    // const onMarkerDragEnd = (e) => {
    //     // const lat = e.latLng.lat();
    //     // const lng = e.latLng.lng();
    //     // setCurrentPosition({lat, lng})
    // };
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    const toggleValidationPopup = () => {
        setIsNotValidated(!isNotValidated)
    }
    const toggleSuccessPopup = () => {
        setIsSuccess(!isSuccess)
    }
    const [dt, setDt] = useState(moment());
    const [travelData, setTravelData] = useState({
        authorEmail: JSON.parse(localStorage.getItem('user_info')).email,
        startTime: "",
        placeFrom: "",
        placeTo: "",
        countOfParticipants: "",
        placeFromCoords: {
            lat: "",
            lon: ""
        },
        placeToCoords: {
            lat: "",
            lon: ""
        },
        comment: ""
    });
    const handlePlaceFrom = (event) => {
        const {value} = event.target;
        setTravelData({...travelData, "placeFrom": value});
        globalPlaceFrom = value
    }
    const handlePlaceTo = (event) => {
        const {value} = event.target;
        setTravelData({...travelData, "placeTo": value});
        globalPlaceTo = value
    }
    // const handleStartTime = (event) => {
    //     const {value} = event.target;
    //     setDt(value)
    //     let data = value.toISOString().replace("Z", "")
    //     setTravelData({...travelData, "startTime": data});
    //     console.log(travelData.startTime)
    // }
    const handleParticipants = (event) => {
        const {value} = event.target;
        if (!isNaN(value)) {
            setTravelData({...travelData, "countOfParticipants": Number(value)});
        }
    }
    const handleComment = (event) => {
        const {value} = event.target;
        setTravelData({...travelData, "comment": value});
    }
    const validateValues = () => {
        return isNaN(travelData.countOfParticipants) || travelData.countOfParticipants >= 5 || travelData.countOfParticipants <= 0
            || JSON.parse(localStorage.getItem('user_info')).email === undefined
    }
    const createAd = () => {
        if (validateValues()) {
            toggleValidationPopup()
        } else {
            console.log(travelData)
            createTravel(JSON.parse(localStorage.getItem('user_info')).email,
                travelData.placeFrom,
                travelData.placeTo,
                travelData.startTime,
                travelData.countOfParticipants,
                travelData.placeFromCoords,
                travelData.placeToCoords,
                travelData.comment)
                .then((response) => {
                    //setUsers(respose.data)
                    toggleSuccessPopup()
                }).catch(function (error) {
                if (error.response) {
                    let jsonString = JSON.stringify(error.response.data)
                    let errorObj = JSON.parse(jsonString)
                    setErrorData({...errorData, ...errorObj})
                    togglePopup()
                }
            }).finally(() => {
                localStorage.setItem('is_user_author', JSON.stringify({isAuthor: true}));
            })
        }
    }
    const placeFromBtnClick = () => {
        setPlaceFromBtnClicked(!placeFromBtnClicked)
        console.log(globalPlaceFrom)
    }
    const placeToBtnClick = () => {
        setPlaceToBtnClicked(!placeToBtnClicked)
    }
    const clearData = () => {
        setTravelData({
            authorEmail: JSON.parse(localStorage.getItem('user_info')).email,
            startTime: "",
            placeFrom: "",
            placeTo: "",
            countOfParticipants: "",
            comment: ""
        })
    }

    return (
        <div className="creation">
            <div className="input-container">
                <div>
                    <input
                        id="place-from"
                        placeholder="Введите адрес места начала поездки"
                        name="placeFrom"
                        value={travelData.placeFrom}
                        onChange={handlePlaceFrom}
                        margin="normal"
                    />
                    <button type="button" className="button-create" onClick={placeFromBtnClick}>Карта</button>
                </div>
                <div>
                    <input
                        id="place-to"
                        placeholder="Введите адрес места назначения"
                        name="placeTo"
                        value={travelData.placeTo}
                        onChange={handlePlaceTo}
                        margin="normal"
                    />
                    <button type="button" className="button-create" onClick={placeToBtnClick}>Карта</button>
                </div>
                <input
                    id="participant-count"
                    placeholder="Введите количество участников поездки"
                    name="countOfParticipants"
                    value={travelData.countOfParticipants}
                    onChange={handleParticipants}
                    margin="normal"
                />
                <div className="date-picker-component">
                    <p>Дата и время:</p>
                    <DatePicker
                        value={dt}
                        onChange={val => {
                            setDt(val)
                            let data = val.toISOString().replace("Z", "")
                            setTravelData({...travelData, "startTime": data});
                            console.log(travelData.startTime)
                        }}
                    />
                </div>
                <textarea
                    className="comment-textarea"
                    id="comment"
                    placeholder="Дополнительный комментарий"
                    name="comment"
                    value={travelData.comment}
                    onChange={handleComment}
                    margin="normal"
                    rows="5"
                />
                <div className="create-ad-background-container">
                    <button type="button-create" style={{backgroundColor: "#c41519"}} onClick={clearData}>
                        Отмена
                    </button>
                    <button type="button-create" onClick={createAd}>
                        Создать объявление
                    </button>
                </div>
                {isOpen && <ErrorPopup
                    content={<>
                        <b>{errorData.error_description}</b>
                    </>}
                    handleClose={togglePopup}
                />}
                {isNotValidated && <ValidationPopup
                    content={<>
                        <b>Неправильно введено значение</b>
                    </>}
                    handleClose={toggleValidationPopup}
                />}
                {isSuccess && <ValidationPopup
                    content={<>
                        <b>Вы создали поездку</b>
                    </>}
                    handleClose={toggleSuccessPopup}
                />}
                {
                    placeFromBtnClicked ?
                        <MapPopup
                            placeFrom={true}
                            placeTo={false}
                            travelData={travelData}
                            handleClose={placeFromBtnClick}
                        /> : (placeToBtnClicked ? <MapPopup
                            placeFrom={false}
                            placeTo={true}
                            travelData={travelData}
                            handleClose={placeToBtnClick}
                        /> : null)
                }
            </div>

            {/*<div>*/}
            {/*    <YMaps>*/}
            {/*        <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} instanceRef={mapRef}>*/}
            {/*            <FullscreenControl />*/}
            {/*            <GeolocationControl options={{ float: "left" }} />*/}
            {/*            <RouteButton options={{ float: "left" }}/>*/}
            {/*        </Map>*/}
            {/*    </YMaps>*/}
            {/*</div>*/}
        </div>
    );

}
export default CreateAd;