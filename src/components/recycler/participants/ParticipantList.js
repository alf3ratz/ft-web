import React from "react";
import ParticipantItem from "./ParticipantItem";

function ParticipantList(props) {
    return (
        <div>
            {props.participants === undefined || props.participants.length === 0 ?
                <p>Попутчики отсутствуют</p>
                :
                props.participants.map(c => <ParticipantItem key={c.email} name={c.username} email={c.email}/>)
            }
        </div>
    );
}

export default ParticipantList;