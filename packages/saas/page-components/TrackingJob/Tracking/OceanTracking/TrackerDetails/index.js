import styles from './styles.module.css';
import TrackingInfo from './TrackingInfo';

function TrackerDetails({ id = null }) {
	return (

		<div className={styles.container}>

			<TrackingInfo id={id} />
		</div>
	);
}

export default TrackerDetails;
