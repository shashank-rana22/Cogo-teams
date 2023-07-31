import useGetSchedules from '../../../../../hooks/useGetSchedules';

import Schedule from './Schedule';
import styles from './styles.module.css';

function PossibleSchedules({ rateCardData, service_type }) {
	const { scheduleObject, loading } = useGetSchedules(service_type);

	const schedules = scheduleObject[rateCardData.shipping_line.id]?.schedules || [];

	// if (loading) {
	// 	return (
	// 		<div className={styles.container}>
	// 			<Spinner
	// 				size={20}
	// 				style={{ padding: '4px', margin: '16px' }}
	// 				spinBorderColor="#1444a1"
	// 				outerBorderColor="#e7efff"
	// 			/>
	// 		</div>
	// 	);
	// }

	// if (!schedules.length) {
	// 	return (
	// 		<div className={styles.container}>
	// 			<EmptyState />
	// 		</div>
	// 	);
	// }

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
