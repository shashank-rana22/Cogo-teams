import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import getLocationInfo from '../../../../../../../../utils/locations-search';

import JourneyLine from './JourneyLine';
import styles from './styles.module.css';

const LAST_INDEX = -1;
const SECOND_TO_LAST_INDEX = -2;

const format = ({ value = '', type = '' }) => {
	const TYPE_MAPPING = {
		date : GLOBAL_CONSTANTS.formats.date['dd MMM'],
		time : GLOBAL_CONSTANTS.formats.date['HH:mm'],
	};

	return formatDate({
		date       : value,
		dateFormat : TYPE_MAPPING[type] || '',
		formatType : type,
	});
};

function Route({ detail = {}, rate = {} }) {
	const { transit_time = 0, schedules = {}, schedule_source = '' } = rate;

	const { arrival = '', departure = '' } = schedules || {};

	const scheduleData = {
		arrival: `${format({ value: arrival, type: 'time' })}, 
                  ${format({ value: arrival, type: 'date' })}`,
		departure: `${format({ value: departure, type: 'time' })}, 
                  ${format({ value: departure, type: 'date' })}`,
		transit_time,
		schedule_source,
	};

	const { origin = {}, destination = {} } = getLocationInfo(detail, {}, 'service_type');

	const origin_city = (origin?.display_name?.split(',') || [])
		.slice(SECOND_TO_LAST_INDEX, LAST_INDEX)[GLOBAL_CONSTANTS.zeroth_index];

	const destination_city = (destination?.display_name?.split(',') || [])
		.slice(SECOND_TO_LAST_INDEX, LAST_INDEX)[GLOBAL_CONSTANTS.zeroth_index];

	return (
		<div className={styles.container}>
			<div className={styles.port_name_container}>
				<span className={styles.port_name}>
					{`(${origin?.port_code}) ${origin_city}`}
				</span>

				<span className={styles.port_name}>
					{`(${destination?.port_code}) ${destination_city}`}
				</span>
			</div>

			<div className={styles.schedule_container}>
				<span className={styles.schedule_item}>
					{scheduleData.departure}
				</span>

				<JourneyLine scheduleData={scheduleData} />

				<span className={styles.schedule_item}>
					{scheduleData.arrival}
				</span>
			</div>
		</div>
	);
}

export default Route;
