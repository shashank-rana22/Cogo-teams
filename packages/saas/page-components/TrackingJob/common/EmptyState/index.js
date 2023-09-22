import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import Image from 'next/image';

import styles from './styles.module.css';

function EmptyState() {
	return (
		<div className={styles.container}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.extract_data}
				width={400}
				height={400}
				alt="loading"
			/>
			<Image
				src={GLOBAL_CONSTANTS.image_url.loading}
				width={40}
				height={40}
				alt="loading"
			/>

		</div>
	);
}

export default EmptyState;
