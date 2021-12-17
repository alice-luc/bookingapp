export const GET_BOOKING_LIST = 'GET_BOOKING_LIST';
export const DELETE_BOOKING = 'DELETE_BOOKING';
export const GET_PARKING_SPACES = 'GET_PARKING_SPACES';
export const DELETE_PARKING_SPACE = 'DELETE_PARKING_SPACE';
export const PERMISSIONS_MAPPING = {

    'Employee': {
        can_view_booking: true,
        can_create_booking: true,
        can_delete_booking: false,
        can_change_booking: false,
        can_create_parking_space: false,
        can_view_parking_space: true
    },

    'Manager': {
        can_view_booking: true,
        can_create_booking: true,
        can_delete_booking: true,
        can_change_booking: true,
        can_create_parking_space: true,
        can_view_parking_space: true
    },

    'alicelews': {
        can_view_booking: true,
        can_create_booking: true,
        can_delete_booking: true,
        can_change_booking: true,
        can_create_parking_space: true,
        can_view_parking_space: true
    }
};