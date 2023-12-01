import styles from './styles.module.css';

const EMPTY_STATE_URL = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/folder-image-with-man';

function EmptyState() {
	return (
		<div className={styles.container}>
			<img
				src={EMPTY_STATE_URL}
				width={325}
				height={225}
				alt="Empty state"
				className={styles.empty_img}
			/>

			<div className={styles.text}>
				<div>No inactive partner found</div>
				<div>Looks like no partners are inactive</div>
			</div>
		</div>

	);
}

export default EmptyState;
