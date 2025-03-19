import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Line } from "react-chartjs-2";
import axios from 'axios';
// Register required components
ChartJS.register(
    CategoryScale,
    LinearScale,  // Fixes "linear is not a registered scale"
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const ELDLog = () => {
    const [logData, setLogData] = useState(null);

    useEffect(() => {
        axios.post("http://127.0.0.1:8000/generate_eld_log/", {
            driver_id: 1,
            trip_hours: [
                ["00:00", "06:00", "driving"],
                ["06:00", "07:00", "on_duty"],
                ["07:00", "09:00", "off_duty"],
                ["09:00", "15:00", "driving"],
                ["15:00", "16:00", "on_duty"],
                ["16:00", "20:00", "off_duty"],
            ]
        }).then(response => {
            setLogData(response.data);
        });
    }, []);

    if (!logData) return <div>Loading...</div>;

    // Generate chart data
    const timeLabels = [...Array(25).keys()].map(h => `${h}:00`);
    const dataset = timeLabels.map(hour => {
        for (let [start, end, status] of [
            ...logData.driving_hours,
            ...logData.on_duty_hours,
            ...logData.off_duty_hours,
            ...logData.sleeper_berth_hours
        ]) {
            if (hour >= parseInt(start.split(':')[0]) && hour < parseInt(end.split(':')[0])) {
                return status === "driving" ? 3 :
                       status === "on_duty" ? 2 :
                       status === "off_duty" ? 1 : 0;
            }
        }
        return 0; // Default Off Duty
    });

    const data = {
        labels: timeLabels,
        datasets: [{
            label: "ELD Log",
            data: dataset,
            borderColor: 'blue',
            backgroundColor: 'rgba(0,0,255,0.1)',
            fill: true,
            stepped: true,
        }]
    };

    return (
        <div>
            <h2>ELD Log Graph</h2>
            <Line data={data} options={{
                scales: { y: { ticks: { stepSize: 1, callback: (value) => ["Off Duty", "Sleeper", "On Duty", "Driving"][value] } } },
                elements: { line: { tension: 0 } }
            }} />
        </div>
    );
};

export default ELDLog;
