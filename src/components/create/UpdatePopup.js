import React, {useEffect, useState} from "react";
import DatePicker from "react-datetime";
import moment from "moment/moment";
import {createTravel, updateTravel} from "../../api/axios";
import {globalPlaceFrom, globalPlaceTo} from "./CreateAd";

const UpdatePopup = props => {

    const [placeFromBtnClicked, setPlaceFromBtnClicked] = useState(false);
    const [placeToBtnClicked, setPlaceToBtnClicked] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isNotValidated, setIsNotValidated] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorData, setErrorData] = useState({
        error: "",
        error_description: "",
    });


    useEffect(() => {
    });
    const success = position => {

    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    })

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
        authorEmail: "aapetropavlovskiy@edu.hse.ru",
        startTime: "",
        placeFrom: "",
        placeTo: "",
        countOfParticipants: "",
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
    }
    const updateAd = () => {
        if(validateValues()){
            toggleValidationPopup();
        }else{
            //updateTravel()
        }
        // if (validateValues()) {
        //     toggleValidationPopup()
        // } else {
        //     console.log(travelData.startTime)
        //     createTravel(travelData.authorEmail,
        //         travelData.placeFrom,
        //         travelData.placeTo,
        //         travelData.startTime,
        //         travelData.countOfParticipants,
        //         travelData.comment)
        //         .then((response) => {
        //             //setUsers(respose.data)
        //             toggleSuccessPopup()
        //         }).catch(function (error) {
        //         if (error.response) {
        //             let jsonString = JSON.stringify(error.response.data)
        //             let errorObj = JSON.parse(jsonString)
        //             setErrorData({...errorData, ...errorObj})
        //             togglePopup()
        //         }
        //     })
        // }
    }
    const clearData = () =>{
        setTravelData({
            authorEmail: "aapetropavlovskiy@edu.hse.ru",
            startTime: "",
            placeFrom: "",
            placeTo: "",
            countOfParticipants: "",
            comment: ""
        })
    }
    return (
        <div className="validation-popup-box">
            <div className="validation-box">
                <span className="close-icon" onClick={props.handleClose}>x</span>
                <div>
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
                            {/*<button type="button" className="button-create" onClick={placeFromBtnClick}>Карта</button>*/}
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
                            {/*<button type="button" className="button-create" onClick={placeToBtnClick}>Карта</button>*/}
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
                            <button type="button-create" onClick={updateAd}>
                                Обновить объявление
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePopup;