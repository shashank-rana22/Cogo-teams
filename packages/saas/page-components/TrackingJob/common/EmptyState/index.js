import Image from 'next/image';

import styles from './styles.module.css';

function EmptyState() {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.heading}>No data found</div>
				<div className={styles.content}>Looks like you do not have any data in this category</div>
			</div>

			<Image
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-empty-nonfunded.svg"
				alt="empty"
				height={250}
				width={250}
				style={{ marginLeft: 12 }}
			/>

		</div>
	);
}

export default EmptyState;
