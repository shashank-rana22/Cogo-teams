import { useRouter } from "@cogoport/next";
import BackButton from "./BackButtom";
import RouteDetails from "./RouteDetails";

import useListServiceLanes from "../ServiceLanesList/hooks/useListServiceLanes";
import ShipmentDetailsCard from "./ShipmentDetailsCard";

function MapTab() {
    const { query } = useRouter();
    const routeId = query?.id;
    const { data, loading } = useListServiceLanes({ routeId });
    console.log("route: ", data);

    return (
        <>
            <BackButton />
            <ShipmentDetailsCard data={data} loading={loading} />
            <RouteDetails route={data?.[0]?.service_lane_links} />
        </>
    );
}

export default MapTab;
