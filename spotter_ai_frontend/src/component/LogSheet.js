// import React from "react";

// const LogSheet = ({ logs }) => {
//     return (
//         <div>
//             <h2>ELD Log Sheet</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Time</th>
//                         <th>Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {logs.map((log, index) => (
//                         <tr key={index}>
//                             <td>{log.time}</td>
//                             <td>{log.status}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default LogSheet;
import React from "react";

const LogSheet = ({ logs }) => {
    if (!logs || logs.length === 0) {
        return <p>No log data available</p>;
    }

    return (
        <div style={styles.container}>
            <h2>ELD Log Sheet</h2>

            {/* Graphical ELD Log Representation */}
            <div style={styles.logGraph}>
                {logs.map((log, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.logEntry,
                            backgroundColor: getStatusColor(log.status),
                        }}
                    >
                        <p><strong>{log.time}</strong></p>
                        <p>{log.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Function to assign colors based on ELD status
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

// Styles for graphical log format
const styles = {
    container: {
        border: "2px solid black",
        padding: "10px",
        marginBottom: "20px",
        backgroundColor: "#f9f9f9",
        textAlign: "center",
    },
    logGraph: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        border: "1px solid black",
        padding: "10px",
        flexWrap: "wrap",
    },
    logEntry: {
        width: "100px",
        height: "50px",
        textAlign: "center",
        color: "white",
        padding: "5px",
        borderRadius: "5px",
        fontWeight: "bold",
        margin: "5px",
    },
};

export default LogSheet;
