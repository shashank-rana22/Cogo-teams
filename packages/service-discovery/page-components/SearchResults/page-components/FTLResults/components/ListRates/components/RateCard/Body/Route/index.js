import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import getLocationInfo from '../../../../../../../../utils/locations-search';

import JourneyLine from './JourneyLine';
import styles from './styles.module.css';

const LAST_INDEX = -1;
const THIRD_TO_LAST_INDEX = -3;

function Route({ detail = {}, rate = {} }) {
	const { transit_time = 0, transit_time_unit } = rate;

	const scheduleData = {
		transit_time,
		transit_time_unit,
	};

	const { origin = {}, destination = {} } = getLocationInfo(detail, {}, 'service_type');

	const origin_city = (origin?.display_name?.split(',') || [])
		.slice(THIRD_TO_LAST_INDEX, LAST_INDEX)?.[GLOBAL_CONSTANTS.zeroth_index];

	const destination_city = (destination?.display_name?.split(',') || [])
		.slice(THIRD_TO_LAST_INDEX, LAST_INDEX)?.[GLOBAL_CONSTANTS.zeroth_index];

	return (
		<div className={styles.container}>
			<div className={styles.postal_code_container}>
				<span className={styles.postal_code}>
					{origin?.port_code ? `${origin?.postal_code}, ${origin?.port_code}`
						: `${origin.postal_code}, ${origin_city}`}
				</span>

				<span className={styles.postal_code}>
					{destination?.port_code ? `${destination?.postal_code}, ${destination?.port_code}`
						: `${destination.postal_code}, ${destination_city}`}
				</span>
			</div>

			<div className={styles.schedule_container}>
				<span className={styles.schedule_item}>
					{origin.name}
				</span>

				<JourneyLine scheduleData={scheduleData} />

				<span className={styles.schedule_item}>
					{destination.name}
				</span>
			</div>
		</div>
	);
}

export default Route;
