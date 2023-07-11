import Lower from './Lower';
import Middle from './Middle';
import styles from './styles.module.css';
import Upper from './Upper';

function SailingScheduleCard({ sailingSchedule }) {
	return (
		<div className={styles.card}>
			<Upper sailingSchedule={sailingSchedule} />
			<Middle sailingSchedule={sailingSchedule} />
			<Lower sailingSchedule={sailingSchedule} />
		</div>
	);
}
export default SailingScheduleCard;
