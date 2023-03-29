import styles from './styles.module.css';

function EmptyState({
	height = 125,
	width = 225,
	emptyText = 'Data not found',
	flexDirection = 'column',
	textSize = '16px',
}) {
	return (
		<div className={`${styles.container} ${styles[flexDirection]}`}>
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/folder-image-with-man"
				width={width}
				height={height}
				alt="Empty-state"
				className={styles.img}
			/>

			<div className={styles.text} style={{ fontSize: textSize }}>{emptyText}</div>
		</div>
	);
}

export default EmptyState;
