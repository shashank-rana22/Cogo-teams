// import { IcMFtick } from '@cogoport/icons-react';
// import React from 'react';

// import styles from './styles.module.css';

// function ShipmentTimline() {
// 	return (
// 		<div className={styles.div_container}>
// 			<div className={styles.container}>
// 				<div className={styles.tick_circle}>
// 					<div>
// 						<IcMFtick
// 							height={20}
// 							width={20}
// 							color="#F68B21"
// 						/>
// 					</div>
// 					<div className={styles.text}>
// 						Pick Up
// 					</div>
// 					<div className={styles.text}>
// 						Cut Off : 20 March 2022
// 					</div>
// 					<div className={styles.text}>
// 						Actual : 20 March 2022
// 					</div>
// 				</div>
// 				<div className={styles.fill_color} />
// 				<div className={styles.tick_circle}>
// 					<div>
// 						<IcMFtick
// 							height={20}
// 							width={20}
// 							color="#F68B21"
// 						/>
// 					</div>
// 					<div className={styles.text}>
// 						Suffering
// 					</div>
// 					<div className={styles.text}>
// 						Cut Off : 20 March 2022
// 					</div>
// 					<div className={styles.text}>
// 						Actual : 20 March 2022
// 					</div>
// 				</div>
// 				<div className={styles.dull_line} />
// 				<div className={styles.tick_circle}>
// 					<div className={styles.dull_circle} />
// 					<div className={styles.text}>
// 						ETD
// 					</div>
// 					<div className={styles.text}>
// 						20 March 2022
// 					</div>
// 				</div>
// 				<div className={styles.dull_line} />
// 				<div className={styles.tick_circle}>
// 					<div className={styles.dull_circle} />
// 					<div className={styles.text}>
// 						ETA
// 					</div>
// 					<div className={styles.text}>
// 						20 March 2022
// 					</div>
// 				</div>
// 				<div className={styles.dull_line} />
// 				<div className={styles.tick_circle}>
// 					<div className={styles.dull_circle} />
// 					<div className={styles.text}>
// 						Delivery
// 					</div>
// 					<div className={styles.text}>
// 						20 March 2022
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default ShipmentTimline;

// import { v4 as uuid } from 'uuid';

import { useEffect } from 'react';

import useGetShipmentTimeLine from '../../../../hooks/useGetShipmentTimline';

import styles from './styles.module.css';
import TimelineItem from './TimeLineItem';
// import TimelineItem from './TimelineItem';

// const timelineData = [
// 	{
// 		name  : 'pick_up',
// 		title : 'Pick Up',
// 		type  : 'date-picker',
// 	},
// 	{
// 		name  : 'hand_over',
// 		title : 'Hand Over',
// 		type  : 'date-picker',
// 	},
// 	{
// 		name  : 'gate_in',
// 		title : 'Gate In',
// 		type  : 'date-picker',
// 	},
// 	{
// 		name  : 'est_departure',
// 		title : 'Est. Departure',
// 		type  : 'date-picker',
// 	},
// 	{
// 		name  : 'est_arrival',
// 		title : 'Est. Arrival',
// 		type  : 'date-picker',
// 	},
// 	{
// 		name  : 'off_loading',
// 		title : 'Off Loading',
// 		type  : 'date-picker',
// 	},
// 	{
// 		name  : 'rail_out',
// 		title : 'Rail Out(Port)',
// 		type  : 'date-picker',
// 	},
// 	{
// 		name  : 'arrived_at_icd',
// 		title : 'Arrived at ICD',
// 		type  : 'date-picker',
// 	},
// 	{
// 		name  : 'gate_out',
// 		title : 'Gate Out',
// 		type  : 'date-picker',
// 	},
// 	{
// 		name  : 'return',
// 		title : 'Return',
// 		type  : 'date-picker',
// 	},
// ];

function ShipmentTimeline({ itemData, isAccordionActive }) {
	const {
		shipmentTimelineData = [],
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
				{shipmentTimelineData.map((item, index) => {
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
