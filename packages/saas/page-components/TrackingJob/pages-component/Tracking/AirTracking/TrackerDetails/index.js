import useGetAirMilestones from '../../../../hooks/useGetAirMilestones';

import styles from './styles.module.css';
import TrackingInfo from './TrackingInfo';

function TrackerDetails({ id = null, trackingType = 'air' }) {
	const { loading, data, refetch } = useGetAirMilestones({ id, trackingType });

	return (

		<div className={styles.container}>
			<TrackingInfo id={id} trackingType={trackingType} loading={loading} data={data} refetch={refetch} />
		</div>
	);
}

export default TrackerDetails;
