import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate, { differenceInDays } from '@cogoport/utils';

import styles from './styles.module.css';

function LegsItem({ legItem = {} }) {
	const locationsList = legItem?.display_details || [];
	const originSchedule = locationsList.filter((item) => item.id
		=== legItem.origin_airport_id)[GLOBAL_CONSTANTS.zeroth_index]?.display_name || 'Origin';

	const destinationSchedule = locationsList.filter(
		(item) => item.id === legItem.destination_airport_id,
	)[GLOBAL_CONSTANTS.zeroth_index]
		?.display_name || 'Destination';
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				{legItem?.transport_type}
				:
				<span className="bold">{legItem?.transport_name}</span>
			</div>
			<div>
				<div className={styles.dates_container}>
					<div className={styles.date_container}>
						{formatDate(
							legItem?.departure,
							GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],

						)}
					</div>
					<div className={styles.date_container}>
						{formatDate(
							legItem?.arrival,
							GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],

						)}
					</div>
				</div>
				<div className={styles.main_pill_container}>
					<Pill size="md" color="#FEF3E9">
						{differenceInDays(new Date(legItem?.arrival), new Date(legItem?.departure))}
						Days
					</Pill>
				</div>
				<div className={styles.dot_circle}>
					<div className={styles.circle1} />
					<div className={styles.line} />
					<div className={styles.circle2} />
				</div>
				<div>
					<div className={styles.port_container}>
						<div className={styles.port_code}>{originSchedule}</div>
						<div>{destinationSchedule}</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LegsItem;
