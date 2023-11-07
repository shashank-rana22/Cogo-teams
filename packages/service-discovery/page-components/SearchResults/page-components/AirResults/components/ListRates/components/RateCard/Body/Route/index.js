import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import getLocationInfo from '../../../../../../../../utils/locations-search';

import JourneyLine from './JourneyLine';
import styles from './styles.module.css';

const LAST_INDEX = -1;
const SECOND_TO_LAST_INDEX = -2;

const format = (date = '', dateFormat = 'dd MMM yyyy') => formatDate({
	date,
	dateFormat : GLOBAL_CONSTANTS.formats.date[dateFormat],
	formatType : 'date',
});

function Route({ detail = {}, rate = {} }) {
	const { transit_time = 0, schedules = {}, schedule_source = '' } = rate;

	const { arrival = '', departure = '' } = schedules || {};

	const scheduleData = {
		arrival   : format(arrival),
		departure : format(departure),
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
