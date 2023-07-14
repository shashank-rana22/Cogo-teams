import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function EmptyState({
	height = 125,
	width = 225,
	emptyText = 'Data not found',
	flexDirection = 'row',
}) {
	return (
		<div className={`${styles.container} ${styles[flexDirection]}`}>
			<Image
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/folder-image-with-man"
				width={width}
				height={height}
				alt="Empty-state"
				className={styles.img_container}
			/>

			<div className={styles.text}>{emptyText}</div>
		</div>

	);
}

export default EmptyState;
