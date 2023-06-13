import { cl } from '@cogoport/components';

import styles from './styles.module.css';

const EMPTY_STATE_IMAGE = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/folder-image-with-man';

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
				src={EMPTY_STATE_IMAGE}
				width={width}
				height={height}
				alt="Empty-state"
				className={styles.image}
			/>

			<div>
				<div className={styles.text} style={{ fontSize: textSize }}>{emptyText}</div>
				{subEmptyText && <p className={styles.text}>{subEmptyText}</p> }
			</div>
		</div>

	);
}

export default EmptyState;
