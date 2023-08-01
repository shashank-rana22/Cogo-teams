import { Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useGetSchedules from '../../../../../hooks/useGetSchedules';

import Schedule from './Schedule';
import styles from './styles.module.css';

function PossibleSchedules({ rateCardData, service_type }) {
	const { scheduleObject, loading } = useGetSchedules(service_type);

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
				Nothing to show here!
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{schedules.map((item, i) => (
				<Schedule
					key={`${item.departure}_${item.number_of_stops}`}
					isFirst={i === 0}
					item={item}
				/>
			))}
		</div>
	);
}

export default PossibleSchedules;
