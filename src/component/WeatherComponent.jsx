import React, { useState, useEffect } from 'react';
import few_clouds from '../assets/weather videos/few clouds.mp4'
import haze from '../assets/weather videos/haze.mp4'
import clear_sky from '../assets/weather videos/clear sky.mp4'
import mist from '../assets/weather videos/mist.mp4'
import rain from '../assets/weather videos/rain.mp4'
import broken_clouds from '../assets/weather videos/broken clouds.mp4'
import scattered_clouds from '../assets/weather videos/scattered clouds.mp4'
import shower_rain from '../assets/weather videos/shower rain.mp4'
import overcast_clouds from '../assets/weather videos/overcast clouds.mp4'
import light_rain from '../assets/weather videos/light rain.mp4'

const WeatherComponent = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [vsrc, setVsrc] = useState('')


  // 1st useEffect for getting user's position: 
  useEffect(() => {

    // fetching the latitude and longitude from geolocation object
    const getLocation = () => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude)
          setLongitude(position.coords.longitude)
        }, (error) => {
          console.log("Geolocation is not defined or supported!!!", error)
        })
      }
    }

    // Call the function to get geolocation
    getLocation();
    
    const checkWeather = () => {
      if(weatherData !== null){
        switch(weatherData.weather[0].description){
          case "clear sky": setVsrc(clear_sky); break;
          case "few clouds": setVsrc(few_clouds);break;
          case "scattered clouds": setVsrc(scattered_clouds);break;
          case "broken clouds": setVsrc(broken_clouds);break;
          case "shower rain": setVsrc(shower_rain);break;
          case "rain": setVsrc(rain);break;
          case "mist": setVsrc(mist);break;
          case "overcast clouds": setVsrc(overcast_clouds);break;
          case "light rain": setVsrc(light_rain);break;
        }
      }
    }

    // checking weather condition and applying video files acc. to the weather desciption.
    checkWeather();

  }, [weatherData]);


  // 2nd useEffect for getting weather according to their latitude and longitude
  
  useEffect(() => {
    // Fetch weather data based on latitude and longitude
    const fetchWeather = async () => {
      if (latitude !== null && longitude !== null) {
        const api_key = `8f271e955e1286fc6963f8c4637d9bc7` // Your API key from OpenWeatherMap or WeatherAPI
        const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`;
        
        try {
          const response = await fetch(api_url);
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
    <div className='w-full min-h-screen'>
      {weatherData ? (
        <div className='w-full h-screen  text-zinc-300'>
          {/* <h2>Weather</h2>
          <p>Location: {weatherData.name}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p> */}
          {/* <video className='z-50 w-full h-screen object-cover object-center' autoPlay={"autoplay"} muted={true} loop={true} playsInline={true}>
            <source src={vsrc} type='video/mp4' />
          </video> */}
          <video className='z-50 w-full h-screen object-cover object-center' autoPlay={"autoplay"} muted={true} loop={true} playsInline={true} src={vsrc}></video>
        </div>
      ) : (
        <div className='w-full h-screen flex items-center justify-center'>
          <h1 className='text-6xl font-bold'>Loading weather data...</h1>
          <p>Shivam Enter...</p>
          <h1>moin gandu</h1>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
