import axios from 'axios';
import { GET_BOOKING_LIST, ADD_BOOKING, CHANGE_BOOKING, DELETE_BOOKING, GET_PARKING_SPACES, ADD_ERROR, CHANGE_ERROR, DELETE_ERROR } from '../actions/types';


axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';


export const getBookingsList = () => dispatch => {
    axios.get('api/bookings/')
        .then(result => {
            console.log(result)
            dispatch({
                type: GET_BOOKING_LIST,
                payload: result.data
            }
        );
    }).catch(e => console.log(e.message));
};

export const getParkingSpaces = () => dispatch => {
    axios.get('api/parking_space/')
        .then(result => {
            console.log(result.data, 'actions result');
            dispatch({
                type: GET_PARKING_SPACES,
                payload: result.data
            }
        );
    }).catch(e => console.log(e.message));
};

export const deleteBooking = (id) => dispatch => {
    axios.delete(`api/bookings/${id}/`)
        .then(result => {
            dispatch({
                type: DELETE_BOOKING,
                payload: id
            }
        );
    }).catch(e => console.log(e.message));
};

export const changeBooking = (booking) => dispatch => {
    
    axios.put(`api/bookings/${booking.id}/`, booking)
        .then(result => {
            console.log(result.data)
            dispatch({
                type: CHANGE_BOOKING,
                payload: result.data
            }
        );
    }).catch(e => console.log(e.message));
};

export const addBooking = (booking) => dispatch => {
    console.log(booking);
    axios.post(`api/bookings/`, booking)
        .then(result => {
            dispatch({
                type: ADD_BOOKING,
                payload: result.data
            }
        );
    }).catch(e =>{
        dispatch({
            type: ADD_ERROR,
            payload: [result.error, result.body]
        })
    });
};
