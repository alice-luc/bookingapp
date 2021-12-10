import { GET_BOOKING_LIST, ADD_BOOKING, CHANGE_BOOKING, DELETE_BOOKING } from '../actions/types';


const initState = {
    bookings: []
};

export default function(state=initState, action) {
    switch (action.type) {
        case GET_BOOKING_LIST:
            return {
                ...state,
                bookings: action.payload
            };
        case DELETE_BOOKING:
            return {
                ...state,
                bookings: state.bookings.filter(booking => booking.id != action.payload)
            };
        // case CHANGE_BOOKING_DATE:
        //     return {
        //         ...state,
        //         bookings: [...state.bookings]
        //     };
        // case CHANGE_BOOKING_DATE:
        //     return {
        //         ...state,
        //         bookings: [...state.bookings]
        //     };
        // case CHANGE_BOOKING_DATE:
        //     return {
        //         ...state,
        //         bookings: [...state.bookings]
        //     };
            
        default:
            return state;
    };
};