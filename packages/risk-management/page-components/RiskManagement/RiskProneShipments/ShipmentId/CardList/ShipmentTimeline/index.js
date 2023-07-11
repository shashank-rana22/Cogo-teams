import { useEffect } from 'react';

import ShipmentLoader from '../../../../common/ShipmentLoader';
import useGetShipmentTimeLine from '../../../../hooks/useGetShipmentTimline';

import styles from './styles.module.css';
import TimelineItem from './TimeLineItem';

const NEXT_INDEX_TIMELINE_DATA = 1;
function ShipmentTimeline({ itemData = {}, isAccordionActive = false }) {
	const {
		shipmentTimelineData = [],
		shipmentTimelineLoading,
		getShipmentTimeline = () => {},
	} =	useGetShipmentTimeLine({ itemData });

	useEffect(() => {
		if (isAccordionActive && itemData?.id) {
			getShipmentTimeline();
		}
	}, [getShipmentTimeline, isAccordionActive, itemData?.id]);

	return (
		<div className={styles.div_container}>
			<div className={styles.container}>
				{shipmentTimelineLoading ? <ShipmentLoader /> : shipmentTimelineData.map((item, index) => {
					const isLast = shipmentTimelineData.length === (index + NEXT_INDEX_TIMELINE_DATA);
					return (
						<TimelineItem
							key={item.id}
							item={item}
							isLast={isLast}
							consecutivelyCompleted
						/>
					);
				})}
			</div>
		</div>
	);
}

export default ShipmentTimeline;
