import "./ParticipantItem.css"


function ParticipantItem(props) {
    return (
        <div className="contact">
            <span>
               <div className="participant-item">
                    <p>{props.email.toLowerCase()}</p>
                    <p>{props.name}</p>
               </div>
            </span>
        </div>
    );
}

export default ParticipantItem