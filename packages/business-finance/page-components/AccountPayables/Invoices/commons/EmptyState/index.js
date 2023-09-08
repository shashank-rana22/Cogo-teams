import { cl } from '@cogoport/components';

import styles from './styles.module.css';

const SOP_EMPTY_STATE_URL = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/folder-image-with-man';

function EmptyState({
	height = 125,
	width = 225,
	emptyText = 'Data not found',
	flexDirection = 'row',
	textSize = '16px',
}) {
	return (
		<div className={cl`${styles.container} ${styles[flexDirection]}`}>
			<img
				src={SOP_EMPTY_STATE_URL}
				width={width}
				height={height}
				alt="Empty-state"
				style={{ margin: '10px' }}
			/>

			<div className={styles.text} style={{ fontSize: textSize }}>{emptyText}</div>
		</div>

	);
}

export default EmptyState;
