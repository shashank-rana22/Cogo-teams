import styles from './styles.module.css';
import TrackingInfo from './TrackingInfo';

function TrackerDetails({ id = null, trackingType }) {
	return (

		<div className={styles.container}>
			<TrackingInfo id={id} trackingType={trackingType} />
		</div>
	);
}

export default TrackerDetails;
