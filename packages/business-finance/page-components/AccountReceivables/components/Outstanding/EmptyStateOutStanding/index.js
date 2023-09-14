import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

function EmptyStateOutStanding({
	height = 125,
	width = 250,
	flexDirection = 'row',
	smallCard = '',
}) {
	return (
		<div className={cl`${styles.container} ${smallCard === 'kamWiseCard'
			? styles.small_card_style : styles[flexDirection]}`}
		>
			<img
				src={GLOBAL_CONSTANTS.image_url.list_no_result_found}
				width={width}
				height={height}
				alt="Empty-state"
				style={{ margin: '10px' }}
			/>
		</div>

	);
}

export default EmptyStateOutStanding;
