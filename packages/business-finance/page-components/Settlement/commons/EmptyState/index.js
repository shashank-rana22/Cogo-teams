import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

function EmptyState({
	height = 125,
	width = 225,
	flexDirection = 'row',
	Text = '',
}) {
	return (
		<div className={cl`${styles.container} ${styles[flexDirection]}`}>
			<img
				src={GLOBAL_CONSTANTS.image_url.empty_state}
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
