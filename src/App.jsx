import React, { useEffect, useState } from 'react'
import './App.css'
import { useGeolocation } from "@uidotdev/usehooks";

function App() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null
  })



  const state = useGeolocation();
  const getLocation = () => {
    setLocation({
      latitude: state.latitude,
      longitude: state.longitude
    })
    console.log(state)
  }
  // const locationGot = (position) => {
  //   setLocation({
  //     latitude: position.coords.latitude,
  //     longitude: position.coords.longitude
  //   })
  // }
  // const locationNotGet = () => {
  //   console.log("There is some issue!!!")
  // }

  // const getLocation = async() => {
  //   navigator.geolocation.getCurrentPosition(locationGot, locationNotGet);
  // }

  useEffect(() => {
    getLocation()
  }, [location])


  // console.log(location)


  return (
    <>
      <h1 className='text-4xl font-bold'>Moin Ahmad</h1>
      {/* <button className='bg-black text-white rounded-sm p-2'>Get Location</button> */}
      {
        location && (
          <>
            <p>{location.latitude}</p>
            <p>{location.longitude}</p>
          </>
        )
      }

    </>
  )
}

export default App
