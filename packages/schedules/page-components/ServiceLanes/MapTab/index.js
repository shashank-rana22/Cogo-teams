import { useRouter } from "@cogoport/next";
import BackButton from "./BackButtom";

import useListServiceLanes from "../ServiceLanesList/hooks/useListServiceLanes";
import ShipmentDetailsCard from "./ShipmentDetailsCard";

function MapTab() {
    const { query } = useRouter();

    const routeId = query?.id;

    const { data, loading } = useListServiceLanes({ routeId });

    return (
        <>
            <BackButton />
            <ShipmentDetailsCard data={data} loading={loading} />
        </>
    );
}

export default MapTab;
