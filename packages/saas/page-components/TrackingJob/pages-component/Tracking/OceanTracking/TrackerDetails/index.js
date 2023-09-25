import useGetContainerMilestones from '../../../../hooks/useGetContainerMilestones';

import styles from './styles.module.css';
import TrackingInfo from './TrackingInfo';

function TrackerDetails({ id = null, trackingType }) {
	const { loading, data, refetch } = useGetContainerMilestones({ id });

	return (

		<div className={styles.container}>
			<TrackingInfo id={id} trackingType={trackingType} loading={loading} data={data} refetch={refetch} />
		</div>
	);
}

export default TrackerDetails;
