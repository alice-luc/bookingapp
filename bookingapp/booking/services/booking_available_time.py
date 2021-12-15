from ..models import *


def check_availability(data):
    id = data.get('id', 0)
    date_start = data['date_start']
    date_end = data['date_end']
    objects_set = Booking.objects.filter(parking_space__id=data['parking_space'].pk).order_by('date_start')
    print('data', data)
    booked_time_sequence = [[booking.date_start, booking.date_end] for booking in objects_set if id != booking.id]
    print('obj_set', booked_time_sequence)
    if len(booked_time_sequence) == 0:
        return 1, []
    available_time_sequence = count_available_intervals(booked_time_sequence)
    nearer_time_to_offer = []
    print('time', available_time_sequence)
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
    if len(booked_sequence) > 1:
        for i in range(len(booked_sequence)-1):
            if booked_sequence[i+1]:
                new_sequence.append([booked_sequence[i][1], booked_sequence[i+1][0]])
            else:
                print('last')
                new_sequence.append([booked_sequence[i][1], now() + timedelta(weeks=50)])
    else:
        new_sequence.append([booked_sequence[0][1], now() + timedelta(weeks=50)])
    return new_sequence


time_not_available_error_message = 'We apologize, but the chosen time is not available for this parking space. Please, \
select the other parking space, of time interval. You might choose time from the list bellow'