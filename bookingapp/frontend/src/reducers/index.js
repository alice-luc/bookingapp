import { combineReducers } from "redux";
import bookings from './bookings';
import parking_spaces from './bookings';


export default combineReducers({
    bookings,
    parking_spaces
});
