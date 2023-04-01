import React, { useEffect, useState } from 'react'
import "./WeatherPopup.scss";
import io from "socket.io-client";
import { getOutsideTemperture } from '../../services/weatherService';


const WeatherPopup = () => {


    const [isVisble, setIsVisible] = useState(false);
    const [popupText, setPopupText] = useState("");
    const showPopup = async () => {
        setIsVisible(true);
        const temp = await getOutsideTemperture();

        if(temp > 30)
        {
            setPopupText("It's hot outside, maybe you should make a milkshake!");
        }
        else if(temp <= 30 && temp >= 13)
        {
            setPopupText("It's nice outside today, maybe you should go BBQ'ing!");
        } else
        {
            setPopupText("It's cold outside, maybe you should make a hot chocolate milk!")
        }
    }

    useEffect(() => {
        // const socket = io('http://localhost:5000');
        // // socket.connect();
        // // socket.on('popup', showPopup);

        // return () => socket.close();
    }, []);


    return (
        <>
            {isVisble &&
                <div className='weather-popup'>
                    <div className='fade' onClick={() => setIsVisible(false)}></div>
                    <div className='popup'>
                        {popupText}
                    </div>
                </div>
            }
        </>
    )
}

export default WeatherPopup