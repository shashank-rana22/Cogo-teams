import { CogoMaps, L, Marker, Popup } from "@cogoport/maps";
import { useState, useEffect, useContext } from "react";

import Pointer from "./Pointer";
import Route from "./Route";
import { isEmpty } from "@cogoport/utils";

const center = [20.5937, 78.9629];
const icon = new L.Icon({
    iconUrl: "/images/default-red.svg",
    iconSize: [20, 20],
});
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

function MapComp({ path, points, bounds, setBounds }) {
    const [map, setMap] = useState();

    const curvePointLength = path?.length;

    useEffect(() => {
        if (!isEmpty(bounds) && map && bounds instanceof L.LatLngBounds) {
            map?.fitBounds(bounds);
        }
    }, [bounds, map]);

    const lineOptions = { color: "green" };
    return (
        <CogoMaps
            center={center}
            style={{ height: "700px", width: "100%" }}
            zoom={4}
            baseLayer={baseLayer}
            setMap={setMap}
        >
            <Pointer
                points={points}
                iconSvg="source"
                map={map}
                setBounds={setBounds}
            />
            <Route positions={path} map={map} pathOptions={lineOptions} />
        </CogoMaps>
    );
}

export default MapComp;
