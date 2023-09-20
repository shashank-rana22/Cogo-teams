import styles from './styles.module.css';
import TrackingInfo from './TrackingInfo';

function TrackerDetails({ id = null, trackingType }) {
	return (

		<div className={styles.container}>
			<div className={styles.title_container}>
				<h2>tracking_title</h2>
			</div>
			<TrackingInfo id={id} trackingType={trackingType} />
		</div>
	);
}

export default TrackerDetails;
