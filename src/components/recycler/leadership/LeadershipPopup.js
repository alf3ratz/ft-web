import React, {useState} from "react";
import "../history/ParticipantsPopup.css"
import LeadershipParticipantList from "./LeadershipParticipantList";
import {
    deleteTravel,
} from "../../../api/axios";
import ErrorPopup from "../../create/ErrorPopup";
import ValidationPopup from "../../create/ValidationPopup";

const LeadershipPopup = props => {
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorData, setErrorData] = useState({
        error: "",
        error_description: "",
    });
    const toggleErrorPopup = () => {
        setIsError(!isError);
    }
    const toggleSuccessPopup = () => {
        setIsSuccess(!isSuccess)
    }
    const deleteTravelById = () => {
        deleteTravel(props.travelData.id)
            .then((response) => {
                toggleSuccessPopup()
                //setTravelData({...travelData, response})
            })
            .catch(function (error) {
                if (error.response) {
                    let jsonString = JSON.stringify(error.response.data)
                    let errorObj = JSON.parse(jsonString)
                    setErrorData(errorObj)
                    toggleErrorPopup()
                }
            });
    }
    return (
        <div className="participants-popup-box">
            <div className="participants-box">
                <span className="close-icon" onClick={props.handleClose}>x</span>
                <LeadershipParticipantList travelData={props.travelData}/>
                <button onClick={deleteTravelById}>
                    Удалить поездку
                </button>
                {isError && <ErrorPopup
                    content={<>
                        <b>{errorData.error_description}</b>
                    </>}
                    handleClose={toggleErrorPopup}
                />}
                {isSuccess && <ValidationPopup
                    content={<>
                        <b>Вы удалили поездку</b>
                    </>}
                    handleClose={toggleSuccessPopup}
                />}
            </div>
        </div>
    );
};

export default LeadershipPopup;