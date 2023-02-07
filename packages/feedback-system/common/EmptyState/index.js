import styles from './styles.module.css';

function EmptyState() {
	return (
		<div className={styles.empty_state_container}>
			<h4>Data Not Found</h4>
		</div>
	);
}

export default EmptyState;
