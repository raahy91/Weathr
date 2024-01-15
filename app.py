from flask import Flask, render_template, request
import weather_data as wd
import util

app = Flask(__name__)

@app.route('/<city>/<day_date>')
def show_weather(city, day_date):
    forecast_weather_data = wd.get_weather_forecast(city)
    print(forecast_weather_data)
    if forecast_weather_data is None:
        forecast_weather_data = wd.get_weather_forecast('Twatt')

    current_time = ""
    for key, item in forecast_weather_data.items():
        current_time = item['00:00']['localtime']
        current_date = key;
        break

    formatted_city = util.format_city_name(city)
    return render_template('default_meteo_template.html', city=formatted_city, current_city=city,
                           forecast=forecast_weather_data, day_date=day_date, current_time=current_time, current_date=current_date)

if __name__ == '__main__':
    app.run(debug=True)
