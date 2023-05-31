import axios from 'axios'

const localUrl = 'https://localhost:8080'
const prodUrl = 'https://ftapp-386322.lm.r.appspot.com'//'https://ftapp.herokuapp.com'
export const api = axios.create({
    baseURL: localUrl
})
export const straightApi = axios.create({
    baseURL: `https://auth.hse.ru/adfs/oauth2`
})
export let userEmail
export var currentTravelId = 0
export var currentChatId = 0;
export let isUserAuthor = false
export const auth = async () => {
    const respose = await api.post(`/oauth2/authorization/hse`)
}
export const isLogged = async (keyData = "") => {
    const response = await api.get(`/auth/isLogged?sessionId=${keyData}`)
    return response.data
}
export const authStraight = async () => {
    await straightApi.post(`/authorize?response_type=code&client_id=fe0df921-754d-45e8-8d48-1fcef2d91df8&state=kzFIq4EQ42EfTyfi7mADR7bPVZLuTY8GA6WoOF2qFjI%3D&redirect_uri=https://www.ft-app.online/auth/hse_redirect&code_challenge=9tMZlNKYfBooutc39bhUWAGiXOX_BsxxYC3NqVZfvpU&code_challenge_method=S256
`)
}
export const startTravel = async (travelId = 0) => {
    const response = await api.post(`/api/travel/startTravel?travelId=${travelId}`)
    return response
}
export const stopTravel = async (travelId = 0) => {
    const response = await api.post(`/api/travel/stopTravel?travelId=${travelId}`)
    return response
}

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
export const updateTravel = async (authorEmail = "",
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
    const response = await api.post(`/api/travel/updateTravel`, data, options)
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

export default userEmail;