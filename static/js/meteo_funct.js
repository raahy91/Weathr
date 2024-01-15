// Listeners de checkbox et city input
document.addEventListener('DOMContentLoaded', function () {

    // Listeners checkbox
    var toggle_fahrenheit = document.getElementById('CelciusFahrenheit');
    var currentTemperatureElement = document.getElementById('current_temperature');
    var forecastTemperatureElements = document.querySelectorAll('.forecast_temperature');

    toggle_fahrenheit.addEventListener('change', function() {
        var currentCelcius = parseFloat(currentTemperatureElement.getAttribute('data-celsius'));
        var currentFahrenheit = parseFloat(currentTemperatureElement.getAttribute('data-fahrenheit'));

        if (this.checked) {
            currentTemperatureElement.textContent = currentFahrenheit.toFixed(2) + '°F';
        } else {
            currentTemperatureElement.textContent = currentCelcius.toFixed(2) + '°C';
        }

        forecastTemperatureElements.forEach(function(element) {
            var forecastCelcius = parseFloat(element.getAttribute('data-celsius'));
            var forecastFahrenheit = parseFloat(element.getAttribute('data-fahrenheit'));

            if (toggle_fahrenheit.checked) {
                element.textContent = 'Temperature: ' + forecastFahrenheit.toFixed(2) + '°F';
            } else {
                element.textContent = 'Temperature: ' + forecastCelcius.toFixed(2) + '°C';
            }
        });
    });

    var maxMinTemperatureElements = document.querySelectorAll('.forecast_max_min');
    var carElements = document.querySelectorAll('.time-carousel-temp');

    toggle_fahrenheit.addEventListener('change', function() {
        maxMinTemperatureElements.forEach(function(element) {
            var minCelsius = parseFloat(element.getAttribute('data-min-c'));
            var maxCelsius = parseFloat(element.getAttribute('data-max-c'));
            var minFahrenheit = parseFloat(element.getAttribute('data-min-f'));
            var maxFahrenheit = parseFloat(element.getAttribute('data-max-f'));

            if (toggle_fahrenheit.checked) {
                element.querySelector('.temp-min').textContent = minFahrenheit.toFixed(2) + '°F';
                element.querySelector('.temp-max').textContent = maxFahrenheit.toFixed(2) + '°F';
            } else {
                element.querySelector('.temp-min').textContent = minCelsius.toFixed(2) + '°C';
                element.querySelector('.temp-max').textContent = maxCelsius.toFixed(2) + '°C';
            }
        });

        carElements.forEach(function(element) {
            var c = parseFloat(element.getAttribute('data-celsius'));
            var f = parseFloat(element.getAttribute('data-fahrenheit'));
            console.log("c " + c);
            console.log("f" + f);

            if (toggle_fahrenheit.checked) {
                element.textContent = f.toFixed(2) + '°F';
                console.log("f content " + element.textContent);

            } else {
                element.textContent = c.toFixed(2) + '°C';
                console.log("c content " + element.textContent);
            }
        });
    });

    var dailyCarouselElements = document.querySelectorAll('.time-carousel-temp');
    toggle_fahrenheit.addEventListener('change', function() {
        dailyCarouselElements.forEach(function(element) {
            var c = parseFloat(element.getAttribute('data-celsius'));
            var f = parseFloat(element.getAttribute('data-fahrenheit'));
            console.log("c " + c);
            console.log("f" + f);

            if (toggle_fahrenheit.checked) {
                element.textContent = f.toFixed(2) + '°F';
                console.log("f content " + element.textContent);

            } else {
                element.textContent = c.toFixed(2) + '°C';
                console.log("c content " + element.textContent);
            }
        });
    });

    var toggle_mph = document.getElementById('KphMph');
    var currentWindSpeedElement = document.getElementById('current_wind');

    toggle_mph.addEventListener('change', function() {
        var currentKph = parseFloat(currentWindSpeedElement.getAttribute('data-kph'));
        var currentMph = parseFloat(currentWindSpeedElement.getAttribute('data-mph'));

        if (this.checked) {
            currentWindSpeedElement.textContent ='Wind speed: ' +  currentMph.toFixed(2) + ' mph';
        } else {
            currentWindSpeedElement.textContent = 'Wind speed: ' + currentKph.toFixed(2) + ' km/h';
        }
    });

    // Listener city input
    var cityForm = document.getElementById('cityForm');

    cityForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var city = document.getElementById('city').value;
        var date = document.getElementById('current_date').getAttribute('data-current_date');
        console.log(date)
        window.location.href = '/' + encodeURIComponent(city) + '/' + encodeURIComponent(date);
    });
});


