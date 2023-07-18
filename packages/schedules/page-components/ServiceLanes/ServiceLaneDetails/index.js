import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import BackButton from '../../common/BackButtom';
import useListServiceLanes from '../hooks/useListServiceLanes';

import RouteDetails from './RouteDetails';
import ServiceLanesMap from './ServiceLaneMap';
import ShipmentDetailsCard from './ShipmentDetailsCard';
import styles from './styles.module.css';

const ZERO = 0;
const TEN = 10;
function ServiceLaneDetails() {
	const { query } = useRouter();
	const routeId = query?.id;
	const { data, loading } = useListServiceLanes({ filters: { id: routeId } });

	const [finalRoute, setFinalRoute] = useState(null);
	return (
		<>
			<BackButton toPush="service-lanes" title="Back To Service Lane" />
			<ShipmentDetailsCard data={data} loading={loading} />
			<div className={styles.partition}>
				<RouteDetails
					route={data?.[ZERO]?.service_lane_links}
					dayOfWeek={data?.[ZERO]?.day_of_week || TEN}
					finalRoute={finalRoute}
					setFinalRoute={setFinalRoute}
					loading={loading}
					data={data}
				/>
				<ServiceLanesMap data={data} />
			</div>
		</>
	);
}

export default ServiceLaneDetails;
