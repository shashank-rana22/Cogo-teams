import { Polyline, L } from "@cogoport/maps";
import { useEffect } from "react";

function Route({ positions, map, pathOptions, setBounds = () => {} }) {
    // useEffect(() => {
    //     const bounds = new L.LatLngBounds(positions);
    //     setBounds(bounds);
    // }, [JSON.stringify(positions)]);

    return (
        <Polyline
            key={JSON.stringify(positions)}
            positions={positions}
            pathOptions={pathOptions}
            eventHandlers={{
                add: (e) => {
                    if (map) map?.fitBounds(e.target?.getBounds());
                },
            }}
        />
    );
}
export default Route;
