import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

function EmptyState({
	title = 'Data not found',
	subtitle = '',
}) {
	return (
		<div className={styles.container}>
			<img
				src={GLOBAL_CONSTANTS.image_url.empty_state}
				alt="Empty State"
			/>

			<div>
				<h2>{title}</h2>
				<p className={styles.subtitle}>{subtitle}</p>
			</div>
		</div>
	);
}

export default EmptyState;
