import styles from './styles.module.css';

function Empty() {
	return (
		<div className={styles.section}>
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-empty-nonfunded.svg"
				alt="empty"
				style={{ width: '300px', height: '200px' }}
			/>
			<div className={styles.text}>
				No data Found
			</div>
		</div>
	);
}

export default Empty;
