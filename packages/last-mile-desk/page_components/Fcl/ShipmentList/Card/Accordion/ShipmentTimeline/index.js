import ShipmentLoader from '../../../../../../commons/ShipmentLoader';

import styles from './styles.module.css';
import TimelineItem from './TimelineItem';

function ShipmentTimeline({ shipmentTimelineData, shipmentTimelineLoading }) {
	const consecutivelyCompleted = true;

	return (
		<div className={styles.div_container}>
			<div className={styles.container}>
				{shipmentTimelineLoading ? <ShipmentLoader /> : shipmentTimelineData.map((item, index) => {
					const isLast = shipmentTimelineData.length === (index + 1);
					return (
						<TimelineItem
							key={item.id}
							item={item}
							isLast={isLast}
							consecutivelyCompleted={consecutivelyCompleted}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default ShipmentTimeline;
