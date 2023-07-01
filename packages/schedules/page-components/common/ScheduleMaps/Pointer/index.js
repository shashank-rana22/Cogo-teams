import { L, Marker } from "@cogoport/maps";
import { useEffect } from "react";

const ICON_SIZE = 24;
const ICON_ANCHOR = 12.75;
function Pointer({ points, iconSvg = "location", map, setBounds = () => {} }) {
    const icon = L.icon({
        iconUrl: `https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/${iconSvg}.svg`,
        iconSize: [ICON_SIZE, ICON_SIZE],
        iconAnchor: [ICON_ANCHOR, ICON_ANCHOR],
    });

    useEffect(() => {
        const bounds = new L.LatLngBounds(points);
        setBounds(bounds);
    }, [JSON.stringify(points)]);

    return points?.map((coordinates) => (
        <>
            <Marker position={coordinates} icon={icon} />
        </>
    ));
}

export default Pointer;
