from datetime import datetime
import numpy as np


def format_city_name(city):
    if city[-1] == 's':
        city += "'"
    else:
        city += "'s"
    return city


def kph_to_mph(kph):
    return kph / 1.609


def get_week_day(date):
    date_obj = datetime.strptime(date, '%Y-%m-%d')
    jour_index = date_obj.weekday()
    jours = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    return jours[jour_index]


def get_month(date):
    month_index = int(date[5:7]) - 1
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
              "November", "December"]
    return months[month_index]


def get_day(date):
    day = date[-1] if date[-2:-1] == '0' else date[-2:]
    if day[-1] == '1':
        return day + 'st'
    elif day[-1] == '2':
        return day + 'nd'
    elif day[-1] == '3':
        return day + 'rd'
    else:
        return day + 'th'

def return_date(date):
    return get_week_day(date) + ", " + get_month(date) + " " + get_day(date)

def get_min_and_max_temp(day_data):
    max_c = -np.Inf
    min_c = np.Inf
    max_f = -np.Inf
    min_f = np.Inf
    for hour_data in day_data.values():
        if hour_data['temperature_c'] > max_c:
            max_c = hour_data['temperature_c']
        if hour_data['temperature_c'] < min_c:
            min_c = hour_data['temperature_c']
        if hour_data['temperature_f'] > max_f:
            max_f = hour_data['temperature_f']
        if hour_data['temperature_f'] < min_f:
            min_f = hour_data['temperature_f']

    return {'max_c': max_c, 'min_c': min_c,
            'max_f': max_f, 'min_f': min_f}