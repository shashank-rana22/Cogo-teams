import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import BackButton from '../BackButtom';
import useGetVesselScheduleById from '../hooks/useGetVesselScheduleById';

import Card from './Card';
import RouteDetails from './RouteDetails';
import styles from './styles.module.css';
import VesselScheduleMap from './VesselSchedulesMap';

function VesselScheduele() {
	const { query } = useRouter();
	const vesselId = query?.id;
	const { data } = useGetVesselScheduleById({ vesselId });
	const [finalRoute, setFinalRoute] = useState(null);
	return (
		<>
			<BackButton />
			<div className={styles.back_button} />
			<Card vessel={data} />
			<div className={styles.flex}>
				<RouteDetails route={data?.vessel_schedule_link} finalRoute={finalRoute} setFinalRoute={setFinalRoute} />
				<VesselScheduleMap data={data} />
			</div>
		</>
	);
}
export default VesselScheduele;
