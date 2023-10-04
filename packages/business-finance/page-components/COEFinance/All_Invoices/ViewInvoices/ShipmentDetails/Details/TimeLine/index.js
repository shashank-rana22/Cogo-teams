import { Placeholder } from '@cogoport/components';
import React from 'react';

import useGetShipmentTimeLine from '../../../../../hook/useGetShipmentTimeLine';

import styles from './styles.module.css';
import TimeLineItem from './TimeLineItem/index';

interface ItemProps {
	shipmentId:string,
}

function TimeLine({ shipmentId }:ItemProps) {
	const { data: timelineData, loading } = useGetShipmentTimeLine(shipmentId);

	const shipmentData = {};
	let isCompleted = true;

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				{!loading ? timelineData?.map((item, i) => {
					if (!item?.completed_on) {
						isCompleted = false;
					}

					const isNextMain = !timelineData[i + 1]?.is_sub;

					return (
						<TimeLineItem
							key={timelineData?.milestone}
							timeLine={timelineData}
							index={i}
							isCompleted={isCompleted}
							shipmentData={shipmentData}
							item={item}
							isNextMain={isNextMain}
							isLast={i === timelineData.length - 1}
						/>
					);
				}) : (
					<div className={styles.loading}>
						<Placeholder height="30px" width="300px" />
						<Placeholder height="30px" width="300px" />
						<Placeholder height="30px" width="300px" />
					</div>
				)}
			</div>
		</div>
	);
}

export default TimeLine;
