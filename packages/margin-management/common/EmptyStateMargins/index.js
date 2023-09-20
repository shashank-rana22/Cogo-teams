import constants from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

function EmptyState() {
	return (
		<div className={styles.container}>
			<h3>NO MARGINS PRESENT !!!</h3>
			<img
				src={constants?.image_url?.empty_state_margins_url}
				alt="empty"
				width={150}
				height={150}
			/>
		</div>
	);
}

export default EmptyState;
