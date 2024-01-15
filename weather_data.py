from datetime import datetime
import requests
import util


# Retourne le forecast de x days (7 par défaut) à intervalle de y hours (2 par défaut)
def get_weather_forecast(city, days=7, interval=2):
    api_key = '9b850645018b450195550707240701'
    url = f"http://api.weatherapi.com/v1/forecast.json?key={api_key}&q={city}&days={days}&lang=fr"
    response = requests.get(url)
    forecast_data = response.json()

    if 'forecast' not in forecast_data:
        return None

    hourly_forecast = []
    for day in forecast_data['forecast']['forecastday']:
        for hour in day['hour']:
            if day['hour'].index(hour) % interval == 0:
                hour_data = {
                    'city': forecast_data['location']['name'],
                    'country': forecast_data['location']['country'],
                    'time': hour['time'],
                    'week_day': util.get_week_day(hour['time'][:10]),
                    'temperature_c': hour['temp_c'],
                    'temperature_f': hour['temp_f'],
                    'feels_like': hour['feelslike_c'],
                    'weather_description': hour['condition']['text'],
                    'humidity': hour['humidity'],
                    'wind_k': hour.get('wind_kph', 0),
                    'wind_m': util.kph_to_mph(hour.get('wind_kph', 0)),
                    'clouds': hour['cloud'],
                    'precipitation': hour.get('precip_mm', 0),
                    'snow': hour.get('snow_mm', 0),
                    'icon': hour['condition']['icon']
                }
                hourly_forecast.append(hour_data)

    forecast = {}
    hours_in_day = 24//interval
    for d in range(days):
        day_date = hourly_forecast[d*hours_in_day]['time'][:10]
        day_data = {}
        for i in range(hours_in_day):
            hour = hourly_forecast[i + hours_in_day*d]
            hour_time = hour['time'][11:]

            icon = '//cdn.weatherapi.com/weather/64x64/night/119.png' if hour['icon'] == '//cdn.weatherapi.com/weather/64x64/day/119.png' else hour['icon']
            hour_data = {
                'location': hour['city'] + ", " + hour['country'],
                'localtime': forecast_data['location']['localtime'][11:],
                'week_day': util.get_week_day(day_date),
                'date': util.get_month(day_date) + " " + util.get_day(day_date),
                'day_date': day_date,
                'flag': 'Today' if d == 0 else 'F' + str(d),
                'temperature_c': hour['temperature_c'],
                'temperature_f': hour['temperature_f'],
                'weather_description': hour['weather_description'],
                'humidity': hour['humidity'],
                'wind_k': hour['wind_k'],
                'wind_m': hour['wind_m'],
                'precipitation': hour['precipitation'],
                'snow': hour['snow'],
                'icon': icon
            }
            day_data[hour_time] = hour_data
        min_max_temp = util.get_min_and_max_temp(day_data)
        day_data['max_c'] = min_max_temp['max_c']
        day_data['min_c'] = min_max_temp['min_c']
        day_data['max_f'] = min_max_temp['max_f']
        day_data['min_f'] = min_max_temp['min_f']
        day_data['localtime'] = forecast_data['location']['localtime']
        forecast[day_date] = day_data

    return forecast
