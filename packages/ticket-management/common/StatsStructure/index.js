import styles from './styles.module.css';

function StatsStructure({ label, count, icon }) {
	return (
		<div className={styles.container}>
			<div className={styles.stats_icon}>{icon}</div>
			<div className={styles.stats_count}>{count}</div>
			<div className={styles.stats_label}>{label}</div>
		</div>
	);
}

export default StatsStructure;
