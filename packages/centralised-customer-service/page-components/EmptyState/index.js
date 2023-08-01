import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function EmptyState({
	emptyText = 'Data not found',
}) {
	return (
		<div className={styles.container}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.empty_data_image}
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
