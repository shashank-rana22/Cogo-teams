import styles from './styles.module.css';

function EmptyState() {
	return (
		<div className={styles.empty_state_container}>
			No Data Found #TODO
		</div>
	);
}

export default EmptyState;
