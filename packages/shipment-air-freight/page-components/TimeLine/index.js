import { ShipmentDetailContext } from '@cogoport/context';
import { IcMEdit } from '@cogoport/icons-react';
import { useState, useContext, useEffect } from 'react';

import EditSchedule from './EditSchedule';
import { canEditSchedule } from './helpers/canEditSchedule';
import Loader from './Loader';
import styles from './styles.module.css';
import TimelineItem from './TimelineItem';

const ADD_ONE_INDEX = 1;

function Timeline() {
	const {
		shipment_data,
		primary_service,
		stakeholderConfig,
		timelineData,
		timelineLoading: loading,
		getShipmentTimeline,
	} = useContext(ShipmentDetailContext);

	useEffect(() => {
		if (shipment_data?.id) {
			getShipmentTimeline();
		}
	}, [getShipmentTimeline, shipment_data?.id]);

	const [showEditSchedule, setShowEditSchedule] = useState(false);

	const showEditScheduleIcon = canEditSchedule({ primary_service, stakeholderConfig });

	const filteredTimelineData = (timelineData || []).filter(
		(timelineItem) => !(shipment_data?.services || []).includes(timelineItem.service_type),
	);

	const totalItems = (filteredTimelineData || []).length;

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
							key={`${timelineItem.milestone}_${timelineItem.completed_on}`}
							item={timelineItem}
							consecutivelyCompleted={consecutivelyCompleted}
							isLast={totalItems === index + ADD_ONE_INDEX}
						/>
					);
				})}
			</div>

			{showEditScheduleIcon ? (
				<IcMEdit onClick={() => setShowEditSchedule((prev) => !prev)} className={styles.edit_icon} />
			) : null}

			{showEditSchedule ? (
				<EditSchedule setShow={setShowEditSchedule} />
			) : null}
		</div>
	);
}
export default Timeline;
