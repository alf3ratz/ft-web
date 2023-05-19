import axios from 'axios'

const localUrl = 'http://localhost:8080'
//const prodUrl = 'https://ftapp-aapetropavlovskiy.b4a.run'//'https://ftapp.herokuapp.com'
export const api = axios.create({
    baseURL: localUrl
})
export const userEmail = "aapetropavlovskiy@edu.hse.ru"
export var currentTravelId = 0
export var currentChatId = 0;

export const getAllTravels = async (pageParam = 0, options = {}) => {
    const response = await api.get(`/api/travel/getAllTravels?offset=${pageParam}&limit=10`, options)
    return response.data.content
}
export const getTravelHistory = async (pageParam = 0, authorEmail = "", options = {}) => {
    const response = await api.get(`/api/travel/getTravelHistoryByAuthor?offset=${pageParam}&limit=10&authorEmail=${authorEmail}`, options)
    return response.data.content
}
export const createTravel = async (authorEmail = "",
                                   placeFrom = "",
                                   placeTo = "",
                                   startTime = "",
                                   countOfParticipants = 1,
                                   comment = "") => {
    const data = JSON.stringify(
        {
            authorEmail: authorEmail,
            placeFrom: placeFrom,
            placeTo: placeTo,
            startTime: startTime,
            countOfParticipants: countOfParticipants,
            comment: comment
        }
    );
    const options = {
        headers: {"content-type": "application/json"}
    }
    const response = await api.post(`/api/travel/createTravel`, data, options)
    return response.data.content
}

export const joinToTravel = async (authorEmail = "",
                                   travelId = 0) => {
    const data = JSON.stringify(
        {
            email: authorEmail,
            travelId: travelId,
        }
    );
    const options = {
        headers: {"content-type": "application/json"}
    }
    const response = await api.post(`/api/travel/addTraveller`, data, options)
    return response
}
export const leaveFromTravel = async (authorEmail = "",
                                      travelId = 0) => {
    const data = JSON.stringify(
        {
            email: authorEmail,
            travelId: travelId,
        }
    );
    const options = {
        headers: {"content-type": "application/json"}
    }
    const response = await api.post(`/api/travel/reduceTravaller`, data, options)
    return response
}
export const deleteTravel = async (travelId = 0) => {
    const response = await api.post(`/api/travel/deleteTravel?travelId=${travelId}`)
    return response
}
export const getTravelByEmail = (authorEmail = "") => {
    const response = api.get(`/api/travel/getTravelByUserEmail?userEmail=${authorEmail}`)
    return response
}
export const sendMessageToChat = async (chatId = 0,
                                        sender = "",
                                        message = "") => {
    const data = JSON.stringify(
        {
            chatId: chatId,
            sender: sender,
            message: message
        }
    );
    const options = {
        headers: {"content-type": "application/json"}
    }
    const response = await api.post(`/api/chat/sendMessage`, data, options)
    return response
}

export const getMessagesByChat = (chatId = 0) => {
    const response = api.get(`/api/chat/getMessagesByChat?chatId=${chatId}`)
    return response
}

export const setLeadershipToParticipant = async (travelId = 0, participantEmail = "") => {
    const data = JSON.stringify(
        {
            travelId: travelId,
            participantEmail: participantEmail
        }
    );
    const options = {
        headers: {"content-type": "application/json"}
    }
    const response = await api.post(`/api/travel/setLeadershipToParticipant`, data, options)
    return response;
}