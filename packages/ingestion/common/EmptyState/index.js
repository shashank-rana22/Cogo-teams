import styles from './styles.module.css';

function EmptyState({
	height = 120,
	width = 224,
	emptyText = 'Data not found',
	flexDirection = 'column',
}) {
	return (
		<div className={`${styles.container} ${styles[flexDirection]}`}>
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/grey_empty_state.svg"
				width={width}
				height={height}
				alt="Empty-state"
				style={{ margin: '10px' }}
			/>

			<div className={styles.text}>{emptyText}</div>
		</div>

	);
}

export default EmptyState;
