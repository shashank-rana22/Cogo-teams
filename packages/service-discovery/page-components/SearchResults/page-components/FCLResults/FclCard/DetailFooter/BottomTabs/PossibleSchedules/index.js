import { Loader } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import useGetSchedules from '../../../../../../hooks/useGetSchedules';

import Schedule from './Schedule';
import styles from './styles.module.css';

function PossibleSchedules({ rateCardData = {}, service_type = '' }) {
	const { scheduleObject = {}, loading } = useGetSchedules(service_type);

	const schedules = scheduleObject[rateCardData.shipping_line.id]?.schedules || [];

	if (loading) {
		return (
			<div className={styles.loader_container}>
				<Loader themeType="primary" className={styles.loader} />
			</div>
		);
	}

	if (isEmpty(schedules)) {
		return (
			<div className={styles.container}>
				<b>Nothing to show here!</b>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{schedules.map((item, i) => (
				<Schedule
					key={`${item.departure}_${item.number_of_stops}`}
					isFirst={i === GLOBAL_CONSTANTS.zeroth_index}
					item={item}
				/>
			))}
		</div>
	);
}

export default PossibleSchedules;
