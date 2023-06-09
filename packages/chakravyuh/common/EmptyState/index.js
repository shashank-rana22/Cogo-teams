import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function EmptyState({
	height = 125,
	width = 225,
	emptyText = 'Data not found',
	container_class = 'row',
	textSize = 'lg',
}) {
	return (
		<div className={`${styles.container} ${container_class}`}>
			<Image
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/folder-image-with-man"
				width={width}
				height={height}
				className={styles.img}
				alt="Empty-state"
				style={{ margin: '10px' }}
			/>

			<div className={`${styles.text} ${styles[textSize]}`}>{emptyText}</div>
		</div>

	);
}

export default EmptyState;
