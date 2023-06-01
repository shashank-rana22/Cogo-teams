import { ShipmentDetailContext } from '@cogoport/context';
import { useContext, useEffect, useMemo } from 'react';

import Loader from './Loader';
import styles from './styles.module.css';
import TimelineItem from './TimelineItem';

function Timeline() {
	const {
		shipment_data,
		timelineData,
		timelineLoading: loading,
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

	const totalItems = (filteredTimelineData || []).length;
	const mapKeys = useMemo(() => Array(totalItems).fill(null).map(() => Math.random()), [totalItems]);

	let consecutivelyCompleted = true;

	if (loading) {
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
							isLast={totalItems === index + 1}
						/>
					);
				})}
			</div>
		</div>
	);
}
export default Timeline;
