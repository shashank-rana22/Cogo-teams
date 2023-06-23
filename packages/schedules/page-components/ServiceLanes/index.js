import ServiceLanesList from "./ServiceLanesList";
import { useState } from "react";
import MapTab from "./MapTab";

function ServiceLane() {
    const [mapTab, setMapTab] = useState(null);
    return (
        <>
            {!mapTab ? (
                <ServiceLanesList mapTab={mapTab} setMapTab={setMapTab} />
            ) : (
                <MapTab mapTab={mapTab} setMapTab={setMapTab} />
            )}
        </>
    );
}
export default ServiceLane;
