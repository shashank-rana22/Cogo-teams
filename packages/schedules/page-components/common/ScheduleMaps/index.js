import { CogoMaps, L, Marker, Popup } from "@cogoport/maps";
import { useState, useEffect } from "react";

const center = [20.5937, 78.9629];
const icon = new L.Icon({
    iconUrl: "/images/default-red.svg",
    iconSize: [20, 20],
});
const baseLayer = [
    {
        name: "Cogo Maps",
        url: `${process.env.NEXT_PUBLIC_MAPS_BASE_URL}/{z}/{x}/{y}.png`,
        attribution: "",
        minZoom: 0,
        maxZoom: 15,
    },
];

const lineOptions = { color: "#0f0" };
const remainingRoutelineOptions = { color: "#00f" };
const center = { lat: "28.679079", lng: "77.069710" };

function ScheduleMaps({
    completedPoints,
    remainingPoints,
    curvePoints,
    currentMilestone,
}) {
    const [map, setMap] = useState();
    const corner1 = L.latLng(-90, -200);
    const corner2 = L.latLng(90, 200);
    const bounds = L.latLngBounds(corner1, corner2);
    const curvePointLength = curvePoints?.length;

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (map) map.invalidateSize(true);
        }, 200);
        return () => {
            clearTimeout(timeout);
        };
    }, [map]);

    useEffect(() => {
        if (map) {
            map.setMaxBounds(bounds);
            map?.attributionControl?.setPrefix(
                '<a href="https://www.cogoport.com/en/terms-and-conditions/" target="_blank">&copy; Cogoport T&C</a>|' +
                    '<a href="https://www.cogoport.com/en/privacy-policy/" target="_blank">Privacy & data protection</a>|' +
                    '<a href="https://leafletjs.com/" target="_blank" >Leaflet</a>'
            );
        }
    }, [map, bounds]);

    return (
        <CogoMaps
            key={JSON.stringify(curvePoints)}
            style={{ height: "700px", width: "100%" }}
            baseLayer={LAYER}
            zoom={2.9}
            minZoom={2}
            center={center}
            setMap={setMap}
            maxBoundsViscosity={1}
        >
            {curvePoints?.length > 0 && (
                <Pointer
                    lat={curvePoints?.[0]?.lat}
                    lng={curvePoints?.[0]?.lng}
                    iconSvg="source"
                    map={map}
                />
            )}

            {currentMilestone && (
                <Pointer
                    lat={currentMilestone?.lat}
                    lng={currentMilestone?.lng}
                    iconSvg="current-location"
                    map={map}
                />
            )}
            {completedPoints?.length > 0 && (
                <Route
                    positions={completedPoints}
                    map={map}
                    pathOptions={lineOptions}
                />
            )}
            {remainingPoints?.length > 0 && (
                <Route
                    positions={remainingPoints}
                    map={map}
                    pathOptions={remainingRoutelineOptions}
                />
            )}
            {remainingPoints?.length === 0 && curvePoints?.length > 0 && (
                <Route
                    positions={curvePoints}
                    map={map}
                    pathOptions={lineOptions}
                />
            )}
            {curvePoints?.length > 0 && (
                <Pointer
                    lat={curvePoints?.[curvePointLength - 1]?.lat}
                    lng={curvePoints?.[curvePointLength - 1]?.lng}
                    iconSvg="destination-icon"
                    map={map}
                />
            )}
        </CogoMaps>
    );
}

export default ScheduleMaps;
