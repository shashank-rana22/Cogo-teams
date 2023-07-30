import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function EmptyState({
	emptyText = 'Data not found',
}) {
	return (
		<div className={styles.container}>
			<Image
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/folder-image-with-man"
				width={200}
				height={300}
				alt="Empty-state"
				className={styles.img_container}
			/>

			<div className={styles.text}>{emptyText}</div>
		</div>

	);
}

export default EmptyState;
