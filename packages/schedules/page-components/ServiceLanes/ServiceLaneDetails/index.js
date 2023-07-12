import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useListServiceLanes from '../ServiceLanesList/hooks/useListServiceLanes';

import BackButton from './BackButtom';
import RouteDetails from './RouteDetails';
import ServiceLanesMap from './ServiceLaneMap';
import ShipmentDetailsCard from './ShipmentDetailsCard';
import styles from './styles.module.css';

function ServiceLaneDetails() {
	const { query } = useRouter();
	const routeId = query?.id;
	const { data, loading } = useListServiceLanes({ routeId });
	const [finalRoute, setFinalRoute] = useState(null);
	return (
		<>
			<BackButton />
			<ShipmentDetailsCard data={data} loading={loading} />
			<div className={styles.partition}>
				<RouteDetails
					route={data?.[0]?.service_lane_links}
					dayOfWeek={data?.[0]?.day_of_week || 10}
					finalRoute={finalRoute}
					setFinalRoute={setFinalRoute}
				/>
				<ServiceLanesMap data={data} />
			</div>
		</>
	);
}

export default ServiceLaneDetails;
