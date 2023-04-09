import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://ftapp.herokuapp.com'
})

export const getAllTravels = async (pageParam = 0, options = {}) => {
    const response = await api.get(`/api/travel/getAllTravels?offset=${pageParam}&limit=10`,options)
    return response.data.content
}