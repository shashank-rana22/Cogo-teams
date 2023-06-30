import { useRouter } from "@cogoport/next";
import BackButton from "./BackButtom";
import RouteDetails from "./RouteDetails";
import useListServiceLanes from "../ServiceLanesList/hooks/useListServiceLanes";
import ShipmentDetailsCard from "./ShipmentDetailsCard";
import ServiceLanesMap from "./ServiceLaneMap";
import styles from "./styles.module.css";
function ServiceLaneDetails() {
    const { query } = useRouter();
    const routeId = query?.id;
    const { data, loading } = useListServiceLanes({ routeId });

    return (
        <>
            <BackButton />
            <ShipmentDetailsCard data={data} loading={loading} />
            <div className={styles.partition}>
                <RouteDetails
                    route={data?.[0]?.service_lane_links}
                    dayOfWeek={data?.[0]?.day_of_week || 10}
                />
                <ServiceLanesMap />
            </div>
        </>
    );
}

export default ServiceLaneDetails;
