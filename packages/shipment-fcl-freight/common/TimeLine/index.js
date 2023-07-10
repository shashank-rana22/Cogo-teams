import { cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMEdit } from '@cogoport/icons-react';
import { useState, useContext, useEffect, useMemo } from 'react';

import EditSchedule from './EditSchedule';
import { canEditSchedule } from './helpers/canEditSchedule';
import Loader from './Loader';
import styles from './styles.module.css';
import TimelineItem from './TimelineItem';

const OFFSET_TO_CHECK_LAST_INDEX = 1;

const ICD_MILESTONES_TO_SHOW_COMPLETED = ['Container Departed From ICD', 'Container Arrived At destination ICD'];

function Timeline() {
	const {
		shipment_data, primary_service, timelineLoading : loading, isGettingShipment,
		timelineData, getShipmentTimeline, activeStakeholder,
	} = useContext(ShipmentDetailContext);

	useEffect(() => {
		if (shipment_data?.id) {
			getShipmentTimeline();
		}
	}, [getShipmentTimeline, shipment_data?.id]);

	const [showEditSchedule, setShowEditSchedule] = useState(false);

	const showEditScheduleIcon = canEditSchedule({ primary_service, activeStakeholder });

	const filteredTimelineData = (timelineData || []).filter(
		(timelineItem) => !(shipment_data?.services || []).includes(timelineItem.service_type),
	);

	const keysForTimlineItems = useMemo(() => Array(filteredTimelineData.length)
		.fill(null).map(() => Math.random()), [filteredTimelineData.length]);

	const totalItems = (timelineData || []).length;
	let consecutivelyCompleted = true;

	if (isGettingShipment || loading) {
		return (
			<div className={cl`${styles.container} ${styles.list_container}`}>
				<Loader />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.list_container}>
				{(filteredTimelineData || []).map((timelineItem, index) => {
					consecutivelyCompleted = consecutivelyCompleted && (timelineItem.completed_on
						|| ICD_MILESTONES_TO_SHOW_COMPLETED.includes(timelineItem?.milestone));

					return (
						<TimelineItem
							item={timelineItem}
							consecutivelyCompleted={consecutivelyCompleted}
							isLast={totalItems === index + OFFSET_TO_CHECK_LAST_INDEX}
							key={keysForTimlineItems[index]}
							icd_milestones_to_show_completed={ICD_MILESTONES_TO_SHOW_COMPLETED}
						/>
					);
				})}
			</div>

			{showEditScheduleIcon ? (
				<IcMEdit onClick={() => setShowEditSchedule((p) => !p)} className={styles.edit_icon} />
			) : null}

			{showEditSchedule ? (
				<EditSchedule
					setShow={setShowEditSchedule}
					timelineData={timelineData}
				/>
			) : null}
		</div>
	);
}
export default Timeline;
