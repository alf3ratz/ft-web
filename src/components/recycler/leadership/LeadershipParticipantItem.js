import "../participants/ParticipantItem.css"
import {currentTravelId, joinToTravel, setLeadershipToParticipant, userEmail} from "../../../api/axios";
import React, {useState} from "react";
import ErrorPopup from "../../create/ErrorPopup";
import ValidationPopup from "../../create/ValidationPopup";


function LeadershipParticipantItem(props) {
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
    const giveLeadership = () =>{
        setLeadershipToParticipant(props.travelId, props.email)
            .then((response) => {
                toggleSuccessPopup()
            })
            .catch(function (error) {
                if (error.response) {
                    let jsonString = JSON.stringify(error.response.data)
                    let errorObj = JSON.parse(jsonString)
                    setErrorData({...errorData, ...errorObj})
                    toggleErrorPopup()
                }
            })
            .finally(() => {
                }
            );
    }
    return (
        <div className="contact">
            <span>
               <div className="participant-item">
                    <p>{props.email.toLowerCase()}</p>
                    <p>{props.name}</p>
                   <button onClick={giveLeadership}>
                       Передать лидерство
                   </button>
                   {isError && <ErrorPopup
                       content={<>
                           <b>{errorData.error_description}</b>
                       </>}
                       handleClose={toggleErrorPopup}
                   />}
                   {isSuccess && <ValidationPopup
                       content={<>
                           <b>Вы передали лидерство</b>
                       </>}
                       handleClose={toggleSuccessPopup}
                   />}
               </div>
            </span>
        </div>
    );
}

export default LeadershipParticipantItem