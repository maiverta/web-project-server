import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllLocations } from '../../services/mapService';

const MapLocationPage = () => {
  //default value
  const [location, setLocation] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllLocations();
      setLocation(data[0].src);
    }
    fetchData();
  }, [])

  return (
    <main className='edit-author-page'>
      {location &&
        <iframe src={location}
          width="100%"
          height="800"
        >
        </iframe>
      }
    </main>
  )
}

export default MapLocationPage