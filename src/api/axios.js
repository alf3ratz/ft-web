import axios from 'axios'

const localUrl = 'http://localhost:8080'
const prodUrl = 'https://ftapp.herokuapp.com'
export const api = axios.create({
    baseURL: localUrl
})

export const getAllTravels = async (pageParam = 0, options = {}) => {
    const response = await api.get(`/api/travel/getAllTravels?offset=${pageParam}&limit=10`, options)
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
    return response.request//response.data.content
}