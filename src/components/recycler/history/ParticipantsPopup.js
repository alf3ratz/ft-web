import React from "react";
import "./ParticipantsPopup.css"
import ParticipantList from "../participants/ParticipantList";

const ParticipantsPopup = props => {
    return (
        <div className="participants-popup-box">
            <div className="participants-box">
                <span className="close-icon" onClick={props.handleClose}>x</span>
                <ParticipantList participants={props.participants}/>
            </div>
        </div>
    );
};

export default ParticipantsPopup;