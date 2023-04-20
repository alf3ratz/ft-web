import {useState} from "react";
import {createTravel} from "../../api/axios";
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import ErrorPopup from "./ErrorPopup";
import ValidationPopup from "./ValidationPopup";

const CreateAd = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isNotValidated, setIsNotValidated] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    const toggleValidationPopup = ()=>{
        setIsNotValidated(!isNotValidated)
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
        setTravelData({...travelData, "startTime": value.toString()});
    }
    const handleParticipants = (event) => {
        const {value} = event.target;
        setTravelData({...travelData, "countOfParticipants": value});
    }
    const handleComment = (event) => {
        const {value} = event.target;
        setTravelData({...travelData, "comment": value});
    }
    const validateValues = ()=>{
        if (!isNaN(travelData.countOfParticipants) || travelData.countOfParticipants>=5 || travelData.countOfParticipants <=0) {
            toggleValidationPopup()
        }
    }
    const createAd = () => {
        validateValues()
        setTravelData({...travelData, "startTime": dt.toISOString().replace("Z", "")});
        console.log(travelData.startTime)
        createTravel(travelData.authorEmail,
            travelData.placeFrom,
            travelData.placeTo,
            travelData.startTime,
            travelData.countOfParticipants,
            travelData.comment).then((response) => response.json())
            .then((response) => {
                //setUsers(respose.data)
            })
            .catch(() => {
                // setErrorMessage("Не удалось создать объявление");
                // return <div className="error">{errorMessage}</div>
                togglePopup()
            });
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
                        onChange={val => setDt(val)}
                    />
                </div>
                <textarea
                    id="comment"
                    placeholder="Дополнительный комментарий"
                    name="comment"
                    value={travelData.comment}
                    onChange={handleComment}
                    margin="normal"
                    rows="5"

                />
                <div className="button-create-ad">
                    <button type="button" style={{backgroundColor: "#c41519"}}>
                        Отмена
                    </button>
                    <button type="button" onClick={createAd}>
                        Создать объявление
                    </button>
                </div>
                {isOpen && <ErrorPopup
                    content={<>
                        <b>Произошла ошибка</b>
                    </>}
                    handleClose={togglePopup}
                />}
                {isNotValidated && <ValidationPopup
                    content={<>
                        <b>Неправильно введено значение</b>
                    </>}
                    handleClose={toggleValidationPopup}
                />}
            </div>
        </div>
    );

}
export default CreateAd;