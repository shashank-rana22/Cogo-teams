import styles from './styles.module.css';

function DashedLine({ transit_time = 0 }) {
	return (
		<div className={styles.dashed_line}>
			<div className={styles.line} />
			<div className={styles.content}>{`${transit_time} DAYS`}</div>
			<div className={styles.line} />
		</div>
	);
}

export default DashedLine;
