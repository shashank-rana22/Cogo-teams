import styles from './styles.module.css';

function EmptyState() {
	return (
		<div className={styles.empty_state}>
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/no-incident-data.svg"
				alt=""
				width="200px"
				height="200px"
			/>
		</div>
	);
}
export default EmptyState;
