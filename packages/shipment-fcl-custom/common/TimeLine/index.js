import { ShipmentDetailContext } from '@cogoport/context';
import { useContext, useEffect, useMemo } from 'react';

import Loader from './Loader';
import styles from './styles.module.css';
import TimelineItem from './TimelineItem';

const END_VALUE = 1;

function Timeline() {
	const {
		shipment_data,
		timelineData,
		timelineLoading: loading,
		isGettingShipment,
		getShipmentTimeline,
	} = useContext(ShipmentDetailContext);

	useEffect(() => {
		if (shipment_data?.id) {
			getShipmentTimeline();
		}
	}, [getShipmentTimeline, shipment_data?.id]);

	const filteredTimelineData = (timelineData || []).filter(
		(timelineItem) => !(shipment_data?.services || []).includes(timelineItem.service_type),
	);

	const totalItems = (timelineData || []).length;
	const mapKeys = useMemo(() => Array(totalItems).fill(null).map(() => Math.random()), [totalItems]);

	let consecutivelyCompleted = true;

	if (isGettingShipment || loading) {
		return (
			<div className={styles.container}>
				<div className={styles.list_container}>
					<Loader />
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.list_container}>
				{(filteredTimelineData || []).map((timelineItem, index) => {
					consecutivelyCompleted = consecutivelyCompleted && timelineItem.completed_on;
					return (
						<TimelineItem
							key={mapKeys[index]}
							item={timelineItem}
							consecutivelyCompleted={consecutivelyCompleted}
							isLast={totalItems === index + END_VALUE}
						/>
					);
				})}
			</div>
		</div>
	);
}
export default Timeline;
