import styles from './styles.module.css';

function StatsBody({ label, count, icon, formattedKey }) {
	const formatedCount = formattedKey.includes('time') ? `${Number(count).toFixed(0)} s` : count;

	return (
		<div className={styles.container}>
			<div className={styles.stats_icon}>{icon}</div>
			<div className={styles.stats_count}>{formatedCount}</div>
			<div className={styles.stats_label}>{label}</div>
		</div>
	);
}

export default StatsBody;
