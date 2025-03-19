// import React, { useEffect, useState } from "react";

// const LogHistory = () => {
//     const [logs, setLogs] = useState([]);

//     useEffect(() => {
//         // Fetch ELD logs from the API
//         const fetchLogs = async () => {
//             try {
//                 const response = await fetch("http://127.0.0.1:8000/api/eldlogs/"); // Adjust this URL to your backend's endpoint
//                 const data = await response.json();
//                 setLogs(data); // Assuming data is an array of log objects
//             } catch (error) {
//                 console.error("Error fetching logs:", error);
//             }
//         };

//         fetchLogs();
//     }, []);
//     console.log("checking logs")
//     console.log(logs.length)
//     console.log(logs)
//     return (
//         <div>
//             <h2>ELD Log Sheet</h2>
//             <table border="1">
//                 <thead>
//                     <tr>
//                         <th>Trip</th>
//                         <th>Date</th>
//                         <th>Time</th>
//                         <th>Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {logs.length > 0 ? (
//                         logs.map((log) => (
//                             log.log_data.map((entry, index) => (
//                                 <tr key={`${log.id}-${index}`}>
//                                     <td>{index === 0 ? log.trip : ""}</td> {/* Show trip only once per group */}
//                                     <td>{index === 0 ? log.date : ""}</td> {/* Show date only once per group */}
//                                     <td>{entry.time}</td>
//                                     <td>{entry.status}</td>
//                                 </tr>
//                             ))
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="4">No logs available</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>

//     );
// };

// export default LogHistory;
import React, { useEffect, useState } from "react";

const LogHistory = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        // Fetch ELD logs from the API
        const fetchLogs = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/eldlogs/");
                const data = await response.json();
                setLogs(data); // Assuming data is an array of log objects
            } catch (error) {
                console.error("Error fetching logs:", error);
            }
        };

        fetchLogs();
    }, []);

    if (!logs.length) {
        return <p>Loading logs...</p>;
    }

    return (
        <div>
            <h2>ELD Log History</h2>
            {logs.map((log) => (
                <div key={log.id} style={styles.logContainer}>
                    <h3>Trip: {log.trip}</h3>
                    <p>Date: {log.date}</p>
                    
                    <div style={styles.logGraph}>
                        {log.log_data.map((entry, index) => (
                            <div
                                key={index}
                                style={{
                                    ...styles.logEntry,
                                    backgroundColor: getStatusColor(entry.status),
                                }}
                            >
                                <p><strong>{entry.time}</strong></p>
                                <p>{entry.status}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

// Function to assign colors based on status
const getStatusColor = (status) => {
    switch (status) {
        case "OFF":
            return "#d9534f"; // Red for Off Duty
        case "SB":
            return "#5bc0de"; // Blue for Sleeper Berth
        case "D":
            return "#5cb85c"; // Green for Driving
        case "ON":
            return "#f0ad4e"; // Yellow for On Duty
        default:
            return "#ddd";
    }
};

// CSS styles for a graphical log representation
const styles = {
    logContainer: {
        border: "2px solid black",
        padding: "10px",
        marginBottom: "20px",
        backgroundColor: "#f9f9f9",
    },
    logGraph: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid black",
        padding: "10px",
    },
    logEntry: {
        width: "100px",
        height: "50px",
        textAlign: "center",
        color: "black",
        padding: "5px",
        borderRadius: "5px",
        fontWeight: "bold",
    },
};

export default LogHistory;
