import React from 'react'
import { ReactBingmaps } from 'react-bingmaps';

const BingMapPage = () => {

    return (
        <main className='react-bingmaps'>
            <ReactBingmaps
                bingmapKey="AhvP9NzHNfT1AM7CYjkmuSiRmHxBvhxAynqMBGkqfOP1pXDcP5msdoKZKac720Fq"
                center = {[31.0827, 34.2707]}
                mapTypeId = {"road"}
                navigationBarMode = {"compact"}
                supportedMapTypes = {["road","canvasDark"]}
                heading = {180}
                zoom = {5}
                disableStreetside={true}
                pushPins = {
                    [
                        {
                            "location":[13.0827, 80.2707],
                            "option":{ color: 'red' },
                            "addHandler": {"type" : "click"}
                        }
                    ]
                }
            ></ReactBingmaps>
    </main>
    )
}


export default BingMapPage