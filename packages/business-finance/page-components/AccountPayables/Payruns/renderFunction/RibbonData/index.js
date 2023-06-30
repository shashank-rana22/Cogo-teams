import React from 'react';

import styles from './styles.module.css';

const COLOR_MAPPING = {
	NORMAL          : '#FEF1DF',
	OVERSEAS        : '#CDF7D4',
	OVERHEADS       : '#7DD6FF',
	ADVANCE_PAYMENT : '#C4DC91',
};
function RibbonData({ itemData }) {
	const { type = '' } = itemData || {};
	let value;
	if (type === 'NORMAL') {
		value = 'DOMESTIC';
	} else if (type === 'ADVANCE_PAYMENT') {
		value = 'Adv.Payment';
	} else if (type === 'OVERSEAS') {
		value = 'OVERSEAS';
	}

	return (
		<div className={styles.container}>

			{
			type ? (
				<div className={styles.ribbons}>
					<div className={styles.ribbon} style={{ background: COLOR_MAPPING[type] }}>{value}</div>
				</div>
			) : null
		}
		</div>
	);
}

export default RibbonData;
