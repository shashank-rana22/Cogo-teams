import { Placeholder } from '@cogoport/components';
import React from 'react';

import useGetShipmentTimeLine from '../../../../../../hook/useGetShipmentTimeLine';

import styles from './styles.module.css';
import TimeLineItem from './TimeLineItem/index';

const ONE = 1;

function TimeLine({
	shipmentId = '',
}) {
	const { data: timelineData = [], loading = false } = useGetShipmentTimeLine(shipmentId);

	const SHIPMENT_DATA = {};
	let isCompleted = true;

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				{!loading ? timelineData?.map((item, i) => {
					if (!item?.completed_on) {
						isCompleted = false;
					}

					const isNextMain = !timelineData[i + ONE]?.is_sub;

					return (
						<TimeLineItem
							key={timelineData?.milestone}
							timeLine={timelineData}
							index={i}
							isCompleted={isCompleted}
							shipmentData={SHIPMENT_DATA}
							item={item}
							isNextMain={isNextMain}
							isLast={i === timelineData.length - ONE}
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
