import { cl } from '@cogoport/components';
import { IcMArrowBack, IcMArrowNext } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

export function Growth({ showGrowth = false }) {
	if (showGrowth) {
		return (
			<IcMArrowBack
				className={cl`${styles.arrow_styles} ${cl.ns('arrow_styles')}`}
				fill="#ABCD62"
			/>
		);
	}

	return (
		<IcMArrowNext
			className={cl`${styles.arrow_styles} ${cl.ns('arrow_styles')}`}
			fill="#EE3425"
		/>
	);
}

function PercentageChange({
	percentageChanged = 0,
	showArrows = false,
}) {
	if (percentageChanged === 'initial') {
		return null;
	}

	return (
		<div
			className={cl`${styles.percentage_change} ${cl.ns('percentage_view')}`}
			style={{ color: percentageChanged > 0 ? '#849E4C' : '#EE3425' }}
		>
			{percentageChanged !== 0
				? `${percentageChanged > 0 ? `+${percentageChanged}` : percentageChanged}%`
				: ''}

			{showArrows ? <Growth showGrowth={percentageChanged > 0} /> : null}
		</div>
	);
}

export default PercentageChange;
