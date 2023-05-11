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
];

const timelineData = [
	{ milestone: 'Cargo receipt', completed_on: '2023-03-28T09:52:37.559Z', is_sub: false },
	{ milestone: 'Empty Container Pick-Up', completed_on: '2023-03-28T09:55:28.279Z', is_sub: true },
	{ milestone: 'Stuffing of cargo', completed_on: '2023-03-29T04:51:51.124Z', is_sub: false },
	{ milestone: 'Movement of Container', completed_on: null, is_sub: true },
];

function Timeline({ get }) {
	const {
		timelineLoading : loading, isGettingShipment,
	} = useContext(ShipmentDetailContext);

	console.log('timelineData', timelineData);

	const { shipment_data, primary_service } = get || {};

	// useEffect(() => {
	// 	if (shipment_data?.id) {
	// 		getShipmentTimeline();
	// 	}
	// }, [getShipmentTimeline, shipment_data?.id]);

	const [showEditSchedule, setShowEditSchedule] = useState(false);

	const showEditScheduleIcon = editScheduleStates.includes(primary_service?.state);

	const filteredTimelineData = (timelineData || []).filter(
		(timelineItem) => !(shipment_data?.services || []).includes(timelineItem.service_type),
	);

	const totalItems = (timelineData || []).length;
	let consecutivelyCompleted = true;

	if (isGettingShipment || loading) {
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
					console.log('consecutivelyCompleted', consecutivelyCompleted);
					return (
						<TimelineItem
							item={timelineItem}
							consecutivelyCompleted={consecutivelyCompleted}
							isLast={totalItems === index + 1}
							key={timelineItem.milestone}
							primary_service={primary_service}
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
