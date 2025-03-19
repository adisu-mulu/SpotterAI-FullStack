// import React, { useEffect } from "react";
// import mapboxgl from "mapbox-gl";

// mapboxgl.accessToken = "your_mapbox_api_key";

// const MapDisplay = ({ route }) => {
//     useEffect(() => {
//         const map = new mapboxgl.Map({
//             container: "map",
//             style: "mapbox://styles/mapbox/streets-v11",
//             center: route?.waypoints?.[0] || [-98, 39], // Default center
//             zoom: 4,
//         });

//         if (route?.waypoints) {
//             const coordinates = route.waypoints.map((coord) => [coord[0], coord[1]]);
//             const geojson = {
//                 type: "Feature",
//                 geometry: { type: "LineString", coordinates },
//             };

//             map.on("load", () => {
//                 map.addSource("route", { type: "geojson", data: geojson });
//                 map.addLayer({
//                     id: "route",
//                     type: "line",
//                     source: "route",
//                     layout: { "line-join": "round", "line-cap": "round" },
//                     paint: { "line-color": "#3887be", "line-width": 5 },
//                 });

//                 route.waypoints.forEach((coord) => {
//                     new mapboxgl.Marker().setLngLat(coord).addTo(map);
//                 });
//             });
//         }

//         return () => map.remove();
//     }, [route]);

//     return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
// };

// export default MapDisplay;

import React from "react";
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapDisplay = ({ route }) => {
    // Default center (if no route provided)
    const defaultCenter = route?.waypoints?.[0] || [5.216412, -0.808532]; 

    return (
        <MapContainer
            center={defaultCenter}
            zoom={6}
            style={{ width: "100%", height: "400px" }}
        >
            {/* Use OpenStreetMap (FREE tile layer) */}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Add route line */}
            {route?.waypoints && (
                <>
                    <Polyline
                        positions={route.waypoints}
                        pathOptions={{ color: "blue", weight: 5 }}
                    />
                    {route.waypoints.map((coord, index) => (
                        <Marker key={index} position={coord} />
                    ))}
                </>
            )}
        </MapContainer>
    );
};

export default MapDisplay;
