import ErrorPopup from "./ErrorPopup";
import ValidationPopup from "./ValidationPopup";
import React, {useEffect, useState} from "react";
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

    useEffect(() => {
        getTravelByEmail(userEmail).then((response) => {
            let data = response.data
            setTravelData({...travelData, data})
        }).catch(function (error) {
            if (error.response) {
                let jsonString = JSON.stringify(error.response.data)
                let errorObj = JSON.parse(jsonString)
                setErrorData({...errorData, ...errorObj})
                toggleErrorPopup()
            }
        })
    })
    const toggleErrorPopup = () => {
        setIsError(!isError);
    }
    const toggleSuccessPopup = () => {
        setIsSuccess(!isSuccess)
    }
    const leaveTravel = () => {
        leaveFromTravel(userEmail,
            travelData.id)
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
                }
            });
    }
    return (
        <div>
            {travelData.id !== 0 ?
                <div className="input-container">
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
                :
                <div>
                    <p>Вы не участвуйте ни в одной поездке</p>
                </div>
            }
        </div>
    );
}
export default LeaveAd;