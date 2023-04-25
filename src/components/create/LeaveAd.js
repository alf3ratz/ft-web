import DatePicker from "react-datetime";
import ErrorPopup from "./ErrorPopup";
import ValidationPopup from "./ValidationPopup";
import React, {useState} from "react";
import {currentChatId, currentTravelId, getTravelByEmail, leaveFromTravel, userEmail} from "../../api/axios";


const LeaveAd = () => {
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorData, setErrorData] = useState({
        error: "",
        error_description: "",
    });
    const [travelData, setTravelData] = useState({
        id: 0,
        authorEmail: "",
        startTime: "",
        placeFrom: "",
        placeTo: "",
        countOfParticipants: 0,
        comment: ""
    });

    const toggleErrorPopup = () => {
        setIsError(!isError);
    }
    const toggleSuccessPopup = () => {
        setIsSuccess(!isSuccess)
    }
    const leaveTravel = () => {
        let travelId = 0
        getTravelByEmail(userEmail).then((response) => {
            travelId = response.data.id
        }).finally(() => {
            console.log(travelId)
            leaveFromTravel(userEmail,
                travelId)
                .then((response) => {
                    //setUsers(respose.data)
                    // setErrorMessage(response.data.);
                    toggleSuccessPopup()
                    setTravelData({...travelData, response})
                    currentTravelId = 0
                    currentChatId = 0;
                })
                .catch(function (error) {
                    if (error.response) {
                        let jsonString = JSON.stringify(error.response.data)
                        let errorObj = JSON.parse(jsonString)
                        setErrorData({...errorData, ...errorObj})
                        toggleErrorPopup()
                        // console.log(errorData.error_description);
                        // console.log(error.response.data);
                        // console.log(error.response.status);
                        // console.log(error.response.headers);
                    }
                });
        });

    }
    return (
        <div className="leave">
            <button type="button" className="button-join" onClick={leaveTravel}>
                Выйти из поездки
            </button>
            {isError && <ErrorPopup
                content={<>
                    <b>{errorData.error_description}</b>
                </>}
                handleClose={toggleErrorPopup}
            />}
            {isSuccess && <ValidationPopup
                content={<>
                    <b>Вы вышли из поездки</b>
                </>}
                handleClose={toggleSuccessPopup}
            />}
        </div>
    );
}
export default LeaveAd;