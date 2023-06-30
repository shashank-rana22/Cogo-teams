import { CogoMaps, L, Marker, Popup } from "@cogoport/maps";
import { useState, useEffect } from "react";

import Pointer from "./Pointer";
import Route from "./Route";

const center = [20.5937, 78.9629];
const icon = new L.Icon({
    iconUrl: "/images/default-red.svg",
    iconSize: [20, 20],
});
// NEXT_PUBLIC_MAPS_BASE_URL = https://maps.dev.cogoport.io/cogo-tiles // testing purposes
const baseLayer = [
    {
        name: "Cogo Maps",
        url: `${process.env.NEXT_PUBLIC_MAPS_BASE_URL}/{z}/{x}/{y}.png`,
        attribution:
            '<a href="https://www.cogoport.com/en/terms-and-conditions/">&copy;Cogoport T&C</a> | <a href="https://www.cogoport.com/en/privacy-policy/">Privacy & data protection</a>',
        minZoom: 0,
        maxZoom: 15,
    },
];

function MapComp({}) {
    const [map, setMap] = useState();
    const corner1 = L.latLng(-90, -200);
    const corner2 = L.latLng(90, 200);
    const bounds = L.latLngBounds(corner1, corner2);
    const curvePointLength = curvePoints?.length;

    const curvePoints = [
        [18.952, 72.948],
        [18.952, 72.948],
        [18.941361, 72.80777],
        [19, 72.4],
        [20, 70],
        [20.0838, 64.5005],
        [21.440441, 62.375976],
        [22.7, 60.4],
        [24, 59],
        [25.5, 57.1],
        [26.422112, 56.763061],
        [26.4, 56.4],
        [25.6, 55.2],
        [25.00328, 55.052067],
    ];

    const lineOptions = { color: "green" };
    return (
        <CogoMaps
            center={center}
            style={{ height: "700px", width: "100%" }}
            zoom={4}
            baseLayer={baseLayer}
        >
            <Pointer lat={57.15} lng={-2.09} iconSvg="source" map={map} />
            <Route
                positions={curvePoints}
                map={map}
                pathOptions={lineOptions}
            />
            <Pointer lat={7.56} lng={3.44} iconSvg="source" map={map} />
        </CogoMaps>
    );
}

export default MapComp;
