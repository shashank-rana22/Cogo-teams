import { cl } from '@cogoport/components';

import styles from './styles.module.css';

function EmptyState({
	height = 125,
	width = 225,
	emptyText = 'Data not found',
	subEmptyText = '',
	flexDirection = 'row',
	textSize = '16px',
}) {
	return (
		<div className={cl`${styles.container} ${styles[flexDirection]}`}>
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/folder-image-with-man"
				width={width}
				height={height}
				alt="Empty-state"
				style={{ margin: '10px' }}
			/>

			<div>
				<div className={styles.text} style={{ fontSize: textSize }}>{emptyText}</div>
				{subEmptyText && <p className={styles.text}>{subEmptyText}</p> }
			</div>
		</div>

	);
}

export default EmptyState;
