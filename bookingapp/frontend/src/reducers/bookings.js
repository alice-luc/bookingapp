import { GET_BOOKING_LIST, GET_PARKING_SPACES, DELETE_BOOKING } from '../actions/types';


const initState = {
    bookings: [],
    parking_spaces: []
};

export default function(state=initState, action) {
    switch (action.type) {
        case GET_BOOKING_LIST:
            return {
                ...state,
                bookings: action.payload
            };
        case GET_PARKING_SPACES:
            return {
                ...state,
                parking_spaces: action.payload
            };
        case DELETE_BOOKING:
            return {
                ...state,
                bookings: state.bookings.filter(booking => booking.id != action.payload)
            };
        default:
            return state;
    };
};