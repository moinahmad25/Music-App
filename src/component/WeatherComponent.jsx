import React, { useState, useEffect } from 'react';
import few_clouds from '../assets/weather videos/few clouds.mp4'
import haze from '../assets/weather videos/haze.mp4'
import clear_sky from '../assets/weather videos/clear sky.mp4'
import mist from '../assets/weather videos/mist.mp4'
import rain from '../assets/weather videos/rain.mp4'
import broken_clouds from '../assets/weather videos/broken clouds.mp4'
import scattered_clouds from '../assets/weather videos/scattered clouds.mp4'
import shower_rain from '../assets/weather videos/shower rain.mp4'

const WeatherComponent = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [vsrc, setVsrc] = useState('')

  useEffect(() => {
    // Function to fetch geolocation
    // console.log(navigator.geolocation)
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        }, (error) => {  //handling error in getting location
          console.error("Error getting geolocation:", error);
        });
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    // Call the function to get geolocation
    getLocation();
    
    if(weatherData !== null){
      if (weatherData.weather[0].description === 'clear sky') {
        setVsrc(clear_sky)
      }
      else if (weatherData.weather[0].description === 'few clouds') {
        setVsrc(few_clouds)
      }
      else if (weatherData.weather[0].description === 'scattered clouds') {
        setVsrc(scattered_clouds)
      }
      else if (weatherData.weather[0].description === 'broken clouds') {
        setVsrc(broken_clouds)
      }
      else if (weatherData.weather[0].description === 'shower rain') {
        setVsrc(shower_rain)
      }
      else if (weatherData.weather[0].description === 'rain') {
        setVsrc(rain)
      }
      else if (weatherData.weather[0].description === 'mist') {
        setVsrc(mist)
      }
    }
    
  }, [weatherData]);
  
  // console.log(vsrc)
  
  useEffect(() => {
    // Fetch weather data based on latitude and longitude
    const fetchWeather = async () => {
      if (latitude !== null && longitude !== null) {
        const api_key = `8f271e955e1286fc6963f8c4637d9bc7` // Your API key from OpenWeatherMap or WeatherAPI
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`;
        
        try {
          const response = await fetch(API_URL);
          const data = await response.json();
          setWeatherData(data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    };
    
    fetchWeather();
  }, [latitude, longitude]);

  console.log(weatherData)

  return (
    <div>
      {weatherData ? (
        <div className='w-full min-h-screen  text-zinc-300'>
          {/* <h2>Weather</h2>
          <p>Location: {weatherData.name}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p> */}
          <video className='z-50 w-full h-screen object-cover object-center' autoPlay={"autoplay"} muted={true} loop={true} playsInline={true}>
            <source src={vsrc} type='video/mp4' />
          </video>
          {/* <video className='z-50 w-full h-screen object-cover object-center' autoPlay={"autoplay"} muted={true} loop={true} playsInline={true} src={vsrc}></video> */}
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherComponent;
