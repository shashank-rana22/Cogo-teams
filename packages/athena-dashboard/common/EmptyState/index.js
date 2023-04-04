import styles from './styles.module.css';

function EmptyState({
	height = 125,
	width = 225,
	emptyText = 'Search for data',
	flexDirection = 'row',
	textSize = '16px',
}) {
	return (
		<div className={`${styles.empty_state} ${styles[flexDirection]}`}>
			<div style={{ justifyContent: 'center', display: 'flex' }}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/folder-image-with-man"
					width={width}
					height={height}
					alt="Empty-state"
					style={{ margin: '10px' }}
				/>
			</div>
			<div style={{ fontSize: textSize, textAlign: 'center' }}>{emptyText}</div>
		</div>

	);
}

export default EmptyState;
