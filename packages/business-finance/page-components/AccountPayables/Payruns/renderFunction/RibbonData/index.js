import React from 'react';

import { RIBBON_COLOR_MAPPING, RIBBON_VALUE_MAPPING } from '../../constants';

import styles from './styles.module.css';

function RibbonData({ itemData = {} }) {
	const { type = '' } = itemData;
	const value = RIBBON_VALUE_MAPPING[type] || '';
	return (
		<div className={styles.container}>

			{
			type ? (
				<div className={styles.ribbons}>
					<div className={styles.ribbon} style={{ background: RIBBON_COLOR_MAPPING[type] }}>{value}</div>
				</div>
			) : null
		}
		</div>
	);
}

export default RibbonData;
