
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TripForm from "./component/TripForm";
import MapDisplay from "./component/MapDisplay";
import LogSheet from "./component/LogSheet";
import NavBar from "./component/navbar";
import LogHistory from "./component/loghistory";

const App = () => {
    const [tripData, setTripData] = useState(null);

    return (
        <Router>
            {/* <NavBar /> */}
           
            <NavBar />
            <Routes>
                {/* ✅ Only show TripForm on the homepage */}
                <Route path="/" element={!tripData ? <TripForm setTripData={setTripData} /> : null} />

                {/* ✅ Only show navigation links if trip data exists */}
                {tripData && (
                    <Route
                        path="/"
                        element={
                            <nav style={styles.navContainer}>
                                <Link to="/map" style={styles.navLink}>View Map</Link>
                                <Link to="/logsheet" style={styles.navLink}>View Log Sheet</Link>
                            </nav>
                        }
                    />
                )}
            </Routes>
            <Routes>
                <Route path="/map" element={tripData ? <MapDisplay route={tripData.route} /> : <p>No trip data yet</p>} />
                <Route path="/logsheet" element={tripData ? <LogSheet logs={tripData.eld_logs} /> : <p>No trip data yet</p>} />
                <Route path="/loghistory" Component={LogHistory} />
            </Routes>
        </Router>
    );
};

// CSS styles for centering the links
const styles = {
    navContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        marginTop: "20px",
    },
    navLink: {
        textDecoration: "none",
        fontSize: "20px",
        fontWeight: "bold",
        color: "blue",
        padding: "10px 20px",
        border: "2px solid blue",
        borderRadius: "5px",
        transition: "0.3s",
    },
};

export default App;
