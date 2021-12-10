import axios from 'axios';
import { GET_BOOKING_LIST, ADD_BOOKING, CHANGE_BOOKING, DELETE_BOOKING, GET_PARKING_SPACES } from '../actions/types';


axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';


export const getBookings = () => dispatch => {
    axios.get('api/booking')
        .then(result => {
            dispatch({
                type: GET_BOOKING_LIST,
                payload: result.data
            }
        );
    }).catch(e => console.log(e.message));
};

export const deleteBooking = (id) => dispatch => {
    axios.delete(`api/booking/${id}/`)
        .then(result => {
            dispatch({
                type: DELETE_BOOKING,
                payload: id
            }
        );
    }).catch(e => console.log(e.message));
};

export const changeBooking = (booking) => dispatch => {

    axios.put(`api/booking/${booking.id}/`, booking)
        .then(result => {
            dispatch({
                type: CHANGE_BOOKING,
                payload: result.data
            }
        );
    }).catch(e => console.log(e.message));
};

export const getParkingSpaces = () => dispatch => {
    axios.get('api/parking_spaces')
        .then(result => {
            dispatch({
                type: GET_PARKING_SPACES,
                payload: result.data
            }
        );
    }).catch(e => console.log(e.message));
};