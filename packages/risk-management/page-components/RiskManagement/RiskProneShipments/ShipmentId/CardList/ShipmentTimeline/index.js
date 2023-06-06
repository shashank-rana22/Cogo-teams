import { useEffect } from 'react';

import ShipmentLoader from '../../../../common/ShipmentLoader';
import useGetShipmentTimeLine from '../../../../hooks/useGetShipmentTimline';

import styles from './styles.module.css';
import TimelineItem from './TimeLineItem';

function ShipmentTimeline({ itemData, isAccordionActive }) {
	const {
		shipmentTimelineData = [],
		shipmentTimelineLoading,
		getShipmentTimeline = () => {},
	} =		 useGetShipmentTimeLine({ itemData });
	const consecutivelyCompleted = true;

	useEffect(() => {
		if (isAccordionActive && itemData?.id) {
			getShipmentTimeline();
		}
	}, [getShipmentTimeline, isAccordionActive, itemData?.id]);

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
