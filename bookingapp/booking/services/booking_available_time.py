from ..models import *


def check_availability(date_start, date_end, parking_space_id):

    objects_set = Booking.objects.filter(parking_space_id=parking_space_id).order_by('date_start')
    if len(objects_set) == 0:
        return 1
    booked_time_sequence = [[booking.date_start, booking.date_end] for booking in objects_set]
    available_time_sequence = count_available_intervals(booked_time_sequence)
    nearer_time_to_offer = []
    counter = 0
    for booked_time in available_time_sequence:
        if booked_time[0] <= date_start <= booked_time[1]:
            if booked_time[0] <= date_end <= booked_time[1]:
                counter += 1
            else:
                nearer_time_to_offer.append(booked_time)
        elif booked_time[0] <= date_end <= booked_time[1]:
            if not booked_time[0] <= date_start <= booked_time[1]:
                nearer_time_to_offer.append(booked_time)

    return counter, nearer_time_to_offer


def count_available_intervals(booked_sequence):
    new_sequence = []
    if booked_sequence[0][0] > now():
        new_sequence.append([now(), booked_sequence[0][0]])
    for i in range(len(booked_sequence)-1):
        if i == len(booked_sequence) - 1:
            new_sequence.append([booked_sequence[i][1], now() + timedelta(weeks=50)])
        new_sequence.append([booked_sequence[i][1], booked_sequence[i+1][0]])
    return new_sequence
