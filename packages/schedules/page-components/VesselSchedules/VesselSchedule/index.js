import { useRouter } from '@cogoport/next';
import { useState, useRef, useEffect, createRef } from 'react';

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
	const NUMBER_OF_ELEMENTS = 2;
	const [tooltipRefArray, setTooltipRefArray] = useState([]);

	useEffect(() => {
		setTooltipRefArray((prev) => Array(NUMBER_OF_ELEMENTS)
			.fill()
			.map((_, i) => prev[i] || createRef()));
	}, [NUMBER_OF_ELEMENTS]);

	const [isTooltipVisible, setIsTooltipVisible] = useState(false);
	const handleMouseLeave = (index) => {
		if (tooltipRefArray[index]) {
			setIsTooltipVisible(false);
		}
	};

	const handleMouseEnter = (index) => {
		const { children } = tooltipRefArray[index]?.current?.options || '';

		setIsTooltipVisible(true);
	};

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
					handleMouseEnter={handleMouseEnter}
					handleMouseLeave={handleMouseLeave}
				/>
				<VesselScheduleMap data={data} tooltipRefArray={tooltipRefArray} isTooltipVisible={isTooltipVisible} />
			</div>
		</>
	);
}
export default VesselScheduele;
