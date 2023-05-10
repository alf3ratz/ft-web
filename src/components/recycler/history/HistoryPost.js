import React, {useState} from 'react'
import './HistoryPost.css'
import ErrorPopup from "../../create/ErrorPopup";
import ParticipantsPopup from "./ParticipantsPopup";


const HistoryPost = React.forwardRef(({post}, ref) => {
    const [isError, setIsError] = useState(false);
    const [isParticipantsClicked, setIsParticipantsClicked] = useState(false)
    // const [isSuccess, setIsSuccess] = useState(false);
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
        participants: [{}],
        comment: ""
    });

    const toggleErrorPopup = () => {
        setIsError(!isError);
    }
    // const toggleSuccessPopup = () => {
    //     setIsSuccess(!isSuccess)
    // }
    const showParticipantsPopup = () => {
        setIsParticipantsClicked(!isParticipantsClicked)
    }
    const postBody = (
        <>
            <p>От кого: {post.authorEmail}</p>
            <p>Адрес отправления: {post.placeFrom}</p>
            <p>Адрес назначения: {post.placeTo}</p>
            <p>Количество попутчиков: {post.countOfParticipants}</p>
            <p>Дополнительная информация: {post.comment}</p>
            <button type="button" className="button-participants" onClick={showParticipantsPopup}>
                Попутчики
            </button>
            {isParticipantsClicked && <ParticipantsPopup
                participants={post.participants}
                handleClose={showParticipantsPopup}
            />}
            {isError && <ErrorPopup
                content={<>
                    <b>{errorData.error_description}</b>
                </>}
                handleClose={toggleErrorPopup}
            />}
            {/*{isSuccess && <ValidationPopup*/}
            {/*    content={<>*/}
            {/*        <b>Вы присоединились к поездке</b>*/}
            {/*    </>}*/}
            {/*    handleClose={toggleSuccessPopup}*/}
            {/*/>}*/}
        </>
    )

    const content = ref
        ?
        <article ref={ref}>{postBody}</article>
        :
        <article>{postBody}</article>


    return content
})

export default HistoryPost