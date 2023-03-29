import { ShipmentDetailContext } from '@cogoport/context';
import { IcMEdit } from '@cogoport/icons-react';
import { useState, useContext, useEffect } from 'react';

import EditSchedule from './EditSchedule';
import Loader from './Loader';
import styles from './styles.module.css';
import TimelineItem from './TimelineItem';

const editScheduleStates = [
	'init',
	'awaiting_service_provider_confirmation',
	'confirmed_by_service_provider',
	'containers_gated_in',
	'vessel_departed',
	'vessel_arrived',
	'cargo_carted_in',
	'cargo_stuffed',
	'cargo_handed_over_at_origin',
	'flight_departed',
	'flight_arrived',
];

function Timeline({ loading = false, timelineData = [] }) {
	const { shipment_data, primary_service, getShipmentTimeline } = useContext(ShipmentDetailContext);

	useEffect(() => {
		if (shipment_data?.id) {
			getShipmentTimeline();
		}
	}, [getShipmentTimeline, shipment_data?.id]);

	const [showEditSchedule, setShowEditSchedule] = useState(false);

	const showEditScheduleIcon = editScheduleStates.includes(primary_service?.state);

	const filteredTimelineData = timelineData.filter(
		(timelineItem) => !(shipment_data?.services || []).includes(timelineItem.service_type),
	);

	const totalItems = (timelineData || []).length;
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
							item={timelineItem}
							consecutivelyCompleted={consecutivelyCompleted}
							isLast={totalItems === index + 1}
							key={timelineItem.milestone}
						/>
					);
				})}
			</div>

			{showEditScheduleIcon ? (
				<IcMEdit onClick={() => setShowEditSchedule((p) => !p)} className={styles.edit_icon} />
			) : null}

			{showEditSchedule ? (
				<EditSchedule show={showEditSchedule} setShow={setShowEditSchedule} timelineData={timelineData} />
			) : null}
		</div>
	);
}
export default Timeline;