// Carousel de prévisions
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.next-button');
  const prevButton = document.querySelector('.prev-button');
  const slideWidth = slides[0].getBoundingClientRect().width;
  const numOfVisibleSlides = 3; // Nombre de slides visibles à la fois
  let currentSlideIndex = 0;

  const updateButtons = () => {
    prevButton.style.display = currentSlideIndex > 0 ? 'block' : 'none';
    nextButton.style.display = currentSlideIndex < slides.length - numOfVisibleSlides ? 'block' : 'none';
  };

  updateButtons();

  const moveToSlide = (targetIndex) => {
  const moveDistance = targetIndex * (slideWidth + 9);
  track.style.transform = `translateX(-${moveDistance}px)`;
  currentSlideIndex = targetIndex;
  updateButtons();
};

  prevButton.addEventListener('click', e => {
    if (currentSlideIndex > 0) {
      moveToSlide(currentSlideIndex - 1);
    }
  });

  nextButton.addEventListener('click', e => {
    if (currentSlideIndex < slides.length - numOfVisibleSlides) {
      moveToSlide(currentSlideIndex + 1);
    }
  });
});

// Sélection du carousel
document.addEventListener('DOMContentLoaded', function() {
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const mainContainer = {
        icon: document.querySelector('.main_weather_contener_icon img'),
        date: document.getElementById('main_weather_contener_date'),
        time: document.getElementById('main_weather_contener_time'),
        location: document.getElementById('main_weather_contener_location'),
        temperature: document.getElementById('current_temperature'),
        wind: document.getElementById('current_wind'),
        humidity: document.getElementById('main_weather_contener_humidity'),
        precipitation: document.getElementById('main_weather_contener_precipitation'),
        snow: document.getElementById('main_weather_contener_snow') }

    carouselSlides.forEach(slide => {
        slide.addEventListener('click', function() {
            const date = this.getAttribute('data-date');
            //updateMainContainer(date);
            const day_date = this.getAttribute('data-daydate');
            const city = document.getElementById('cityData').getAttribute('data-city');
            const url = `/${encodeURIComponent(city)}/${encodeURIComponent(day_date)}`;
            console.log(city);
            console.log(date);
            window.location.href = url;
        });
    });

    function updateMainContainer(date) {
    const slide = document.querySelector(`[data-date="${date}"]`);

    mainContainer.icon.src = slide.getAttribute('data-icon');
    mainContainer.date.textContent = slide.getAttribute('data-date');
    mainContainer.location.textContent = slide.getAttribute('data-location');

    const temperatureCelsius = slide.getAttribute('data-temperature_c');
    const temperatureFahrenheit = slide.getAttribute('data-temperature_f');
    mainContainer.temperature.setAttribute('data-celsius', temperatureCelsius);
    mainContainer.temperature.setAttribute('data-fahrenheit', temperatureFahrenheit);
    mainContainer.temperature.textContent = document.getElementById('CelciusFahrenheit').checked ? `${temperatureFahrenheit}°F` : `${temperatureCelsius}°C`;

    const windKph = slide.getAttribute('data-wind_k');
    const windMph = slide.getAttribute('data-wind_m');
    mainContainer.wind.setAttribute('data-kph', windKph);
    mainContainer.wind.setAttribute('data-mph', windMph);
    mainContainer.wind.textContent = document.getElementById('KphMph').checked ? `Wind speed: ${windMph} mph` : `Wind speed: ${windKph} km/h`;

    mainContainer.humidity.textContent = `Humidity: ${slide.getAttribute('data-humidity')}%`;

    const precipitation = slide.getAttribute('data-precipitation');
    mainContainer.precipitation.textContent = precipitation > 1 ? `Precipitation: ${precipitation} mm` : '';

    const snow = slide.getAttribute('data-snow');
    mainContainer.snow.textContent = snow > 1 ? `Snow: ${snow} mm` : '';

    mainContainer.time.textContent = slide.getAttribute('data-time');
    }
});

// Carousel d'heures boutons
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.time-carousel-track');
    const slides = Array.from(track.children);
    const prevButton = document.querySelector('.time-prev-button');
    const nextButton = document.querySelector('.time-next-button');
    let currentOffset = 0;

    const slideWidth = slides[0].offsetWidth + 10; // +10 pour l'espace entre les slides

    // Fonction pour mettre à jour le carousel
    function updateCarousel(offset) {
        track.style.transform = `translateX(${offset}px)`;
    }

    // Gestionnaire d'événement pour le bouton précédent
    prevButton.addEventListener('click', function() {
        if (currentOffset < 0) {
            currentOffset += slideWidth;
            updateCarousel(currentOffset);
        }
    });

    // Gestionnaire d'événement pour le bouton suivant
    nextButton.addEventListener('click', function() {
        if (-(currentOffset - slideWidth) < slideWidth * slides.length) {
            currentOffset -= slideWidth;
            updateCarousel(currentOffset);
        }
    });
});

// Carousel d'heures

