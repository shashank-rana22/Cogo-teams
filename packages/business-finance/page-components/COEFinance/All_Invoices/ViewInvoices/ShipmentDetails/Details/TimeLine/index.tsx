import React from 'react';
import TimeLineItem from './TimeLineItem/index';
import styles from './styles.module.css';

const TimeLine = ({ loading = false }) => {

	const timeLine=[
			{milestone: 'Booking Confirmed1', completed_on: '2022-12-28T06:58:51.318Z', is_sub: false},
			{milestone: 'Booking Confirmed2', completed_on: '2022-12-28T06:58:51.318Z', is_sub: true},
			{milestone: 'Booking Confirmed3', completed_on: '2022-12-28T06:58:51.318Z', is_sub: false},
			{milestone: 'Booking Confirmed4', completed_on: null, is_sub: false},
	]
	
	const shipment_data={};
	let isCompleted = true;

	return (
		<div className={styles.Container} >
			<div className={styles.Wrapper}>
				{timeLine?.map((item, i) => {
					if (!item?.completed_on) {
						isCompleted = false;
					}

					const isNextMain = !timeLine[i + 1]?.is_sub;

					return (
						<TimeLineItem
							key={timeLine?.milestone}
							timeLine={timeLine}
							index={i}
							isCompleted={isCompleted}
							shipmentData={shipment_data}
							item={item}
							isNextMain={isNextMain}
							isLast={i === timeLine?.length - 1}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default TimeLine;
