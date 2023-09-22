import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowNext, IcMCrossInCircle } from '@cogoport/icons-react';
import React from 'react';

import useDeleteSchedule from '../../hooks/useDeleteSchedule';

import DeleteModal from './DeleteModal';
import styles from './styles.module.css';

function ScheduleCard({ schedule = {}, fetchSchedules = () => {} }) {
	const {
		deleteSchedule, loading,
		showDelete,
		setShowDelete,
		originSchedule,
		DestinationSchedule,
		origin_airport_name,
		origin_airport_code,
		destination_airport_name,
		destination_airport_code,
		handleViewDetails,
		handleDelete,
	} = useDeleteSchedule({ fetchSchedules, schedule });

	return (
		<div className={styles.container}>
			<div className={styles.icon_container} role="presentation" onClick={handleDelete}>
				<IcMCrossInCircle />
			</div>
			<div className={styles.countries_container}>
				<div className={styles.country_name}>
					<span className={styles.country_name_span}>{origin_airport_name}</span>
					{origin_airport_code}
				</div>
				<div className={styles.country_name}>
					<span className={styles.country_name_span}>{destination_airport_name}</span>
					{destination_airport_code}
				</div>
			</div>
			<div className={styles.dot_circle}>
				<div className={styles.circle1}><div className={styles.port_code}>{originSchedule}</div></div>
				<div className={styles.line} />
				<div className={styles.circle2}><div className={styles.port_code}>{DestinationSchedule}</div></div>
			</div>
			<div className={styles.steps_container} />
			<div
				className={styles.footer_container}
				role="presentation"
				onClick={handleViewDetails}
			>
				<div className={styles.value_container}>
					<div className={styles.number_container}>
						{schedule.schedules_count || GLOBAL_CONSTANTS.zeroth_index}
					</div>
					Schedules available from
					<div className={styles.number_container}>
						{schedule.shipping_lines_count || GLOBAL_CONSTANTS.zeroth_index}
					</div>
					Carrier
				</div>
				<div className={styles.footer_icon_container}>
					<IcMArrowNext fill="#034AFD" width="1.2rem" height="1.2rem" />
				</div>
			</div>
			{showDelete && (
				<DeleteModal
					showDelete={showDelete}
					setShowDelete={setShowDelete}
					schedule={schedule}
					deleteSchedule={deleteSchedule}
					loading={loading}
				/>
			)}
		</div>
	);
}

export default ScheduleCard;
