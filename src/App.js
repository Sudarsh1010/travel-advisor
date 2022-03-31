import React, { useEffect, useState } from 'react'
import { CssBaseline, Grid } from '@material-ui/core';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

import { getPlacesData } from './api'

const App = () => {
  const [places, setPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({});


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude })
    })
  }, []);

  useEffect(() => {
    getPlacesData(bounds.sw, bounds.ne)
      .then((data) => {
        setPlaces(data)
      })
  }, [coords, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            places={places}
            childClicked={childClicked}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            places={places}
            setCoords={setCoords}
            setBounds={setBounds}
            coords={coords}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default App