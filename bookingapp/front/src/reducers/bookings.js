import { GET_BOOKING_LIST, ADD_BOOKING, CHANGE_BOOKING, DELETE_BOOKING, GET_PARKING_SPACES, ADD_ERROR, CHANGE_ERROR, DELETE_ERROR } from '../actions/types';


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
            console.log(action.payload, 'payload');
            return {
                ...state,
                parking_spaces: action.payload
            };
        case DELETE_BOOKING:
            return {
                ...state,
                bookings: state.bookings.filter(booking => booking.id != action.payload)
            };
        case CHANGE_BOOKING:
            return {
                ...state,
                bookings: [...state.bookings]
            };
        case ADD_BOOKING:
            return {
                ...state,
                bookings: [...state.bookings, action.payload]
            };
        case ADD_ERROR:
            return {
                ...state,
                errors: action.payload
            };
        case CHANGE_ERROR:
            return {
                ...state,
                errors: action.payload
            };
        case CHANGE_ERROR:
            return {
                ...state,
                errors: action.payload
            };
        default:
            return state;
    };
};