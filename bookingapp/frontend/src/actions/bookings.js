import axios from 'axios';
import regeneratorRuntime from "regenerator-runtime";

import { GET_BOOKING_LIST, GET_PARKING_SPACES, DELETE_BOOKING } from '../actions/types';


const refreshToken = async () => {
    const refresh = localStorage.getItem('refresh_token')
    return axios.post('api-auth/jwt/refresh', { "refresh": refresh }).then(result => {
        return result.data.access;
    }).catch(e => {
        return Promise.reject(e);
    });
};

export const getBookingsList = () => dispatch => {
    axios.get('api/bookings/')
        .then(result => {
            dispatch({
                type: GET_BOOKING_LIST,
                payload: result.data
            }
        );
    }).catch(error => {return error.response});
};

export const getParkingSpaces = () => dispatch => {
    axios.get('api/parking_space/')
        .then(result => {
            dispatch({
                type: GET_PARKING_SPACES,
                payload: result.data
            }
        );
    }).catch(error => {return error.response});
};

export const deleteBooking = (id) => dispatch => {

    refreshToken().then(access_token => {
        console.log(access_token)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    }).then( () => {
        axios.delete(`api/bookings/${id}/`)
    }).then(result => {
            dispatch({
                type: DELETE_BOOKING,
                payload: id
            }
        );
    }).catch(e => { return e.response });
};

export const changeBooking = async (booking) => {
    const access_token = await refreshToken();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    return await axios.put(`api/bookings/${booking.id}/`, booking).catch(error => {return error.response});
};


export const logIn = (user_data) => dispatch => {
    
    axios.post('api-auth/jwt/create', user_data)
    .then(result => {
        localStorage.setItem('access_token', result.data.access);
        localStorage.setItem('refresh_token', result.data.refresh);
        localStorage.setItem('username', user_data.username);
    }).then(() => {
        window.location.reload();
    }).catch(error => {return error.response});
};

export const addBooking = async (booking) => {

    const access_token = await refreshToken();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    return await axios.post(`api/bookings/`, booking).catch(error => {return error.response});
};

export const addParkingSpace = async (parking_space) => {

    const access_token = await refreshToken();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    return await axios.post(`api/parking_space/`, parking_space).catch(error => {return error.response});

};
