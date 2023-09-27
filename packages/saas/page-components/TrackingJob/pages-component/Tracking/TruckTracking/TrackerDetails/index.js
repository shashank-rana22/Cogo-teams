import useGetTruckMilestones from '../../../../hooks/useGetTruckMilestones';

import styles from './styles.module.css';
import TrackingInfo from './TrackingInfo';

function TrackerDetails({ id = null, trackingType = 'surface' }) {
	console.log(id);
	const { loading, data } = useGetTruckMilestones({ id, trackingType });

	return (

		<div className={styles.container}>
			<div className={styles.title_container}>
				<h2>tracking_title</h2>
			</div>
			<TrackingInfo id={id} trackingType={trackingType} data={data} loading={loading} />
		</div>
	);
}

export default TrackerDetails;
