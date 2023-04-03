import styles from './styles.module.css';

function EmptyState() {
	return (
		<div className={styles.container}>
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/folder-image-with-man"
				alt="exmpty-state"
				width={240}
				height={140}
			/>
			<div className={styles.text}>No Data Found</div>
		</div>
	);
}

export default EmptyState;
