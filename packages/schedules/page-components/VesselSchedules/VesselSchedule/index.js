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
	const { data, loading, refetch } = useGetVesselScheduleById({ vesselId });
	const [finalRoute, setFinalRoute] = useState(null);
	const numberOfElements = 2;
	const [tooltipRefArray, setTooltipRefArray] = useState([]);

	useEffect(() => {
		setTooltipRefArray((prev) => Array(numberOfElements)
			.fill()
			.map((_, i) => prev[i] || createRef()));
	}, [numberOfElements]);

	const [isTooltipVisible, setIsTooltipVisible] = useState(false);
	const handleMouseLeave = (index) => {
		if (tooltipRefArray[index]) {
			setIsTooltipVisible(false);
			// console.log(tooltipRefArray[index].current, 'reff', isTooltipVisible, 'exit');
		}
	};

	const handleMouseEnter = (index) => {
		const { children } = tooltipRefArray[index]?.current?.options || '';

		setIsTooltipVisible(true);
	};
	// console.log(tooltipRefArray[2]?.current, 'reff', isTooltipVisible);

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
					refetch={refetch}
				/>
				<VesselScheduleMap data={data} tooltipRefArray={tooltipRefArray} isTooltipVisible={isTooltipVisible} />
			</div>
		</>
	);
}
export default VesselScheduele;
