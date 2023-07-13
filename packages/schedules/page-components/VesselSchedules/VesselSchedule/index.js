import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import BackButton from '../../common/BackButtom';
import useGetVesselScheduleById from '../hooks/useGetVesselScheduleById';

import Card from './Card';
import RouteDetails from './RouteDetails';
import styles from './styles.module.css';
import VesselScheduleMap from './VesselSchedulesMap';

function VesselScheduele() {
	const { query } = useRouter();
	const vesselId = query?.id;
	const { data, loading } = useGetVesselScheduleById({ vesselId });
	const [finalRoute, setFinalRoute] = useState(null);
	return (
		<>
			<BackButton title="Back To Vessel Schedule" toPush="vessel-schedules" />
			<div className={styles.back_button} />
			<Card vessel={data} loading={loading} />
			<div className={styles.flex}>
				<RouteDetails
					data={data}
					route={data?.vessel_schedule_link}
					finalRoute={finalRoute}
					setFinalRoute={setFinalRoute}
				/>
				<VesselScheduleMap data={data} />
			</div>
		</>
	);
}
export default VesselScheduele;
