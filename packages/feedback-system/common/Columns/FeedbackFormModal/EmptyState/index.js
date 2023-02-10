import styles from './styles.module.css';

function EmptyState() {
	return (
		<div className={styles.empty_state_container}>
			<div className={styles.content}>No Questions Found for this Role</div>
		</div>
	);
}

export default EmptyState;
