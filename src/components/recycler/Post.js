import React, {useState} from 'react'
import './Post.css'
import {currentTravelId, joinToTravel, userEmail} from "../../api/axios";
import ErrorPopup from "../create/ErrorPopup";
import ValidationPopup from "../create/ValidationPopup";

const Post = React.forwardRef(({post}, ref) => {
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
    const joinTravel = () => {
        joinToTravel(userEmail,
            post.id)
            .then((response) => {
                //setUsers(respose.data)
                // setErrorMessage(response.data.);
                toggleSuccessPopup()
                currentTravelId = response.data.id
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
            })
            .finally(() => {
                    console.log(travelData.comment)
                }
            );
    }
    const postBody = (
        <>
            <p>От кого: {post.authorEmail}</p>
            <p>Адрес отправления: {post.placeFrom}</p>
            <p>Адрес назначения: {post.placeTo}</p>
            <p>Количество попутчиков: {post.countOfParticipants}</p>
            <p>Дополнительная информация: {post.comment}</p>
            <button type="button" className="button-join" onClick={joinTravel}>
                Присоединиться
            </button>
            {isError && <ErrorPopup
                content={<>
                    <b>{errorData.error_description}</b>
                </>}
                handleClose={toggleErrorPopup}
            />}
            {isSuccess && <ValidationPopup
                content={<>
                    <b>Вы присоединились к поездке</b>
                </>}
                handleClose={toggleSuccessPopup}
            />}
        </>
    )

    const content = ref
        ? <article ref={ref}>{postBody}</article>
        : <article>{postBody}</article>

    return content
})

export default Post