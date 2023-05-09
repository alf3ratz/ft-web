import React from "react";
import LeadershipParticipantItem from "./LeadershipParticipantItem";

function LeadershipParticipantList(props) {
    return (
        <div>
            {props.travelData.participants === undefined || props.travelData.participants.length === 0 ?
                <p>Попутчики отсутствуют</p>
                :
                props.travelData.participants.map(c => <LeadershipParticipantItem key={c.email} name={c.username}
                                                                       email={c.email}
                travelId = {props.travelData.id}/>)
            }
        </div>
    );
}

export default LeadershipParticipantList;