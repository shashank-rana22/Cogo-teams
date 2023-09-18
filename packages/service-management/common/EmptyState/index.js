import styles from './styles.module.css';

function Empty() {
	return (
		<div className={styles.container}>
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/empty.svg"
				alt="empty"
				style={{ width: '200px', height: '200px' }}
			/>
			<span>No Data Found</span>
		</div>
	);
}

export default Empty;
