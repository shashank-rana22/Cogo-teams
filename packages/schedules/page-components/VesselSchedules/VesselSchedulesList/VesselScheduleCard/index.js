import Lower from './Lower';
import Middle from './Middle';
import styles from './styles.module.css';
import Upper from './Upper';

function VesselScheduleCard({ vessel, loading }) {
	return (
		<div className={styles.card}>
			<Upper vessel={vessel} loading={loading} />
			<Middle vessel_schedule_link={vessel?.vessel_schedule_link} loading={loading} />
			<Lower vessel={vessel} loading={loading} />
		</div>
	);
}
export default VesselScheduleCard;
