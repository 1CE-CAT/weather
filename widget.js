function getWeatherIcon(weatherCode, isDay = true) {
    const weatherTypes = {
        clear: { codes: [0, 1], day: 'img/clear_day.png', night: 'img/clear_night.png' },
        cloudy: { codes: [2, 3, 45, 48], icon: 'img/cloudy.png' },
        rain: { codes: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], icon: 'img/rain.png' },
        snow: { codes: [71, 73, 75, 77, 85, 86], icon: 'img/snow.png' },
        thunderstorm: { codes: [95, 96, 99], icon: 'img/thunderstorm.png' }
    };

    for (const [type, data] of Object.entries(weatherTypes)) {
        if (data.codes.includes(weatherCode)) {
            if (type === 'clear') {
                return isDay ? data.day : data.night;
            }
            return data.icon;
        }
    }
    
    return 'img/clear_day.png';
}

function createWeatherWidget(weatherData, lat, lon) {
    const widget = document.createElement('div');
    widget.className = 'weather-widget';
    
    const isDay = weatherData.current_weather.is_day === 1;
    const weatherIcon = getWeatherIcon(weatherData.current_weather.weathercode, isDay);
    const temperature = Math.round(weatherData.current_weather.temperature);
    
    widget.innerHTML = `
        <button class="delete-btn">×</button>
        <h2>${lat.toFixed(2)}, ${lon.toFixed(2)}</h2>
        <div class="weather-icon">
            <img src="${weatherIcon}" alt="Погода" onerror="this.src='img/clear_day.png'">
        </div>
        <div class="weather-info">
            <p><strong>Температура:</strong> ${temperature}°C</p>
            <p><strong>Скорость ветра:</strong> ${weatherData.current_weather.windspeed} м/с</p>
            <p><strong>Направление ветра:</strong> ${weatherData.current_weather.winddirection}°</p>
            <p><strong>Время:</strong> ${new Date(weatherData.current_weather.time).toLocaleTimeString()}</p>
            <p><strong>Погодные условия:</strong> ${isDay ? 'День' : 'Ночь'}</p>
        </div>
        <div class="map-container">
            <iframe 
                width="100%" 
                height="100%" 
                frameborder="0" 
                scrolling="no" 
                marginheight="0" 
                marginwidth="0" 
                src="https://www.openstreetmap.org/export/embed.html?bbox=${lon-0.01}%2C${lat-0.01}%2C${lon+0.01}%2C${lat+0.01}&amp;layer=mapnik&amp;marker=${lat}%2C${lon}">
            </iframe>
        </div>
    `;
    
    widget.querySelector('.delete-btn').addEventListener('click', () => widget.remove());
    
    return widget;
}