import { cl } from '@cogoport/components';
// import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

const EMPTY_STATE_IMAGE_URL = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/folder-image-with-man';

function EmptyState({
	height = 125,
	width = 225,
	flexDirection = 'row',
	Text = '',
}) {
	return (
		<div className={cl`${styles.container} ${styles[flexDirection]}`}>
			<img
				src={EMPTY_STATE_IMAGE_URL}
				width={width}
				height={height}
				alt="Empty-state"
				className={styles.image}
			/>

			<div>
				<span className={styles.criteria}>
					No Results Found

				</span>
				<div className={styles.horizontal} />
				<div>
					{Text}
				</div>
			</div>

		</div>

	);
}

export default EmptyState;
