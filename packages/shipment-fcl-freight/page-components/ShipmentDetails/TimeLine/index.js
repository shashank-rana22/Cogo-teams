import { Button, Popover } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useState, useContext } from 'react';

import EditSchedule from './EditSchedule';
import useGetShipmentTimeLine from './hooks/useGetShipmentTimeline';
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

function Timeline() {
	const { loading, timelineData } = useGetShipmentTimeLine();
	const { shipment_data, primary_service } = useContext(ShipmentDetailContext);

	const [showThreeDotPopover, setShowThreeDotPopover] = useState(false);
	const [showEditSchedule, setShowEditSchedule] = useState(false);

	const showEditSchedulePopover = editScheduleStates.includes(primary_service?.state);
	// const showEditSchedulePopover = true;

	const handleEditClick = () => {
		setShowEditSchedule((p) => !p);
		setShowThreeDotPopover((p) => !p);
	};

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

			{showEditSchedulePopover ? (
				<Popover
					interactive
					placement="left"
					render={(
						<Button themeType="linkUi" onClick={handleEditClick}>
							Edit
						</Button>
					)}
					visible={showThreeDotPopover && !showEditSchedule}
					onClickOutside={() => setShowThreeDotPopover(false)}
				>
					<IcMOverflowDot
						onClick={() => setShowThreeDotPopover((p) => !p)}
						className={styles.three_dot_icon}
					/>
				</Popover>
			) : null}

			{showEditSchedule ? (
				<EditSchedule show={showEditSchedule} setShow={setShowEditSchedule} timelineData={timelineData} />
			) : null}
		</div>
	);
}
export default Timeline;
