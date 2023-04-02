import React, { useEffect, useState } from 'react'
import { getAuthorsStats, getTagsStats } from '../../services/statisticsService';
import PieChart from './PieChart/PieChart';
import "./StatisticsPage.scss";
import io from "socket.io-client";


const StatisticsPage = () => {
    const [authorsStats, setAuthorsStats] = useState([]);
    const [tagsStats, setTagsStats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const authorsStatsData = await getAuthorsStats();
            const tagsStatsData = await getTagsStats();
            
            setAuthorsStats(authorsStatsData);
            setTagsStats(tagsStatsData);
        }
        fetchData();

        const socket = io('http://localhost:5000');
        socket.connect();
        socket.on('stat', ()=>{
            console.log('whatttt!!!!!!!')
            fetchData()
        });

        return () => socket.close();
    }, [])

    return (
        <main className='statistics-page'>
            <span className='chart-container'>
                <h4>Posts per author</h4>
                <PieChart id="authors-chart" data={authorsStats} />
            </span>
            {/* <span className='chart-container'>
                <h4>Posts per tag</h4>
                <PieChart id="tags-chart" data={tagsStats} />
            </span> */}
        </main>

    )
}

export default StatisticsPage