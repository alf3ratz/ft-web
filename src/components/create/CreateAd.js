import React, {useState} from "react";
import {createTravel} from "../../api/axios";
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import ErrorPopup from "./ErrorPopup";
import ValidationPopup from "./ValidationPopup";
import "./CreateAd.css"

const CreateAd = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isNotValidated, setIsNotValidated] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorData, setErrorData] = useState({
        error: "",
        error_description: "",
    });

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
    const [errorMessage, setErrorMessage] = useState("");
    const [travelData, setTravelData] = useState({
        authorEmail: "aapetropavlovskiy@edu.hse.ru",
        startTime: "",
        placeFrom: "",
        placeTo: "",
        countOfParticipants: 0,
        comment: ""
    });
    const handlePlaceFrom = (event) => {
        const {value} = event.target;
        setTravelData({...travelData, "placeFrom": value});
    }
    const handlePlaceTo = (event) => {
        const {value} = event.target;
        setTravelData({...travelData, "placeTo": value});
    }
    const handleStartTime = (event) => {
        const {value} = event.target;
        setDt(value)
        let data = value.toISOString().replace("Z", "")
        setTravelData({...travelData, "startTime": data});
        console.log(travelData.startTime)
    }
    const handleParticipants = (event) => {
        const {value} = event.target;
        setTravelData({...travelData, "countOfParticipants": Number(value)});
    }
    const handleComment = (event) => {
        const {value} = event.target;
        setTravelData({...travelData, "comment": value});
    }
    const validateValues = () => {
        return isNaN(travelData.countOfParticipants) || travelData.countOfParticipants >= 5 || travelData.countOfParticipants <= 0
    }
    const createAd = () => {
        if (validateValues()) {
            toggleValidationPopup()
        } else {
            //setTravelData({...travelData, "startTime": dt.toISOString().replace("Z", "")});
            console.log(travelData.startTime)
            createTravel(travelData.authorEmail,
                travelData.placeFrom,
                travelData.placeTo,
                travelData.startTime,
                travelData.countOfParticipants,
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
            })
        }
    }
    return (
        <div className="creation">
            <div className="input-container">
                <input
                    id="place-from"
                    placeholder="Введите адрес места начала поездки"
                    name="placeFrom"
                    value={travelData.placeFrom}
                    onChange={handlePlaceFrom}
                    margin="normal"
                />
                <input
                    id="place-to"
                    placeholder="Введите адрес места назначения"
                    name="placeTo"
                    value={travelData.placeTo}
                    onChange={handlePlaceTo}
                    margin="normal"
                />
                {/*<input*/}
                {/*    id="start-time"*/}
                {/*    placeholder="Выберите дату и время начала поездки"*/}
                {/*    name="startTime"*/}
                {/*    value={travelData.startTime}*/}
                {/*    onChange={handleStartTime}*/}
                {/*    margin="normal"*/}
                {/*/>*/}
                <input
                    id="participant-count"
                    placeholder="Введите количество участников поездки"
                    name="countOfParticipants"
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
                    <button type="button-create" style={{backgroundColor: "#c41519"}}>
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
            </div>
        </div>
    );

}
export default CreateAd;