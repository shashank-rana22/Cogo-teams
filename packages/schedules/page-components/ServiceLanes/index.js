import ServiceLanesList from "./ServiceLanesList";
import { useState } from "react";
import ServiceLaneDetails from "./ServiceLaneDetails";

function ServiceLane() {
    const [mapTab, setMapTab] = useState(null);
    return (
        <>
            {!mapTab ? (
                <ServiceLanesList mapTab={mapTab} setMapTab={setMapTab} />
            ) : (
                <ServiceLaneDetails mapTab={mapTab} setMapTab={setMapTab} />
            )}
        </>
    );
}
export default ServiceLane;
