""" Custom Service providing bookings validation """
from ..models import *


def check_availability(data: dict) -> [int, list]:
    """
    Returns <1, []> if time is available
    Returns <0, [[time, time],]> if time isn't available,
    where [[time, time],] - is the nearer available time for booking
    """
    b_id = data.get('id', 0)
    date_start = data['date_start']
    date_end = data['date_end']
    nearer_time_to_offer = []
    counter = 0

    objects_set = Booking.objects.filter(parking_space__id=data['parking_space'].pk, date_end__gte=now())

    # Build sequence of booked time (excluding the one user's trying to change in case of 'put' request method)
    booked_time_sequence = [[booking.date_start, booking.date_end] for booking in objects_set if b_id != booking.id]

    if len(booked_time_sequence) == 0:
        return 1, []

    available_time_sequence = count_available_intervals(booked_time_sequence)

    for booked_time in available_time_sequence:

        if booked_time[0] < date_start < booked_time[1]:
            if booked_time[0] < date_end < booked_time[1]:
                counter += 1
            else:
                nearer_time_to_offer.append(booked_time)

        elif booked_time[0] <= date_end <= booked_time[1]:
            if not booked_time[0] <= date_start <= booked_time[1]:
                nearer_time_to_offer.append(booked_time)
    return counter, nearer_time_to_offer


def count_available_intervals(booked_sequence: list) -> list:
    """ Builds sequence of available time intervals """
    new_sequence = []
    # If earliest booked time is later than now, pushing <now - first_booking> time to the available booking time
    if booked_sequence[0][0] > now():
        new_sequence.append([now(), booked_sequence[0][0]])
    # iterates through booked time array and counting time difference from one item to another
    if len(booked_sequence) > 1:
        for i in range(len(booked_sequence)):
            if i < len(booked_sequence) - 1:
                new_sequence.append([booked_sequence[i][1], booked_sequence[i+1][0]])
            else:
                # if its the latest booking, pushing <last_booking - next_year> interval to the available booking time
                new_sequence.append([booked_sequence[i][1], now() + timedelta(weeks=50)])
    else:
        new_sequence.append([booked_sequence[0][1], now() + timedelta(weeks=50)])

    return new_sequence


time_not_available_error_message = 'We apologize, but the chosen time is not available for this parking space. Please, \
select the other parking space, or time interval.'