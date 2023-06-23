import BackButton from "./BackButtom";
import ShippingDetails from "./ShippmentDetails";

function MapTab({ mapTab, setMapTab }) {
    return (
        <>
            <BackButton mapTab={mapTab} setMapTab={setMapTab} />
            <ShippingDetails mapTab={mapTab} />
        </>
    );
}

export default MapTab;
