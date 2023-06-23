import BackButton from "./BackButtom";

function MapTab({ mapTab, setMapTab }) {
    return (
        <>
            <BackButton mapTab={mapTab} setMapTab={setMapTab} />
        </>
    );
}

export default MapTab;
