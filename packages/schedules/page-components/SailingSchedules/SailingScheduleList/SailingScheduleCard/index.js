import Lower from './Lower';
import Middle from './Middle';
import styles from './styles.module.css';
import Upper from './Upper';

function SailingScheduleCard({ sailingSchedule = {}, loading = false }) {
	return (
		<div className={styles.card}>
			<Upper sailingSchedule={sailingSchedule} loading={loading} />
			<Middle sailingSchedule={sailingSchedule} loading={loading} />
			<Lower sailingSchedule={sailingSchedule} loading={loading} />
		</div>
	);
}
export default SailingScheduleCard;
