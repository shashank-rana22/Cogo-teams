import { ShipmentDetailContext } from '@cogoport/context';
import { useContext, useEffect } from 'react';

import Loader from './Loader';
import styles from './styles.module.css';
import TimelineItem from './TimelineItem';

function Timeline() {
	const {
		shipment_data, timelineLoading : loading, isGettingShipment,
		timelineData, getShipmentTimeline,
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
							item={timelineItem}
							consecutivelyCompleted={consecutivelyCompleted}
							isLast={totalItems === index + 1}
							key={timelineItem.milestone}
						/>
					);
				})}
			</div>
		</div>
	);
}
export default Timeline;
