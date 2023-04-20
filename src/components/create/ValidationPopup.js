import React from "react";

const ValidationPopup = props => {
    return (
        <div className="validation-popup-box">
            <div className="validation-box">
                <span className="close-icon" onClick={props.handleClose}>x</span>
                {props.content}
            </div>
        </div>
    );
};

export default ValidationPopup;